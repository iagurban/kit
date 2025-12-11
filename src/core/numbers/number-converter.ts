import { isROArray } from '../checks/basic';
import { debugAssert } from '../flow/assertions';
import { once } from '../once';
import { getRandomBytes } from '../random';

/**
 * Utility class for efficiently computing and caching powers of a given base number.
 * This class can be treated as immutable from an external perspective. Although it
 * internally mutates an array to cache results, its public methods are pure and
 * will always return the same output for a given input.
 *
 * @example
 * ```typescript
 * // Create powers calculator for base 16n (hexadecimal)
 * const hexPowers = new Powers(16n);
 *
 * // Get 16^3
 * const power3 = hexPowers.get(3); // Returns 4096n
 *
 * // Get 16^5 - automatically computes and caches intermediate powers
 * const power5 = hexPowers.get(5); // Returns 1048576n
 * ```
 */
export class Powers {
  /**
   * Creates a new Powers calculator.
   *
   * @param base - The base number to calculate powers of. Must be >= 2n.
   * @param initDigits - Optional. Number of initial powers to pre-calculate. Default is 20.
   * @throws {Error} If base is less than 2n
   */
  constructor(
    readonly base: bigint,
    initDigits = 20
  ) {
    if (base < 2n) {
      throw new Error('mapping length must be > 1');
    }
    this.get(Math.max(1, initDigits) - 1);
  }

  /**
   * Gets the power of the base at the specified position.
   * Automatically calculates and caches any intermediate powers needed.
   *
   * @param pos - The power/exponent to calculate (0 returns 1n, 1 returns base, etc)
   * @returns The calculated power as a bigint
   */
  get(pos: number): bigint {
    let n = this.powers.length - 1;
    while (pos > n++) {
      this.powers.push(this.base * this.powers[this.powers.length - 1]);
    }
    return this.powers[pos];
  }

  private readonly powers: bigint[] = [1n];
}

/**
 * Converts numbers between decimal and a custom number system with configurable digit symbols.
 * Supports random number generation and fixed-width formatting in the custom system.
 *
 * @example
 * ```typescript
 * // Create base-36 converter (0-9, a-z)
 * const base36 = new NumberConverter([
 *   ['0', '9'], // Digits
 *   ['a', 'z']  // Letters
 * ]);
 *
 * // Convert from decimal
 * console.log(base36.from10(12345)); // "9ix"
 *
 * // Convert to decimal
 * console.log(base36.to10('xyz')); // 44027n
 *
 * // Generate random number
 * console.log(base36.random(5)); // Random 5-char string
 * ```
 */
export class NumberConverter {
  /**
   * Creates a number converter with the specified digit mappings.
   *
   * @param parts - Array of single characters or [start,end] character ranges defining the digits
   * @throws {Error} If there are duplicate characters in the mappings
   */
  constructor(readonly parts: readonly (string | readonly [string, string])[]) {}

  /** Gets the numeric base of this number system (total count of unique digits) */
  get base(): bigint {
    return BigInt(this.digits.length);
  }

  /** Gets array of character codes for all digits in order */
  @once
  get digits() {
    const set = [...this.digitsSet];
    return set.sort((a, b) => a - b);
  }

  @once
  get digitsSet(): ReadonlySet<number> {
    const r = new Set<number>();
    for (const [idx, e] of this.parts.entries()) {
      if (isROArray(e)) {
        if (e.length !== 2 || e[0].length !== 1 || e[1].length !== 1) {
          throw new Error(`parts[${idx}] must be ['a','z'] (to add a range) or 'abc0xyz' (to add by char)`);
        }
        const [from, to] = Array.from(e).map(s => s.codePointAt(0)!);
        if (from > to) {
          throw new Error(`parts[${idx}] 'from' must be <= 'to', got '${from}' > '${to}'`);
        }
        for (let i = 0; i < to - from + 1; ++i) {
          r.add(from + i);
        }
      } else {
        for (let i = 0; i < e.length; ++i) {
          r.add(e.codePointAt(i)!);
        }
      }
    }
    if (r.size < 2) {
      throw new Error(`empty digits set`);
    }
    return r;
  }

  /** Gets the Powers calculator for this number system's base */
  @once
  get powers(): Powers {
    return new Powers(this.base);
  }

  /** Maps each digit's character code to its numeric value in the system */
  @once
  get byChar(): Map<number, bigint> {
    return new Map([...this.digits].map((cc, i) => [cc, BigInt(i)] as const));
  }

  @once
  get maxSafeInteger() {
    return this.from10(BigInt(Number.MAX_SAFE_INTEGER));
  }

  /** Gets maximum number of digits that can safely represent MAX_SAFE_INTEGER (always >= 2) */
  get maxSafeExponent(): number {
    return this.maxSafeInteger.length - 1;
  }

  /**
   * Converts a decimal number to this number system.
   *
   * @param input - Decimal number as string, number or bigint
   * @returns String representation in this number system
   * @throws {Error} If input is floating point, negative, or base is 10
   */
  readonly from10: (input: string | number | bigint) => string = (
    input: string | number | bigint
  ): string => {
    if (typeof input === 'number' && Math.floor(input) !== input) {
      throw new Error(`n is floating ${input}`);
    }
    let n = BigInt(input);
    if (n < 0n) {
      throw new Error(`n is negative: ${n}`);
    }
    const { base: b, digits } = this;
    if (b === 10n) {
      throw new Error('mapping length must be != 10');
    }
    const r: number[] = [];
    do {
      r.push(digits[Number(n % b)]);
      n /= b;
    } while (n > 0n);
    return String.fromCharCode(...r.reverse());
  };

  /**
   * Converts a number from this system to decimal.
   *
   * @param n - String representation in this number system
   * @returns Decimal value as bigint
   * @throws {Error} If string contains invalid digits
   */
  readonly to10: (n: string) => bigint = (n: string): bigint => {
    const { byChar, powers } = this;
    let r = 0n;
    for (let i = n.length - 1; i >= 0; --i) {
      const v = byChar.get(n.charCodeAt(i));
      if (v === undefined) {
        throw new Error(`invalid char '${n[i]}' in '${n}'`);
      }
      r += v * powers.get(n.length - 1 - i);
    }
    return r;
  };

  /**
   * Creates a string of specified length using the maximum digit value.
   *
   * @param length - Desired string length
   * @returns String of specified length filled with max digit
   */
  readonly mask: (length: number) => string = (length: number) => {
    const c = this.digits[this.digits.length - 1];
    return String.fromCharCode(...Array.from({ length }, () => c));
  };

  /**
   * Generates a random number string of specified length.
   *
   * @param length - Desired string length, must be positive integer
   * @returns Random string of specified length using system digits
   * @throws {Error} If length is not a positive integer
   */
  readonly random: (length: number) => string = (length: number): string => {
    if (length < 1 || Math.floor(length) !== length) {
      throw new Error(`random length must be integer > 0, got ${length}`);
    }
    return String.fromCharCode(
      ...Array.from({ length }, () => this.digits[(Math.random() * this.digits.length) | 0])
    );
  };

  /**
   * Creates a function that generates fixed-width random numbers efficiently.
   *
   * @param length - Desired string length, must be positive integer
   * @returns Function that generates random strings of specified length
   * @throws {Error} If length is not a positive integer
   */
  readonly fixedWidthRandomGenerator: (length: number) => () => string = length => {
    // Secure, unbiased integer in [0, mask) using Node's crypto.
    // Reference (non-secure) equivalent for understanding `mask` meaning:
    //   Math.floor(Math.random() * mask)  // yields 0..mask-1
    // Instead of fixed 8 bytes, compute the minimal number of bytes required per mask
    // and build a sampler once to avoid extra work per generated chunk.
    const makeSecureIntBelow = (digits: number): (() => number) => {
      const mask = Number(this.to10(this.mask(digits)));

      if (mask <= 0 || !Number.isFinite(mask)) {
        throw new Error(`invalid mask: ${mask}`);
      }

      const m = BigInt(mask);
      // bits needed to represent values in [0, mask)
      const bits = Math.ceil(Math.log2(mask));
      const nBytes = Math.max(1, Math.ceil(bits / 8));
      const maximum = 1n << BigInt(8 * nBytes);
      const limit = maximum - (maximum % m); // largest multiple of m within [0, 2^(8*nBytes))

      return () => {
        while (true) {
          const buf = getRandomBytes(nBytes);
          // Interpret as unsigned big-endian integer
          let x = 0n;
          for (let i = 0; i < nBytes; i++) {
            x = (x << 8n) | BigInt(buf[i]);
          }
          if (x < limit) {
            return Number(x % m);
          }
          // else retry to keep distribution uniform
        }
      };
    };

    if (length < 1 || Math.floor(length) !== length) {
      throw new Error(`length must be integer < 1, got ${length}`);
    }

    const pad = String.fromCharCode(this.digits[0]);

    const mask0Digits = this.maxSafeExponent; // >=2
    const mask1Length = length % mask0Digits; // [0, mask0Digits] -> [0, >=2]
    const mask0Length = Math.floor(length / mask0Digits); // >=0

    const genSample1 = (sampler: () => number, width: number) => this.from10(sampler()).padStart(width, pad);

    const genSample0 = (sampler: () => number) => {
      const r: string[] = [];
      for (let i = 0; i < mask0Length; ++i) {
        r.push(genSample1(sampler, mask0Digits));
      }
      return r.join('');
    };

    if (mask1Length > 0) {
      const sample1 = makeSecureIntBelow(mask1Length);

      if (mask0Length > 0) {
        const sample0 = makeSecureIntBelow(mask0Digits);
        return () => genSample0(sample0) + genSample1(sample1, mask1Length);
      }

      return () => genSample1(sample1, length);
    }

    debugAssert(mask0Length > 0);
    const sample0 = makeSecureIntBelow(mask0Digits);
    return () => genSample0(sample0);
  };
}
