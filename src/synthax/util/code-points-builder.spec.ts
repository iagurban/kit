import { CodePointsBuilder } from './code-points-builder';

describe('code-points-builder', () => {
  test(`all`, () => {
    expect(() => {
      new CodePointsBuilder().range(`aaa`);
    }).toThrow();
    expect(() => {
      new CodePointsBuilder().range(`aa`);
    }).toThrow();
    expect(() => {
      new CodePointsBuilder().range(`a`);
    }).toThrow();

    {
      const b = new CodePointsBuilder().digits().range(`af`).any(`-+`);
      expect(b.cps.has(`0`.codePointAt(0)!)).toBe(true);
      expect(b.cps.has(`9`.codePointAt(0)!)).toBe(true);
      expect(b.cps.has(`a`.codePointAt(0)!)).toBe(true);
      expect(b.cps.has(`e`.codePointAt(0)!)).toBe(true);
      expect(b.cps.has(`f`.codePointAt(0)!)).toBe(true);
      expect(b.cps.has(`g`.codePointAt(0)!)).toBe(false);
      expect(b.cps.has(`z`.codePointAt(0)!)).toBe(false);
      expect(b.cps.has(`+`.codePointAt(0)!)).toBe(true);
      expect(b.cps.has(`=`.codePointAt(0)!)).toBe(false);
    }
  });
});
