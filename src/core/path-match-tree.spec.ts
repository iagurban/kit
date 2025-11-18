import { pathMatchTree } from './path-match-tree';

describe('pathMatchTree', () => {
  describe('Basic Matching', () => {
    const tree = pathMatchTree([['a/b', 1]]);

    it('should match a full path', () => {
      const result = tree.matchStart('a/b');
      expect(result?.leaf.payload).toBe(1);
      expect(result?.rest).toBe(undefined);
      expect(result?.matched).toEqual(['a', 'b']);
    });

    it('should return rest for a partial match', () => {
      const result = tree.matchStart('a/b/c');
      expect(result?.leaf.payload).toBe(1);
      expect(result?.rest).toBe('c');
      expect(result?.matched).toEqual(['a', 'b']);
    });

    it('should return null for no match', () => {
      expect(tree.matchStart('x/y')).toBeNull();
    });
  });

  describe('Trailing Separator', () => {
    const tree = pathMatchTree([
      ['a/b/', 1],
      ['a/*/c/', 2],
    ]);

    it('should match a path with a trailing separator', () => {
      const result = tree.matchStart('a/b/');
      expect(result?.leaf.payload).toBe(1);
      expect(result?.rest).toBe(undefined);
      expect(result?.matched).toEqual(['a', 'b']);
    });

    it('should handle trailing separator with rest', () => {
      const result = tree.matchStart('a/b/c');
      expect(result?.leaf.payload).toBe(2);
      expect(result?.rest).toBe(undefined);
      expect(result?.matched).toEqual(['a', 'b', 'c']);
    });

    it('should match a wildcard path with a trailing separator', () => {
      const result = tree.matchStart('a/z/c/');
      expect(result?.leaf.payload).toBe(2);
      expect(result?.rest).toBe(undefined);
      expect(result?.matched).toEqual(['a', 'z', 'c']);
    });
  });

  describe('Wildcard Matching', () => {
    const tree = pathMatchTree([
      ['a/*/c', 1],
      ['a/b/*', 2],
      ['*/x/y', 3],
    ]);

    it('should match with a wildcard in the middle', () => {
      const result = tree.matchStart('a/anything/c/d');
      expect(result?.leaf.payload).toBe(1);
      expect(result?.rest).toBe('d');
      expect(result?.matched).toEqual(['a', 'anything', 'c']);
    });

    it('should match with a wildcard at the end', () => {
      const result = tree.matchStart('a/b/anything');
      expect(result?.leaf.payload).toBe(2);
      expect(result?.rest).toBe(undefined);
      expect(result?.matched).toEqual(['a', 'b', 'anything']);
    });

    it('should match with a wildcard at the start', () => {
      const result = tree.matchStart('anything/x/y');
      expect(result?.leaf.payload).toBe(3);
      expect(result?.rest).toBe(undefined);
      expect(result?.matched).toEqual(['anything', 'x', 'y']);
    });
  });

  describe('Priority and Longest Match', () => {
    const tree = pathMatchTree([
      ['a/b', 1],
      ['a/b/c', 2],
      ['a/*/c', 3],
      ['x/*/z', 4],
      ['x/y/*', 5],
    ]);

    it('should prefer the longest match', () => {
      const result = tree.matchStart('a/b/c/d');
      expect(result?.leaf.payload).toBe(2);
      expect(result?.rest).toBe('d');
      expect(result?.matched).toEqual(['a', 'b', 'c']);
    });

    it('should prefer a specific match over a wildcard (tie-breaker)', () => {
      const result = tree.matchStart('x/y/z');
      expect(result?.leaf.payload).toBe(4);
      expect(result?.matched).toEqual(['x', 'y', 'z']);
    });

    it('should prefer a specific match over a wildcard', () => {
      const result = tree.matchStart('a/b/c');
      expect(result?.leaf.payload).toBe(2);
      expect(result?.matched).toEqual(['a', 'b', 'c']);
    });

    it('should use wildcard as a fallback', () => {
      const result = tree.matchStart('a/z/c');
      expect(result?.leaf.payload).toBe(3);
      expect(result?.matched).toEqual(['a', 'z', 'c']);
    });
  });

  describe('Terminated Paths', () => {
    const tree = pathMatchTree([
      ['a/b$', 1], // Terminated
      ['a/b', 2], // Prefix
      ['a/c/*$', 3], // Terminated wildcard
      ['a/c/*', 4], // Open wildcard
    ]);

    it('should prioritize exactLeaf for a fully consumed path', () => {
      const result = tree.matchStart('a/b');
      expect(result?.leaf.payload).toBe(1);
      expect(result?.rest).toBeUndefined();
    });

    it('should use normal leaf for a partial match', () => {
      const result = tree.matchStart('a/b/c');
      expect(result?.leaf.payload).toBe(2);
      expect(result?.rest).toBe('c');
    });

    it('should match a terminated wildcard path exactly', () => {
      const result = tree.matchStart('a/c/anything');
      expect(result?.leaf.payload).toBe(3);
      expect(result?.rest).toBeUndefined();
    });

    it('should match an open wildcard path with rest', () => {
      const result = tree.matchStart('a/c/anything/else');
      expect(result?.leaf.payload).toBe(4);
      expect(result?.rest).toBe('else');
    });

    it('matchStrict should respect terminated paths', () => {
      expect(tree.matchStrict('a/b')?.leaf.payload).toBe(1);
      expect(tree.matchStrict('a/b/c')).toBeNull();
    });

    it('matchStrict should respect terminated wildcards', () => {
      expect(tree.matchStrict('a/c/anything')?.leaf.payload).toBe(3);
      expect(tree.matchStrict('a/c/anything/else')).toBeNull();
    });
  });

  describe('Options', () => {
    it('should work with a custom separator', () => {
      const tree = pathMatchTree([['a.b.c', 1]], { separator: '.' });
      const result = tree.matchStart('a.b.c.d');
      expect(result?.leaf.payload).toBe(1);
      expect(result?.rest).toBe('d');
    });

    it('should work with a custom wildcard', () => {
      const tree = pathMatchTree([['a/{}/c', 1]], { wildcard: '{}' });
      const result = tree.matchStart('a/b/c');
      expect(result?.leaf.payload).toBe(1);
    });

    it('should use a custom validate function', () => {
      const validate = (part: string) => part === 'valid';
      expect(() => pathMatchTree([['invalid', 1]], { validate })).toThrow();
      expect(() => pathMatchTree([['valid', 1]], { validate })).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should throw on consecutive separators during creation', () => {
      expect(() => pathMatchTree([['a//b', 1]])).toThrow('Two consecutive separators in path');
    });

    it('should throw on consecutive separators during matching', () => {
      const tree = pathMatchTree([['a/b', 1]]);
      expect(() => tree.matchStart('a//b')).toThrow('Two consecutive separators in path');
    });
  });

  describe('matchStrict', () => {
    const tree = pathMatchTree([['a/b', 1]]);

    it('should return a match for an exact path', () => {
      const result = tree.matchStrict('a/b');
      expect(result).not.toBeNull();
      expect(result?.leaf.payload).toBe(1);
    });

    it('should return null if there is a rest', () => {
      expect(tree.matchStrict('a/b/c')).toBeNull();
    });
  });
});
