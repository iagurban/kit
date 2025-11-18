import { aggregation } from './aggregation';

describe('aggregation', () => {
  describe('basic operations', () => {
    describe('avg (arithmetic mean)', () => {
      it('should calculate average correctly', () => {
        expect(aggregation.avg([1, 2, 3, 4, 5])).toBe(3);
        expect(aggregation.avg([0, 10])).toBe(5);
      });

      it('should handle empty array', () => {
        expect(aggregation.avg([])).toBe(0);
      });

      it('should handle single value', () => {
        expect(aggregation.avg([5])).toBe(5);
      });
    });

    describe('sum', () => {
      it('should calculate sum correctly', () => {
        expect(aggregation.sum([1, 2, 3, 4, 5])).toBe(15);
        expect(aggregation.sum([-1, 1])).toBe(0);
      });

      it('should handle empty array', () => {
        expect(aggregation.sum([])).toBe(0);
      });
    });

    describe('mul (product)', () => {
      it('should calculate product correctly', () => {
        expect(aggregation.mul([2, 3, 4])).toBe(24);
        expect(aggregation.mul([1, -2, 3])).toBe(-6);
      });

      it('should handle empty array', () => {
        expect(aggregation.mul([])).toBe(0);
      });
    });
  });

  describe('statistical operations', () => {
    describe('med (median)', () => {
      it('should calculate median for odd length arrays', () => {
        expect(aggregation.med([1, 3, 2])).toBe(2);
      });

      it('should calculate median for even length arrays', () => {
        expect(aggregation.med([1, 2, 3, 4])).toBe(2.5);
      });

      it('should handle empty array', () => {
        expect(aggregation.med([])).toBe(0);
      });

      it('should handle single value', () => {
        expect(aggregation.med([5])).toBe(5);
      });
    });

    describe('variance and std', () => {
      it('should calculate variance correctly', () => {
        expect(aggregation.variance([2, 4, 4, 4, 6])).toBe(1.6);
      });

      it('should calculate standard deviation correctly', () => {
        expect(aggregation.std([2, 4, 4, 4, 6])).toBe(Math.sqrt(1.6));
      });

      it('should handle empty array', () => {
        expect(aggregation.variance([])).toBe(0);
        expect(aggregation.std([])).toBe(0);
      });

      it('should handle single value', () => {
        expect(aggregation.variance([5])).toBe(0);
        expect(aggregation.std([5])).toBe(0);
      });
    });

    describe('geometric and harmonic means', () => {
      it('should calculate geometric mean correctly', () => {
        expect(aggregation.geoMean([1, 2, 4])).toBeCloseTo(2, 5);
      });

      it('should calculate harmonic mean correctly', () => {
        expect(aggregation.harmMean([1, 2, 4])).toBeCloseTo(1.714286, 5);
      });

      it('should handle empty array', () => {
        expect(aggregation.geoMean([])).toBe(0);
        expect(aggregation.harmMean([])).toBe(0);
      });

      it('should handle zeros for harmonic mean', () => {
        expect(aggregation.harmMean([1, 0, 2])).toBe(0);
      });
    });
  });

  describe('range operations', () => {
    describe('min and max', () => {
      it('should find minimum and maximum values', () => {
        const numbers = [3, 1, 4, 1, 5];
        expect(aggregation.min(numbers)).toBe(1);
        expect(aggregation.max(numbers)).toBe(5);
      });

      it('should handle empty array', () => {
        expect(aggregation.min([])).toBe(0);
        expect(aggregation.max([])).toBe(0);
      });
    });

    describe('range', () => {
      it('should calculate range correctly', () => {
        expect(aggregation.range([1, 2, 3, 4, 5])).toBe(4);
      });

      it('should handle empty array', () => {
        expect(aggregation.range([])).toBe(0);
      });
    });
  });

  describe('percentile operations', () => {
    describe('p90 (90th percentile)', () => {
      it('should calculate 90th percentile correctly', () => {
        expect(aggregation.p90([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(9.1);
        expect(aggregation.p90([1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9])).toBe(9);
      });

      it('should handle empty array', () => {
        expect(aggregation.p90([])).toBe(0);
      });
    });

    describe('percentile factory', () => {
      it('should calculate custom percentiles correctly', () => {
        const p75 = aggregation.percentile(75);
        expect(p75([1, 2, 3, 4])).toBe(3.25);
      });
    });
  });

  describe('trimmed mean operations', () => {
    describe('trimmed10 (10% trimmed mean)', () => {
      it('should calculate 10% trimmed mean correctly', () => {
        expect(aggregation.trimmed10([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5);
      });

      it('should handle small arrays', () => {
        expect(aggregation.trimmed10([1, 2])).toBe(1.5);
      });
    });

    describe('trimmedMean factory', () => {
      it('should create custom trimmed mean calculator', () => {
        const trim20 = aggregation.trimmedMean(20);
        expect(trim20([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBeCloseTo(5.5, 5);
        expect(trim20([1])).toBeCloseTo(1, 5);
      });
    });
  });

  describe('counting operations', () => {
    describe('count', () => {
      it('should return array length', () => {
        expect(aggregation.count([1, 2, 3])).toBe(3);
        expect(aggregation.count([])).toBe(0);
      });
    });

    describe('uniqueCount', () => {
      it('should count unique values', () => {
        expect(aggregation.uniqueCount([1, 2, 2, 3, 3, 3])).toBe(3);
        expect(aggregation.uniqueCount([])).toBe(0);
      });
    });
  });

  describe('root mean square', () => {
    it('should calculate RMS correctly', () => {
      expect(aggregation.rms([1, 2, 3])).toBeCloseTo(2.16024689947, 5);
    });

    it('should handle empty array', () => {
      expect(aggregation.rms([])).toBe(0);
    });
  });

  describe('mode', () => {
    it('should find most frequent value', () => {
      expect(aggregation.mode([1, 2, 2, 3, 2, 4])).toBe(2);
    });

    it('should return first mode if multiple exist', () => {
      expect(aggregation.mode([1, 1, 2, 2])).toBe(1);
    });

    it('should handle empty array', () => {
      expect(aggregation.mode([])).toBe(0);
    });
  });
});
