import { NumberConverter } from './number-converter';

type Doubled<T extends Record<string | number, unknown>> = {
  [P in keyof T as P extends string | number ? `${P}` : never]: NumberConverter;
} & { [K in keyof T as K extends string | number ? `b${K}` : never]: NumberConverter };

const typed = <T extends Record<string | number, readonly (string | readonly [string, string])[]>>(
  o: T
): Doubled<T> => {
  const r: Record<string, NumberConverter> = {};
  for (const [k, v] of Object.entries(o)) {
    const c = new NumberConverter(v);
    r[k] = c;
    r[`b${k}`] = c;
  }
  return r as Doubled<T>;
};

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
    const b10 = NumberBase.b10.pows;
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
