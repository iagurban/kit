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
  get digits(): readonly number[] {
    const r: number[] = [];
    for (const e of this.parts) {
      if (Array.isArray(e)) {
        if (e.length !== 2 || e[0].length !== 1 || e[1].length !== 1) {
          throw new Error('fskdfjgksj');
        }
        const [from, to] = Array.from(e).map(s => s.charCodeAt(0));
        if (from > to) {
          throw new Error('sfldhgsjfgk');
        }
        r.push(...Array.from({ length: to - from + 1 }, (_, i) => from + i));
      } else {
        r.push(...Array.from(e).map(s => s.charCodeAt(0)));
      }
    }
    if (new Set(r).size !== r.length) {
      throw new Error('duplicates');
    }
    return r;
  }

  /** Gets the Powers calculator for this number system's base */
  get powers(): Powers {
    return new Powers(this.base);
  }

  /** Maps each digit's character code to its numeric value in the system */
  get byChar(): Map<number, bigint> {
    return new Map(this.digits.map((cc, i) => [cc, BigInt(i)] as const));
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
    const gen = (mask: number, width: number, pad: string) =>
      this.from10(Math.floor(Math.random() * mask)).padStart(width, pad);

    const genRepeat = (n: number, mask: number, width: number, pad: string) => {
      const r: string[] = [];
      for (let i = 0; i < n; ++i) {
        r.push(gen(mask, width, pad));
      }
      return r.join('');
    };

    if (length < 1 || Math.floor(length) !== length) {
      throw new Error(`length must be integer < 1, got ${length}`);
    }

    const pad = String.fromCharCode(this.digits[0]);

    const mask0Digits = this.maxSafeDigits;
    const mask0 = Number(this.to10(this.mask(mask0Digits)));

    const mask1Digits = length % mask0Digits;
    const mask1 = Number(this.to10(this.mask(mask1Digits)));

    const mask0Count = Math.floor(length / mask0Digits);

    if (mask0Count < 1) {
      return () => gen(mask1, length, pad);
    }
    if (mask1Digits < 1) {
      return () => genRepeat(mask0Count, mask0, mask0Digits, pad);
    }
    return () => `${genRepeat(mask0Count, mask0, mask0Digits, pad)}${gen(mask1, mask1Digits, pad)}`;
  };
}
