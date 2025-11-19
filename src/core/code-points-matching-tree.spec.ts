import { makeMatchingTree } from './code-points-matching-tree';

describe('makeMatchingTree', () => {
  it('should create a tree and match exact strings', () => {
    const { match } = makeMatchingTree(['hello', 'world']);
    expect(match('hello', 0)).toBe('hello');
    expect(match('world', 0)).toBe('world');
  });

  it('should return undefined for strings that do not match', () => {
    const { match } = makeMatchingTree(['hello', 'world']);
    expect(match('test', 0)).toBeUndefined();
  });

  it('should match prefixes where applicable', () => {
    const { match } = makeMatchingTree(['hello', 'hell', 'he']);
    expect(match('hello', 0)).toBe('hello');
    expect(match('hell', 0)).toBe('hell');
    expect(match('he', 0)).toBe('he');
  });

  it('should match the longest prefix possible', () => {
    const { match } = makeMatchingTree(['hello', 'hell', 'he']);
    expect(match('hello', 0)).toBe('hello');
    expect(match('hellothere', 0)).toBe('hello');
  });

  it('should handle strings with unicode characters', () => {
    const { match } = makeMatchingTree(['héllo', 'wørld']);
    expect(match('héllo', 0)).toBe('héllo');
    expect(match('hél', 0)).toBeUndefined();
    expect(match('wørld', 0)).toBe('wørld');
  });

  it('should handle input at different positions', () => {
    const { match } = makeMatchingTree(['hello', 'world']);
    expect(match('something hello', 10)).toBe('hello');
    expect(match('something world', 10)).toBe('world');
  });

  it('should return undefined for empty input string', () => {
    const { match } = makeMatchingTree(['hello']);
    expect(match('', 0)).toBeUndefined();
  });

  it('should skip empty strings in samples and still function correctly', () => {
    const { match } = makeMatchingTree(['hello', '']);
    expect(match('hello', 0)).toBe('hello');
    expect(match('', 0)).toBeUndefined();
  });
});
