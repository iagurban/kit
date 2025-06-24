import { convertToRoman } from './roman';

describe('convertToRoman', () => {
  describe('basic single-symbol numbers', () => {
    const cases = [
      [1, 'I'],
      [5, 'V'],
      [10, 'X'],
      [50, 'L'],
      [100, 'C'],
      [500, 'D'],
      [1000, 'M'],
    ] as const;

    test.each(cases)('converts %i to %s', (input, expected) => {
      expect(convertToRoman(input)).toBe(expected);
    });
  });

  describe('subtractive combinations', () => {
    const cases = [
      [4, 'IV'],
      [9, 'IX'],
      [40, 'XL'],
      [90, 'XC'],
      [400, 'CD'],
      [900, 'CM'],
    ] as const;

    test.each(cases)('converts %i to %s', (input, expected) => {
      expect(convertToRoman(input)).toBe(expected);
    });
  });

  describe('additive combinations', () => {
    const cases = [
      [2, 'II'],
      [3, 'III'],
      [6, 'VI'],
      [7, 'VII'],
      [8, 'VIII'],
      [11, 'XI'],
      [12, 'XII'],
      [15, 'XV'],
      [16, 'XVI'],
    ] as const;

    test.each(cases)('converts %i to %s', (input, expected) => {
      expect(convertToRoman(input)).toBe(expected);
    });
  });

  describe('complex numbers', () => {
    const cases = [
      [49, 'XLIX'],
      [99, 'XCIX'],
      [499, 'CDXCIX'],
      [999, 'CMXCIX'],
      [2024, 'MMXXIV'],
      [3999, 'MMMCMXCIX'],
    ] as const;

    test.each(cases)('converts %i to %s', (input, expected) => {
      expect(convertToRoman(input)).toBe(expected);
    });
  });

  describe('repeated symbols', () => {
    const cases = [
      [2000, 'MM'],
      [3000, 'MMM'],
      [300, 'CCC'],
      [30, 'XXX'],
      [3, 'III'],
    ] as const;

    test.each(cases)('correctly repeats symbols for %i to %s', (input, expected) => {
      expect(convertToRoman(input)).toBe(expected);
    });
  });

  describe('optimization checks', () => {
    test('handles small numbers efficiently', () => {
      // Should start with smaller symbols for small numbers
      expect(convertToRoman(1)).toBe('I');
      expect(convertToRoman(2)).toBe('II');
    });

    test('handles large numbers efficiently', () => {
      // Should start with larger symbols for large numbers
      expect(convertToRoman(3999)).toBe('MMMCMXCIX');
      expect(convertToRoman(2000)).toBe('MM');
    });
  });

  describe('boundary cases', () => {
    const cases = [
      [1, 'I'], // Minimum valid value
      [3999, 'MMMCMXCIX'], // Maximum standard Roman numeral
      [1000, 'M'], // Lowest value using M
      [999, 'CMXCIX'], // Highest value without M
      [500, 'D'], // Lowest value using D
      [499, 'CDXCIX'], // Highest value without D
    ] as const;

    test.each(cases)('handles boundary value %i correctly as %s', (input, expected) => {
      expect(convertToRoman(input)).toBe(expected);
    });
  });

  describe('property checks', () => {
    test('generates valid Roman numerals', () => {
      // Test that output only contains valid Roman numeral characters
      const validChars = new Set('IVXLCDM'.split(''));
      for (let i = 1; i <= 100; i++) {
        const result = convertToRoman(i);
        expect(result.split('').every(char => validChars.has(char))).toBe(true);
      }
    });

    test('generates unique representations', () => {
      // Test that different numbers produce different Roman numerals
      const seen = new Set<string>();
      for (let i = 1; i <= 100; i++) {
        const result = convertToRoman(i);
        expect(seen.has(result)).toBe(false);
        seen.add(result);
      }
    });
  });
});
