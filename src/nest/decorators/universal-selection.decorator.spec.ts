/* eslint-disable @typescript-eslint/no-explicit-any */
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
  test(`throws on truthy number`, () => {
    expect(() => stringifyUniversalSelection({ x: 1 as unknown as any } as any)).toThrow(
      'Unsupported value type: number'
    );
  });

  test(`throws on truthy string`, () => {
    expect(() => stringifyUniversalSelection({ x: 'yes' as unknown as any } as any)).toThrow(
      'Unsupported value type: string'
    );
  });

  test(`throws on truthy bigint`, () => {
    expect(() => stringifyUniversalSelection({ x: 1n as unknown as any } as any)).toThrow(
      'Unsupported value type: bigint'
    );
  });

  test(`throws on symbol`, () => {
    expect(() => stringifyUniversalSelection({ x: Symbol('s') as unknown as any } as any)).toThrow(
      'Unsupported value type: symbol'
    );
  });

  test(`throws on function value`, () => {
    expect(() => stringifyUniversalSelection({ x: (() => true) as unknown as any } as any)).toThrow(
      'Unsupported value type: function'
    );
  });

  test(`throws on Array value`, () => {
    expect(() => stringifyUniversalSelection({ x: [] as unknown as any } as any)).toThrow(
      'Unsupported value type: object'
    );
  });

  test(`throws on Date value`, () => {
    expect(() => stringifyUniversalSelection({ x: new Date() as unknown as any } as any)).toThrow(
      'Unsupported value type: object'
    );
  });

  test(`throws on Map value`, () => {
    expect(() => stringifyUniversalSelection({ x: new Map() as unknown as any } as any)).toThrow(
      'Unsupported value type: object'
    );
  });

  test(`throws on Set value`, () => {
    expect(() => stringifyUniversalSelection({ x: new Set() as unknown as any } as any)).toThrow(
      'Unsupported value type: object'
    );
  });

  test(`throws on null-prototype object`, () => {
    const obj = Object.create(null);
    (obj as any).id = true;
    expect(() => stringifyUniversalSelection({ x: obj as unknown as any } as any)).toThrow(
      'Unsupported value type: object'
    );
  });

  test(`ignores falsy unsupported primitives`, () => {
    expect(
      stringifyUniversalSelection({
        id: true,
        zero: 0 as unknown as any,
        empty: '' as unknown as any,
        nan: NaN as unknown as any,
        author: {},
      } as any)
    ).toBe('id');
  });

  test(`throws when unsupported nested inside object`, () => {
    const selection = { a: { b: 1 as unknown as any } } as any;
    expect(() => stringifyUniversalSelection(selection)).toThrow('Unsupported value type: number');
  });
});
