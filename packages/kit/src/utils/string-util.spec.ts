import 'ts-jest';

import { makeMatchingTree } from './string-util';

describe('string utils', () => {
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
  });
});
