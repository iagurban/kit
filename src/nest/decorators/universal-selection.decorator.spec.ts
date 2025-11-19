import { stringifyUniversalSelection } from './universal-selection.decorator';

describe('UniversalSelection', () => {
  test(`stringifyUniversalSelection basic mixed`, () => {
    expect(stringifyUniversalSelection({ id: true, nn: true, author: { id: true, name: true } })).toBe(
      `author{id name}id nn`
    );
  });

  test(`empty selection -> empty string`, () => {
    expect(stringifyUniversalSelection({})).toBe('');
  });

  test(`single leaf`, () => {
    expect(stringifyUniversalSelection({ id: true })).toBe('id');
  });

  test(`only nested object`, () => {
    expect(stringifyUniversalSelection({ author: { name: true } })).toBe('author{name}');
  });

  test(`deep nested with key sorting`, () => {
    expect(stringifyUniversalSelection({ author: { profile: { avatar: true }, id: true } })).toBe(
      'author{id profile{avatar}}'
    );
  });

  test(`no space after closing brace before next token`, () => {
    expect(stringifyUniversalSelection({ author: { id: true }, z: true })).toBe('author{id}z');
  });

  test(`no space between two nested tokens that end with }`, () => {
    expect(stringifyUniversalSelection({ b: { id: true }, a: { id: true } })).toBe('a{id}b{id}');
  });

  test(`unordered input keys are sorted`, () => {
    expect(stringifyUniversalSelection({ z: true, a: true, m: true })).toBe('a m z');
  });

  test(`ignores false values`, () => {
    expect(stringifyUniversalSelection({ id: true, flag: false as unknown as boolean })).toBe('id');
  });

  // Error throwing tests for truthy & unsupported values
  test(`throws on truthy values`, () => {
    expect(() => stringifyUniversalSelection({ x: 1 as unknown as boolean })).toThrow(
      'Unsupported value type: number'
    );

    expect(() => stringifyUniversalSelection({ x: 'yes' as unknown as boolean })).toThrow(
      'Unsupported value type: string'
    );

    expect(() => stringifyUniversalSelection({ x: 1n as unknown as boolean })).toThrow(
      'Unsupported value type: bigint'
    );

    expect(() => stringifyUniversalSelection({ x: Symbol('s') as unknown as boolean })).toThrow(
      'Unsupported value type: symbol'
    );

    expect(() => stringifyUniversalSelection({ x: (() => true) as unknown as boolean })).toThrow(
      'Unsupported value type: function'
    );

    expect(() => stringifyUniversalSelection({ x: [] as unknown as boolean })).toThrow(
      'Unsupported value type: object'
    );

    expect(() => stringifyUniversalSelection({ x: new Date() as unknown as boolean })).toThrow(
      'Unsupported value type: object'
    );

    expect(() => stringifyUniversalSelection({ x: new Map() as unknown as boolean })).toThrow(
      'Unsupported value type: object'
    );

    expect(() => stringifyUniversalSelection({ x: new Set() as unknown as boolean })).toThrow(
      'Unsupported value type: object'
    );

    const obj = Object.create(null);
    (obj as Record<string, boolean>).id = true;
    expect(() => stringifyUniversalSelection({ x: obj as unknown as boolean })).toThrow(
      'Unsupported value type: object'
    );
  });

  test(`ignores falsy unsupported primitives`, () => {
    expect(
      stringifyUniversalSelection({
        id: true,
        zero: 0 as unknown as boolean,
        empty: '' as unknown as boolean,
        nan: NaN as unknown as boolean,
        author: {},
      })
    ).toBe('id');
  });

  test(`throws when unsupported nested inside object`, () => {
    const selection = { a: { b: 1 as unknown as boolean } };
    expect(() => stringifyUniversalSelection(selection)).toThrow('Unsupported value type: number');
  });
});
