import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GqlContextInfo } from '../../graphql';
import {
  GetUniversalSelection,
  getUniversalSelectionFromInfo,
  stringifyUniversalSelection,
  UniversalSelection,
  UniversalSelectionArgs,
} from './universal-selection.decorator';

// Mock createParamDecorator to get the factory function
const mockCreateParamDecorator = jest.fn(
  (factory: (data: UniversalSelectionArgs, context: ExecutionContext) => any) =>
    (...dataOrPipes: any[]): ParameterDecorator =>
    (target, key, index) => {}
);

// Mock GqlExecutionContext for decorator testing
jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  createParamDecorator: (
    factory: (data: UniversalSelectionArgs, context: ExecutionContext) => any
  ): ((...dataOrPipes: any[]) => ParameterDecorator) => {
    const decorator =
      (...dataOrPipes: any[]): ParameterDecorator =>
      (target, key, index) => {};
    (decorator as any).factory = factory;
    return decorator as any;
  },
}));

jest.mock('@nestjs/graphql', () => ({
  ...jest.requireActual('@nestjs/graphql'),
  GqlExecutionContext: {
    create: jest.fn(),
  },
}));

describe('UniversalSelection', () => {
  describe('stringifyUniversalSelection', () => {
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

  describe('getUniversalSelectionFromInfo', () => {
    // Helper to create a mock GqlContextInfo object
    const createMockInfo = (selections: any[] | undefined, fragments: any = {}): GqlContextInfo =>
      ({
        fieldName: 'testField',
        fieldNodes: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'testField' },
            selectionSet: selections ? {
              kind: 'SelectionSet',
              selections,
            } : undefined,
          },
        ],
        fragments,
        // other properties are not needed for these tests
      }) as any;

    it('should handle basic nested selections', () => {
      const info = createMockInfo([
        { kind: 'Field', name: { value: 'id' } },
        {
          kind: 'Field',
          name: { value: 'author' },
          selectionSet: {
            kind: 'SelectionSet',
            selections: [{ kind: 'Field', name: { value: 'name' } }],
          },
        },
      ]);

      const selection = getUniversalSelectionFromInfo(info);
      expect(selection).toEqual({
        id: true,
        author: {
          name: true,
        },
      });
    });

    it('should handle named fragments', () => {
      const info = createMockInfo([{ kind: 'FragmentSpread', name: { value: 'authorFields' } }], {
        authorFields: {
          kind: 'FragmentDefinition',
          name: { value: 'authorFields' },
          typeCondition: { name: { value: 'Author' } },
          selectionSet: {
            selections: [
              { kind: 'Field', name: { value: 'id' } },
              { kind: 'Field', name: { value: 'name' } },
            ],
          },
        },
      });

      const selection = getUniversalSelectionFromInfo(info);
      expect(selection).toEqual({
        id: true,
        name: true,
      });
    });

    it('should handle inline fragments', () => {
      const info = createMockInfo([
        { kind: 'Field', name: { value: 'id' } },
        {
          kind: 'InlineFragment',
          selectionSet: {
            selections: [{ kind: 'Field', name: { value: 'bio' } }],
          },
        },
      ]);

      const selection = getUniversalSelectionFromInfo(info);
      expect(selection).toEqual({
        id: true,
        bio: true,
      });
    });

    it('should return an object for a leaf field (empty selection set)', () => {
      const info = createMockInfo([{ kind: 'Field', name: { value: 'id' } }]);
      const selection = getUniversalSelectionFromInfo(info);
      expect(selection).toEqual({ id: true });
    });

    it('should return an empty object for a field with no sub-selection', () => {
      const info = createMockInfo(undefined); // No selectionSet
      const selection = getUniversalSelectionFromInfo(info);
      expect(selection).toEqual({});
    });

    it('should apply postProcess function if provided', () => {
      const info = createMockInfo([{ kind: 'Field', name: { value: 'id' } }]);
      const postProcess = jest.fn((sel: UniversalSelection) => {
        sel.extra = true;
      });

      const selection = getUniversalSelectionFromInfo(info, { postProcess });
      expect(postProcess).toHaveBeenCalledTimes(1);
      expect(selection).toEqual({ id: true, extra: true });
    });

    it('should respect path and root options', () => {
      const info = createMockInfo([
        {
          kind: 'Field',
          name: { value: 'user' },
          selectionSet: {
            selections: [
              { kind: 'Field', name: { value: 'id' } },
              {
                kind: 'Field',
                name: { value: 'profile' },
                selectionSet: {
                  selections: [{ kind: 'Field', name: { value: 'avatar' } }],
                },
              },
            ],
          },
        },
      ]);

      const selection = getUniversalSelectionFromInfo(info, { path: ['user', 'profile'] });
      expect(selection).toEqual({ avatar: true });
    });
  });

  describe('GetUniversalSelection Decorator', () => {
    it('should call getUniversalSelectionFromInfo with the correct info object', () => {
      const mockInfo = {
        fieldName: 'testField',
        fieldNodes: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'testField' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { value: 'id' } }],
            },
          },
        ],
        fragments: {},
      } as any;

      // Create a more complete, type-safe mock
      const mockGqlContext = {
        getInfo: () => mockInfo,
        getArgs: () => ({}),
        getContext: () => ({}),
        getRoot: () => ({}),
      };

      const mockExecutionContext: ExecutionContext = {
        getClass: () => class {} as any,
        getHandler: () => (() => {}) as any,
        getArgs: () => [] as any,
        getArgByIndex: () => undefined as any,
        switchToHttp: () => ({}) as any,
        switchToRpc: () => ({}) as any,
        switchToWs: () => ({}) as any,
        getType: () => 'graphql' as any,
      };

      (GqlExecutionContext.create as jest.Mock).mockReturnValue(mockGqlContext);

      // Access the factory function from the mocked decorator
      const factory = (GetUniversalSelection as any).factory;
      const result = factory({}, mockExecutionContext);

      expect(GqlExecutionContext.create).toHaveBeenCalledWith(mockExecutionContext);
      expect(result).toEqual({ id: true });
    });
  });
});
