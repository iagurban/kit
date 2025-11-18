import { clamp, scale, scaleFrom01, scaleTo01, snap } from './utils';

describe('numeric-utils', () => {
  describe('snap', () => {
    it('should round to nearest step by default', () => {
      expect(snap(3.7, 1)).toBe(4);
      expect(snap(3.2, 1)).toBe(3);
      expect(snap(10.6, 5)).toBe(10);
      expect(snap(12.6, 5)).toBe(15);
    });

    it('should respect ceil mode', () => {
      expect(snap(3.1, 1, 'ceil')).toBe(4);
      expect(snap(3.9, 1, 'ceil')).toBe(4);
      expect(snap(10.1, 5, 'ceil')).toBe(15);
      expect(snap(10.9, 5, 'ceil')).toBe(15);
    });

    it('should respect floor mode', () => {
      expect(snap(3.1, 1, 'floor')).toBe(3);
      expect(snap(3.9, 1, 'floor')).toBe(3);
      expect(snap(10.1, 5, 'floor')).toBe(10);
      expect(snap(14.9, 5, 'floor')).toBe(10);
    });

    it('should handle decimal steps', () => {
      expect(snap(3.14, 0.1)).toBe(3.1);
      expect(snap(3.16, 0.1)).toBe(3.2);
      expect(snap(3.15, 0.1, 'ceil')).toBe(3.2);
      expect(snap(3.15, 0.1, 'floor')).toBe(3.1);
    });

    it('should handle negative numbers', () => {
      expect(snap(-3.7, 1)).toBe(-4);
      expect(snap(-3.2, 1)).toBe(-3);
      expect(snap(-10.6, 5)).toBe(-10);
      expect(snap(-12.6, 5)).toBe(-15);
    });
  });

  describe('scaleFrom01', () => {
    it('should scale from 0-1 range to target range', () => {
      expect(scaleFrom01(0, 0, 100)).toBe(0);
      expect(scaleFrom01(1, 0, 100)).toBe(100);
      expect(scaleFrom01(0.5, 0, 100)).toBe(50);
    });

    it('should handle negative ranges', () => {
      expect(scaleFrom01(0, -100, 100)).toBe(-100);
      expect(scaleFrom01(1, -100, 100)).toBe(100);
      expect(scaleFrom01(0.5, -100, 100)).toBe(0);
    });

    it('should handle inverse ranges', () => {
      expect(scaleFrom01(0, 100, 0)).toBe(100);
      expect(scaleFrom01(1, 100, 0)).toBe(0);
      expect(scaleFrom01(0.5, 100, 0)).toBe(50);
    });

    it('should handle decimal values', () => {
      expect(scaleFrom01(0.3, 0, 10)).toBe(3);
      expect(scaleFrom01(0.25, 0, 4)).toBe(1);
    });
  });

  describe('scaleTo01', () => {
    it('should scale from source range to 0-1', () => {
      expect(scaleTo01(0, 0, 100)).toBe(0);
      expect(scaleTo01(100, 0, 100)).toBe(1);
      expect(scaleTo01(50, 0, 100)).toBe(0.5);
    });

    it('should handle negative ranges', () => {
      expect(scaleTo01(-100, -100, 100)).toBe(0);
      expect(scaleTo01(100, -100, 100)).toBe(1);
      expect(scaleTo01(0, -100, 100)).toBe(0.5);
    });

    it('should handle inverse ranges', () => {
      expect(scaleTo01(100, 100, 0) === 0).toBe(true);
      expect(scaleTo01(0, 100, 0)).toBe(1);
      expect(scaleTo01(50, 100, 0)).toBe(0.5);
    });

    it('should handle decimal values', () => {
      expect(scaleTo01(3, 0, 10)).toBe(0.3);
      expect(scaleTo01(1, 0, 4)).toBe(0.25);
    });
  });

  describe('scale', () => {
    it('should scale between arbitrary ranges', () => {
      expect(scale(50, 0, 100, 0, 1)).toBe(0.5);
      expect(scale(0.5, 0, 1, 0, 100)).toBe(50);
      expect(scale(5, 0, 10, 0, 100)).toBe(50);
    });

    it('should handle negative ranges', () => {
      expect(scale(0, -100, 100, 0, 1)).toBe(0.5);
      expect(scale(0, 0, 100, -1, 1)).toBe(-1);
      expect(scale(-50, -100, 0, 0, 100)).toBe(50);
    });

    it('should handle inverse ranges', () => {
      expect(scale(75, 0, 100, 100, 0)).toBe(25);
      expect(scale(25, 100, 0, 0, 100)).toBe(75);
    });

    it('should handle decimal values', () => {
      expect(scale(5, 0, 10, 0, 1)).toBe(0.5);
      expect(scale(0.5, 0, 1, 0, 10)).toBe(5);
    });
  });

  describe('clamp', () => {
    it('should limit values to specified range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle negative ranges', () => {
      expect(clamp(0, -10, 10)).toBe(0);
      expect(clamp(-15, -10, 10)).toBe(-10);
      expect(clamp(15, -10, 10)).toBe(10);
    });

    it('should handle decimal values', () => {
      expect(clamp(3.5, 0, 5)).toBe(3.5);
      expect(clamp(-0.5, 0, 1)).toBe(0);
      expect(clamp(1.5, 0, 1)).toBe(1);
    });

    it('should handle inverse min/max', () => {
      expect(() => clamp(5, 10, 0)).toThrow();
      expect(() => clamp(-5, 10, 0)).toThrow();
      expect(() => clamp(15, 10, 0)).toThrow();
    });

    it('should handle equal min/max', () => {
      expect(clamp(5, 10, 10)).toBe(10);
      expect(clamp(15, 10, 10)).toBe(10);
      expect(clamp(5, 0, 0)).toBe(0);
    });
  });
});
