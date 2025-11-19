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
      expect(custom.base).toBe(28n);
      expect(custom.digits.length).toBe(28);
    });

    test('should validate input ranges and throw on invalid configurations', () => {
      // Invalid range (end before start)
      expect(() => new NumberConverter([['9', '0']]).digits).toThrow();

      // Duplicate characters
      expect(() => new NumberConverter(['a', 'a']).digits).toThrow();
      expect(() => new NumberConverter([['a', 'c'], 'b']).digits).toThrow();

      // Invalid range format
      expect(
        () =>
          new NumberConverter([['a']] as unknown as readonly (string | readonly [string, string])[]).digits
      ).toThrow();
      expect(
        () =>
          new NumberConverter([['a', 'b', 'c']] as unknown as readonly (string | readonly [string, string])[])
            .digits
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

      // maxSafeDigits = fixedWidthRandomGenerator(8).length = 8
      expect(new NumberConverter([[' ', 'z']]).fixedWidthRandomGenerator(8)().length).toBe(8);

      // Test fixed width generator edge cases
      expect(() => hex.fixedWidthRandomGenerator(0)).toThrow();
      expect(() => hex.fixedWidthRandomGenerator(-1)).toThrow();

      const smallGen = hex.fixedWidthRandomGenerator(2);
      const largeGen = hex.fixedWidthRandomGenerator(20);
      expect(smallGen()).toHaveLength(2);
      expect(largeGen()).toHaveLength(20);
    });

    test('fixedWidthRandomGenerator should only use valid digits and keep exact length across many samples', () => {
      const len = 12;
      const gen = hex.fixedWidthRandomGenerator(len);
      const valid = new Set(hex.digits.map(cc => String.fromCharCode(cc)));
      for (let i = 0; i < 100; i++) {
        const s = gen();
        expect(s).toHaveLength(len);
        // all chars must be from the alphabet
        for (const ch of s) {
          expect(valid.has(ch)).toBe(true);
        }
      }
    });

    test('fixedWidthRandomGenerator padding works when length % maxSafeDigits !== 0', () => {
      const msd = hex.maxSafeDigits; // width of primary chunks
      const len = msd + 3; // remainder chunk exists
      const gen = hex.fixedWidthRandomGenerator(len);
      const s = gen();
      expect(s).toHaveLength(len);
      // Validate alphabet
      const valid = new Set(hex.digits.map(cc => String.fromCharCode(cc)));
      for (const ch of s) {
        expect(valid.has(ch)).toBe(true);
      }
    });

    test('fixedWidthRandomGenerator works for extreme lengths (performance smoke) and bases', () => {
      // Base62
      const b62 = new NumberConverter([
        ['0', '9'],
        ['a', 'z'],
        ['A', 'Z'],
      ]);
      const g62 = b62.fixedWidthRandomGenerator(64);
      const v62 = g62();
      expect(v62).toHaveLength(64);
      // Custom base with a non-"0" first digit to ensure padding digit isn’t assumed to be '0'
      const custom = new NumberConverter([['a', 'c']]); // digits: a,b,c
      const gC = custom.fixedWidthRandomGenerator(17);
      const vC = gC();
      expect(vC).toHaveLength(17);
      for (const ch of vC) {
        expect(['a', 'b', 'c'].includes(ch)).toBe(true);
      }
    });

    test('fixedWidthRandomGenerator rejects invalid lengths', () => {
      expect(() => hex.fixedWidthRandomGenerator(0)).toThrow();
      expect(() => hex.fixedWidthRandomGenerator(-5)).toThrow();
      expect(() => hex.fixedWidthRandomGenerator(Number.NaN)).toThrow();
      expect(() => hex.fixedWidthRandomGenerator(1.5)).toThrow();
    });

    test('random() produces valid digits and correct length; rejects invalid lengths', () => {
      const s = hex.random(32);
      expect(s).toHaveLength(32);
      const valid = new Set(hex.digits.map(cc => String.fromCharCode(cc)));
      for (const ch of s) {
        expect(valid.has(ch)).toBe(true);
      }
      expect(() => hex.random(0)).toThrow();
      expect(() => hex.random(-3)).toThrow();
      expect(() => hex.random(2.2)).toThrow();
    });

    test('basic uniqueness sanity for fixedWidthRandomGenerator (non-cryptographic test)', () => {
      // Generate many IDs and ensure most are unique; allow some duplicates statistically.
      const gen = hex.fixedWidthRandomGenerator(8); // 16^8 space is huge
      const n = 2000;
      const seen = new Set<string>();
      for (let i = 0; i < n; i++) {
        seen.add(gen());
      }
      // Expect at least 99% unique in this small sample
      expect(seen.size).toBeGreaterThanOrEqual(Math.floor(n * 0.99));
    });

    test('rough distribution sanity check on first character (non-flaky thresholds)', () => {
      const gen = hex.fixedWidthRandomGenerator(6);
      const counts: Record<string, number> = {};
      const samples = 5000;
      for (let i = 0; i < samples; i++) {
        const ch = gen()[0];
        counts[ch] = (counts[ch] || 0) + 1;
      }
      const arr = Object.values(counts);
      // Ensure all hex digits appeared at least once
      expect(Object.keys(counts).length).toBe(hex.digits.length);
      // max/min ratio should not be extremely skewed; allow generous 5x to avoid flakiness
      const max = Math.max(...arr);
      const min = Math.min(...arr);
      expect(max / min).toBeLessThan(5);
    });
  });
});
