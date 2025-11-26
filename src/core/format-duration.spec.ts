import { formatDuration } from './format-duration';

describe('formatDuration', () => {
  it('should format a duration of 0 milliseconds correctly', () => {
    expect(formatDuration(0)).toBe('0.000s');
  });

  it('should format durations that are less than 1 second correctly', () => {
    expect(formatDuration(123)).toBe('0.123s');
    expect(formatDuration(999)).toBe('0.999s');
    expect(formatDuration(1)).toBe('0.001s');
  });

  it('should format durations between exact seconds correctly', () => {
    expect(formatDuration(1000)).toBe('1.000s');
    expect(formatDuration(1500)).toBe('1.500s');
    expect(formatDuration(1999)).toBe('1.999s');
  });

  it('should format durations in multiple seconds correctly', () => {
    expect(formatDuration(61000)).toBe('61.000s');
    expect(formatDuration(73123)).toBe('73.123s');
  });

  it('should pad milliseconds with leading zeroes if necessary', () => {
    expect(formatDuration(1001)).toBe('1.001s');
    expect(formatDuration(1010)).toBe('1.010s');
    expect(formatDuration(1100)).toBe('1.100s');
  });

  it('should handle durations with large values correctly', () => {
    expect(formatDuration(3600000)).toBe('3600.000s'); // 1 hour
    expect(formatDuration(123456789)).toBe('123456.789s');
  });

  it('should handle negative durations correctly', () => {
    expect(formatDuration(-123)).toBe('-0.123s');
    expect(formatDuration(-1000)).toBe('-1.000s');
    expect(formatDuration(-1123)).toBe('-1.123s');
  });
});
