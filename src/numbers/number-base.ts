import { NumberConverter } from './number-converter';

type Doubled<T extends Record<string | number, unknown>> = {
  [K in keyof T as K extends string | number ? `${K}` : never]: NumberConverter;
} & {
  [K in keyof T as K extends string | number ? `b${K}` : never]: NumberConverter;
};

const typed = <T extends Record<string | number, readonly (string | readonly [string, string])[]>>(
  o: T
): Doubled<T> => {
  const r: Record<string, NumberConverter> = {};
  for (const [k, v] of Object.entries(o)) {
    r[k] = r[`b${k}`] = new NumberConverter(v);
  }
  return r as Doubled<T>;
};

/**
 * Provides number base conversion utilities with predefined bases and their corresponding digit sets.
 * Each base N is accessible through two equivalent ways:
 * - Array-like access: NumberBase[N]
 * - Property access: NumberBase.bN
 *
 * Both access methods return the same NumberConverter instance for the given base.
 *
 * @example
 * ```typescript
 * // These are equivalent:
 * NumberBase[16].toString(255)  // "ff"
 * NumberBase.b16.toString(255)  // "ff"
 *
 * // Converting between bases
 * const hex = NumberBase.b16.toString(255);    // "ff"
 * const dec = NumberBase.b16.fromString("ff"); // 255n
 * ```
 *
 * @property {NumberConverter} 2, b2 - Binary (0-1)
 * @property {NumberConverter} 3, b3 - Ternary (0-2)
 * @property {NumberConverter} 4, b4 - Quaternary (0-3)
 * @property {NumberConverter} 6, b6 - Senary (0-5)
 * @property {NumberConverter} 8, b8 - Octal (0-7)
 * @property {NumberConverter} 10, b10 - Decimal (0-9)
 * @property {NumberConverter} 16, b16 - Hexadecimal (0-9, a-f)
 * @property {NumberConverter} 62, b62 - Base62 (0-9, a-z, A-Z)
 * @property {NumberConverter} 70, b70 - Base70 (0-9, a-z, A-Z, !@$&%+_=)
 * @property {NumberConverter} 88, b88 - Base88 (0-9, a-z, A-Z, _+-=~!?@#:*&^%$.,{}[]<>'"/")
 *
 * @property {function} splitDigits10 - Splits a bigint into an array of decimal digits
 * @param {bigint} n - The number to split into digits
 * @returns {bigint[]} Array of decimal digits in big-endian order (most significant digit first)
 *
 * @example
 * ```typescript
 * NumberBase.splitDigits10(1234n) // Returns [1n, 2n, 3n, 4n]
 * ```
 */
export const NumberBase = {
  ...typed({
    2: [['0', '1']],
    3: [['0', '2']],
    4: [['0', '3']],
    6: [['0', '5']],
    8: [['0', '7']],
    10: [['0', '9']],
    16: [
      ['0', '9'],
      ['a', 'f'],
    ],
    62: [
      ['0', '9'],
      ['a', 'z'],
      ['A', 'Z'],
    ],
    70: [['0', '9'], ['a', 'z'], ['A', 'Z'], '!@$&%+_='],
    88: [['0', '9'], ['a', 'z'], ['A', 'Z'], `_+-=~!?@#:*&^%$.,{}[]<>'"/`],
  } as const),

  splitDigits10: (n: bigint): bigint[] => {
    const b10 = NumberBase.b10.powers;
    const r: bigint[] = [];
    for (let i = 0; ; ++i) {
      const v = n / b10.get(i);
      if (v < 1) {
        return r.reverse();
      }
      r.push(v % 10n);
    }
  },
};
