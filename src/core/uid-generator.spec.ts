import { NumberBase } from './numbers/number-base';
import { shortUidGenerator, uidGenerator } from './uid-generator';

describe('uid generators (uidGenerator and shortUidGenerator)', () => {
  const b62 = NumberBase.b62;
  const digitsSet = new Set(b62.digits.map(cc => String.fromCharCode(cc)));
  const allCharsInAlphabet = (s: string) => Array.from(s).every(ch => digitsSet.has(ch));

  type Cfg = {
    name: string;
    gen: () => string;
    timeLen: number;
    totalLen: number;
  };

  const CFGS: Cfg[] = [
    { name: 'uidGenerator', gen: uidGenerator, timeLen: 4, totalLen: 20 },
    { name: 'shortUidGenerator', gen: shortUidGenerator, timeLen: 2, totalLen: 14 },
  ];

  let nowSpy: jest.SpyInstance<number, []> | undefined;
  afterEach(() => {
    nowSpy?.mockRestore();
  });

  for (const { name, gen, timeLen, totalLen } of CFGS) {
    describe(name, () => {
      const timeMask = Number(b62.to10(b62.mask(timeLen))); // 62^timeLen - 1

      test(`basic format: ${timeLen}-char time prefix + random tail; Base62-only; exact length`, () => {
        nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1234567890);
        const id1 = gen();
        const id2 = gen();

        expect(typeof id1).toBe('string');
        expect(id1).toHaveLength(totalLen);
        expect(id2).toHaveLength(totalLen);
        const prefix1 = id1.slice(0, timeLen);
        const prefix2 = id2.slice(0, timeLen);
        expect(prefix1).toHaveLength(timeLen);
        expect(prefix2).toHaveLength(timeLen);
        expect(allCharsInAlphabet(id1)).toBe(true);
        expect(allCharsInAlphabet(id2)).toBe(true);

        const randLen = totalLen - timeLen;
        expect(id1.slice(timeLen)).toHaveLength(randLen);
        expect(id2.slice(timeLen)).toHaveLength(randLen);
      });

      test(`time prefix equals (Date.now() % (62^${timeLen} - 1)) encoded in Base62 and padded to ${timeLen}`, () => {
        const cases = [0, 62, timeMask - 1, timeMask, timeMask + 1];
        for (const t of cases) {
          nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => t);
          const id = gen();
          const prefix = id.slice(0, timeLen);
          const expected = b62.from10(t % timeMask).padStart(timeLen, '0');
          expect(prefix).toBe(expected);
          expect(allCharsInAlphabet(prefix)).toBe(true);
          nowSpy.mockRestore();
        }
      });

      test('prefix is lexicographically increasing within cycle; wraps after cycle', () => {
        // Inside cycle
        const ts = [1000, 1001, 1002, 1003];
        const prefixes: string[] = [];
        for (const t of ts) {
          nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => t);
          prefixes.push(gen().slice(0, timeLen));
          nowSpy.mockRestore();
        }
        for (let i = 1; i < prefixes.length; i++) {
          expect(prefixes[i] > prefixes[i - 1]).toBe(true);
        }

        // Wrap behavior: just before wrap vs at wrap
        nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => timeMask - 1);
        const beforeWrap = gen().slice(0, timeLen);
        nowSpy.mockRestore();
        nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => timeMask);
        const atWrap = gen().slice(0, timeLen);
        nowSpy.mockRestore();

        expect(beforeWrap).not.toBe(atWrap);
        expect(atWrap < beforeWrap).toBe(true);
      });

      test('random tail changes between calls in the same millisecond (extremely likely)', () => {
        nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 777777777);
        const n = 1000;
        const seen = new Set<string>();
        for (let i = 0; i < n; i++) {
          const id = gen();
          const tail = id.slice(timeLen);
          seen.add(tail);
          expect(allCharsInAlphabet(tail)).toBe(true);
        }
        expect(seen.size).toBe(n);
      });

      test('uniqueness sanity across many IDs in one ms (overwhelmingly unique)', () => {
        nowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 13579);
        const n = 3000;
        const ids = new Set<string>();
        for (let i = 0; i < n; i++) {
          ids.add(gen());
        }
        expect(ids.size).toBeGreaterThanOrEqual(Math.floor(n * 0.995));
      });
    });
  }
});
