import { secondsOffsetToString, timeStringToSecondsOffset } from './seconds-offset';

describe('secondsOffsetToString', () => {
  it('по умолчанию не показывает секунды и миллисекунды при нулевых значениях', () => {
    expect(secondsOffsetToString(0)).toBe('00:00');
  });

  it('корректно форматирует минуты и часы', () => {
    expect(secondsOffsetToString(60)).toBe('00:01');
    expect(secondsOffsetToString(3600)).toBe('01:00');
  });

  it('по умолчанию показывает секунды и миллисекунды, если они ненулевые', () => {
    expect(secondsOffsetToString(3661.234)).toBe('01:01:01.234');
  });

  it('не показывает секунды, когда options.s=false', () => {
    expect(secondsOffsetToString(3661.234, { s: false })).toBe('01:01.234');
  });

  it('не показывает миллисекунды, когда options.ms=false', () => {
    expect(secondsOffsetToString(3661.234, { ms: false })).toBe('01:01:01');
  });

  it('не показывает ни секунды, ни миллисекунды, когда options.s=false и options.ms=false', () => {
    expect(secondsOffsetToString(3661.234, { s: false, ms: false })).toBe('01:01');
  });

  it('показывает секунды при options.s=true даже если они нулевые', () => {
    expect(secondsOffsetToString(60, { s: true })).toBe('00:01:00');
  });

  it('показывает миллисекунды при options.ms=true даже если они нулевые', () => {
    expect(secondsOffsetToString(60, { ms: true })).toBe('00:01.000');
  });
});

describe('timeStringToSecondsOffset', () => {
  it('конвертирует только часы и минуты', () => {
    expect(timeStringToSecondsOffset('00:01')).toBe(60);
    expect(timeStringToSecondsOffset('01:00')).toBe(3600);
  });

  it('конвертирует часы, минуты и секунды', () => {
    expect(timeStringToSecondsOffset('01:01:01')).toBe(3661);
  });

  it('конвертирует часы, минуты, секунды и миллисекунды', () => {
    // 1*3600 + 1*60 + 1 + 0.234 = 3661.234 -> Math.round = 3661
    expect(timeStringToSecondsOffset('01:01:01.234')).toBe(3661);
  });

  it('бросает ошибку при неверном формате', () => {
    expect(() => timeStringToSecondsOffset('abc')).toThrowError('wrong time format: abc');
  });
});
