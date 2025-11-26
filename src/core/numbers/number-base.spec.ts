import { NumberBase } from './number-base';
import { NumberConverter } from './number-converter';

describe('NumberBase', () => {
  // Test all predefined bases
  const bases = [2, 3, 4, 6, 8, 10, 16, 62, 70, 88] as const;

  describe('base verification', () => {
    test.each(bases)('base %i converter has correct base value', base => {
      // Test both access patterns
      const converterDirect = NumberBase[base] as NumberConverter;
      const converterProp = NumberBase[`b${base}`] as NumberConverter;

      // Verify base value
      expect(converterDirect.base).toBe(BigInt(base));
      expect(converterProp.base).toBe(BigInt(base));

      // Verify both access patterns return the same instance
      expect(converterDirect).toBe(converterProp);
    });
  });

  describe('conversion examples', () => {
    const testCases = [
      { base: 2, num: 42n, str: '101010' },
      { base: 16, num: 255n, str: 'ff' },
      { base: 62, num: 1000n, str: 'G8' },
    ] as const;

    test.each(testCases)(
      'base $base converts between decimal and string representation',
      ({ base, num, str }) => {
        const converter = NumberBase[`b${base}`];
        expect(converter.from10(num)).toBe(str);
        expect(converter.to10(str)).toBe(num);
      }
    );
  });

  describe('splitDigits10', () => {
    const testCases = [
      { input: 0n, expected: [] },
      { input: 1n, expected: [1n] },
      { input: 42n, expected: [4n, 2n] },
      { input: 1234n, expected: [1n, 2n, 3n, 4n] },
      { input: 9999n, expected: [9n, 9n, 9n, 9n] },
    ];

    test.each(testCases)('splits $input into digits correctly', ({ input, expected }) => {
      expect(NumberBase.splitDigits10(input)).toEqual(expected);
    });
  });

  describe('base characteristics', () => {
    test('base 2 contains only 0 and 1', () => {
      const binary = NumberBase.b2;
      expect(binary.digits.length).toBe(2);
      expect(String.fromCharCode(...binary.digits)).toBe('01');
    });

    test('base 16 contains 0-9 and a-f', () => {
      const hex = NumberBase.b16;
      const digits = String.fromCharCode(...hex.digits);
      expect(digits).toMatch(/[0-9a-f]{16}/);
      expect(digits.length).toBe(16);
    });

    test('base 62 contains alphanumeric characters', () => {
      const base62 = NumberBase.b62;
      const digits = String.fromCharCode(...base62.digits);
      expect(digits).toMatch(/[0-9a-zA-Z]{62}/);
      expect(digits.length).toBe(62);
    });
  });

  describe('error handling', () => {
    test('base 10 throws error on from10 conversion', () => {
      expect(() => NumberBase.b10.from10(42)).toThrow('mapping length must be != 10');
    });

    test('handles invalid input in to10 conversion', () => {
      expect(() => NumberBase.b16.to10('xyz')).toThrow('invalid char');
    });
  });

  describe('object structure', () => {
    test('has both number and bN properties for each base', () => {
      bases.forEach(base => {
        expect(NumberBase[base]).toBeInstanceOf(NumberConverter);
        expect(NumberBase[`b${base}`]).toBeInstanceOf(NumberConverter);
      });
    });

    test('has splitDigits10 function', () => {
      expect(typeof NumberBase.splitDigits10).toBe('function');
    });
  });

  describe('edge cases', () => {
    test('handles large numbers in splitDigits10', () => {
      const bigNum = 123456789123456789n;
      const digits = NumberBase.splitDigits10(bigNum);
      expect(digits.join('')).toBe(bigNum.toString());
    });

    test('handles single digit numbers in splitDigits10', () => {
      expect(NumberBase.splitDigits10(5n)).toEqual([5n]);
    });
  });
});
