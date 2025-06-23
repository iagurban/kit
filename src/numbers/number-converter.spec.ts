import { NumberConverter, Powers } from './number-converter';

describe('Powers', () => {
  describe('constructor and initialization', () => {
    test('should properly initialize and handle different base values', () => {
      // Base cases
      const base2 = new Powers(2n);
      expect(base2.base).toBe(2n);
      expect(base2.get(0)).toBe(1n);
      expect(base2.get(1)).toBe(2n);

      const base16 = new Powers(16n);
      expect(base16.base).toBe(16n);
      expect(base16.get(0)).toBe(1n);
      expect(base16.get(1)).toBe(16n);
      expect(base16.get(2)).toBe(256n);

      // Large base
      const base1000 = new Powers(1000n);
      expect(base1000.get(3)).toBe(1000000000n);
    });

    test('should throw on invalid base values', () => {
      expect(() => new Powers(0n)).toThrow('mapping length must be > 1');
      expect(() => new Powers(1n)).toThrow('mapping length must be > 1');
      expect(() => new Powers(-5n)).toThrow('mapping length must be > 1');
    });
  });

  test('should compute and cache powers correctly', () => {
    const powers = new Powers(3n);
    // Test sequential access
    expect(powers.get(0)).toBe(1n);
    expect(powers.get(1)).toBe(3n);
    expect(powers.get(2)).toBe(9n);
    expect(powers.get(3)).toBe(27n);

    // Test random access (should use cache)
    expect(powers.get(2)).toBe(9n);
    expect(powers.get(1)).toBe(3n);

    // Test jumping to higher power (should compute intermediate values)
    expect(powers.get(5)).toBe(243n);
  });
});

describe('NumberConverter', () => {
  describe('constructor and basic properties', () => {
    test('should handle various digit mappings and compute properties correctly', () => {
      const hex = new NumberConverter([
        ['0', '9'],
        ['a', 'f'],
      ]);
      expect(hex.base).toBe(16n);
      expect(hex.digits.length).toBe(16);
      expect(String.fromCharCode(...hex.digits)).toBe('0123456789abcdef');

      const binary = new NumberConverter(['0', '1']);
      expect(binary.base).toBe(2n);
      expect(binary.digits.length).toBe(2);

      const custom = new NumberConverter([['A', 'Z'], '#', '@']);
      expect(custom.base).toBe(27n);
      expect(custom.digits.length).toBe(27);
    });

    test('should validate input ranges and throw on invalid configurations', () => {
      // Invalid range (end before start)
      expect(() => new NumberConverter([['9', '0']])).toThrow();

      // Duplicate characters
      expect(() => new NumberConverter(['a', 'a'])).toThrow('duplicates');
      expect(() => new NumberConverter([['a', 'c'], 'b'])).toThrow('duplicates');

      // Invalid range format
      expect(
        () => new NumberConverter([['a']] as unknown as readonly (string | readonly [string, string])[])
      ).toThrow();
      expect(
        () =>
          new NumberConverter([['a', 'b', 'c']] as unknown as readonly (string | readonly [string, string])[])
      ).toThrow();
    });
  });

  describe('conversion methods', () => {
    const base36 = new NumberConverter([
      ['0', '9'],
      ['a', 'z'],
    ]);

    test('should convert numbers between decimal and custom base correctly', () => {
      // Test various number sizes and formats
      expect(base36.from10(0)).toBe('0');
      expect(base36.from10('42')).toBe('16');
      expect(base36.from10(255n)).toBe('73');
      expect(base36.to10('0')).toBe(0n);
      expect(base36.to10('z')).toBe(35n);
      expect(base36.to10('zz')).toBe(1295n);

      // Test round-trip conversion
      const numbers = [0, 42, 1000, 123456];
      for (const num of numbers) {
        expect(base36.to10(base36.from10(num))).toBe(BigInt(num));
      }
    });

    test('should handle error cases in conversion methods', () => {
      // Invalid input for from10
      expect(() => base36.from10(-1)).toThrow('n is negative');
      expect(() => base36.from10(3.14)).toThrow('n is floating');

      // Invalid characters for to10
      expect(() => base36.to10('!')).toThrow('invalid char');
      expect(() => base36.to10('abc!')).toThrow('invalid char');

      // Base 10 restriction
      const base10 = new NumberConverter([['0', '9']]);
      expect(() => base10.from10(42)).toThrow('mapping length must be != 10');
    });
  });

  describe('random generation and utility methods', () => {
    const hex = new NumberConverter([
      ['0', '9'],
      ['a', 'f'],
    ]);

    test('should generate random values with correct format and length', () => {
      const length = 8;
      const randomValue = hex.random(length);
      expect(randomValue).toHaveLength(length);
      expect(() => hex.to10(randomValue)).not.toThrow(); // Valid in the number system

      // Test fixed width generator
      const generator = hex.fixedWidthRandomGenerator(length);
      const generated = generator();
      expect(generated).toHaveLength(length);
      expect(() => hex.to10(generated)).not.toThrow();

      // Invalid length handling
      expect(() => hex.random(0)).toThrow();
      expect(() => hex.random(-1)).toThrow();
      expect(() => hex.random(1.5)).toThrow();
    });

    test('should handle mask and maxSafeDigits correctly', () => {
      expect(hex.mask(3)).toBe('fff');
      expect(hex.maxSafeDigits).toBe(hex.from10(BigInt(Number.MAX_SAFE_INTEGER)).length - 1);

      // Test fixed width generator edge cases
      expect(() => hex.fixedWidthRandomGenerator(0)).toThrow();
      expect(() => hex.fixedWidthRandomGenerator(-1)).toThrow();

      const smallGen = hex.fixedWidthRandomGenerator(2);
      const largeGen = hex.fixedWidthRandomGenerator(20);
      expect(smallGen()).toHaveLength(2);
      expect(largeGen()).toHaveLength(20);
    });
  });
});
