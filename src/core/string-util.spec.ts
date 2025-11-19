import 'ts-jest';

import { makeMatchingTree } from './code-points-matching-tree';
import { allCodePoints, isUppercase } from './string-util';

describe('string utils', () => {
  test('allCodePoints', () => {
    expect(allCodePoints(`abc`)).toEqual([97, 98, 99]);
    expect(allCodePoints([`ab`, `cd`])).toEqual([97, 98, 99, 100]);
  });

  test('isUppercase', () => {
    expect(isUppercase('A')).toBe(true);
    expect(isUppercase('a')).toBe(false);
    expect(isUppercase('Б')).toBe(true);
    expect(isUppercase('б')).toBe(false);
  });

  test('matching tree', () => {
    {
      const matcher = makeMatchingTree([`<`, `>`, `>=`, `==`]);
      expect(matcher.match(`>=<`, 0)).toBe(`>=`);
      expect(matcher.match(`>==`, 0)).toBe(`>=`);
      expect(matcher.match(`>1`, 0)).toBe(`>`);
      expect(matcher.match(`<=1`, 0)).toBe(`<`);
      expect(matcher.match(`=1`, 0)).toBe(undefined);
      expect(matcher.match(`==1`, 0)).toBe(`==`);
    }

    {
      const matcher = makeMatchingTree([`>=`, `==`]);
      expect(matcher.match(`>=<`, 0)).toBe(`>=`);
      expect(matcher.match(`>==`, 0)).toBe(`>=`);
      expect(matcher.match(`>1`, 0)).toBe(undefined);
      expect(matcher.match(`=1`, 0)).toBe(undefined);
      expect(matcher.match(`==1`, 0)).toBe(`==`);
    }

    {
      const matcher = makeMatchingTree([`.`, ``, `-`]);
      expect(matcher.match(``, 0)).toBe(undefined);
      expect(matcher.match(`..`, 0)).toBe(`.`);
    }

    {
      const matcher = makeMatchingTree([`a`]);
      expect(matcher.match(``, 0)).toBe(undefined);
      expect(matcher.match(`..`, 0)).toBe(undefined);
    }
  });
});
