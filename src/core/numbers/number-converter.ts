/**
 * Utility class for efficiently computing and caching powers of a given base number.
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
import { randomBytes } from 'crypto';

import { isROArray } from '../checks';
import { once } from '../once';

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
  get powers(): Powers {
    return new Powers(this.base);
  }

  /** Maps each digit's character code to its numeric value in the system */
  get byChar(): Map<number, bigint> {
    return new Map([...this.digits].map((cc, i) => [cc, BigInt(i)] as const));
  }

  /** Gets maximum number of digits that can safely represent MAX_SAFE_INTEGER */
  get maxSafeDigits(): number {
    return this.from10(BigInt(Number.MAX_SAFE_INTEGER)).length - 1;
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
  readonly fixedWidthRandomGenerator: (length: number) => () => string = (length: number) => {
    // Secure, unbiased integer in [0, mask) using Node's crypto.
    // Reference (non-secure) equivalent for understanding `mask` meaning:
    //   Math.floor(Math.random() * mask)  // yields 0..mask-1
    // Instead of fixed 8 bytes, compute the minimal number of bytes required per mask
    // and build a sampler once to avoid extra work per generated chunk.
    const makeSecureIntBelow = (mask: number): (() => number) => {
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
          const buf = randomBytes(nBytes);
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

    const mask0Digits = this.maxSafeDigits;
    const mask0 = Number(this.to10(this.mask(mask0Digits)));

    const mask1Digits = length % mask0Digits;
    const mask1 = mask1Digits > 0 ? Number(this.to10(this.mask(mask1Digits))) : 0;

    const mask0Count = Math.floor(length / mask0Digits);

    // Build samplers once per generator instance
    const sample0 = mask0Count > 0 ? makeSecureIntBelow(mask0) : undefined;
    const sample1 = mask1Digits > 0 ? makeSecureIntBelow(mask1) : undefined;

    const genWith = (sampler: () => number, width: number, p: string) =>
      this.from10(sampler()).padStart(width, p);

    const genRepeatWith = (n: number, sampler: () => number, width: number, p: string) => {
      const r: string[] = [];
      for (let i = 0; i < n; ++i) {
        r.push(genWith(sampler, width, p));
      }
      return r.join('');
    };

    if (mask0Count < 1 && sample1) {
      return () => genWith(sample1, length, pad);
    }
    if (mask1Digits < 1 && sample0) {
      return () => genRepeatWith(mask0Count, sample0, mask0Digits, pad);
    }
    /* istanbul ignore else */
    if (sample0 && sample1) {
      return () =>
        `${genRepeatWith(mask0Count, sample0, mask0Digits, pad)}${genWith(sample1, mask1Digits, pad)}`;
    } else {
      // Fallback (should not be reached given validations)
      return () => '';
    }
  };
}
