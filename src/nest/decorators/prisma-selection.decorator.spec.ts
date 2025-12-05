/* eslint-disable @typescript-eslint/no-explicit-any */

import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GqlContextInfo } from '../../graphql';
import {
  getPrismaSelectionFromInfo,
  PrismaSelection,
  prismaSelectionFromGqlExecutionCtx,
} from './prisma-selection.decorator';

// Mock GqlExecutionContext for decorator testing
jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  createParamDecorator: (
    factory: (data: any, context: ExecutionContext) => any
  ): ((...dataOrPipes: any[]) => ParameterDecorator) => {
    const decorator =
      (..._dataOrPipes: any[]): ParameterDecorator =>
      (_target, _key, _index) => {};
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

describe('PrismaSelection Decorator', () => {
  const createMockInfo = (selections: any[] | undefined, fragments: any = {}): GqlContextInfo =>
    ({
      fieldName: 'testField',
      fieldNodes: [
        {
          kind: 'Field',
          name: { kind: 'Name', value: 'testField' },
          selectionSet: selections
            ? {
                kind: 'SelectionSet',
                selections,
              }
            : undefined,
        },
      ],
      fragments,
    }) as any;

  const createMockGqlExecutionContext = (info: GqlContextInfo) =>
    ({
      getInfo: () => info,
      getArgs: () => ({}),
      getContext: () => ({}),
      getRoot: () => ({}),
    }) as GqlExecutionContext;

  it('should be defined', () => {
    expect(PrismaSelection).toBeDefined();
    expect(getPrismaSelectionFromInfo).toBeDefined();
    expect(prismaSelectionFromGqlExecutionCtx).toBeDefined();
  });

  it('should return undefined for a query with no selections', () => {
    const mockInfo = createMockInfo(undefined);
    const result = getPrismaSelectionFromInfo(mockInfo);
    expect(result).toBeUndefined();
  });

  it('should correctly parse a simple, flat selection set', () => {
    const mockInfo = createMockInfo([
      { kind: 'Field', name: { value: 'id' } },
      { kind: 'Field', name: { value: 'name' } },
    ]);

    const result = getPrismaSelectionFromInfo(mockInfo);
    expect(result).toEqual({
      id: true,
      name: true,
    });
  });

  it('should handle nested selections', () => {
    const mockInfo = createMockInfo([
      { kind: 'Field', name: { value: 'id' } },
      {
        kind: 'Field',
        name: { value: 'posts' },
        selectionSet: {
          kind: 'SelectionSet',
          selections: [{ kind: 'Field', name: { value: 'title' } }],
        },
      },
    ]);

    const result = getPrismaSelectionFromInfo(mockInfo);
    expect(result).toEqual({
      id: true,
      posts: {
        select: {
          title: true,
        },
      },
    });
  });

  it('should handle fragments in the selection set', () => {
    const mockInfo = createMockInfo(
      [
        { kind: 'Field', name: { value: 'id' } },
        { kind: 'FragmentSpread', name: { value: 'userFields' } },
      ],
      {
        userFields: {
          kind: 'FragmentDefinition',
          name: { value: 'userFields' },
          typeCondition: { name: { value: 'User' } },
          selectionSet: {
            selections: [{ kind: 'Field', name: { value: 'email' } }],
          },
        },
      }
    );

    const result = getPrismaSelectionFromInfo(mockInfo);
    expect(result).toEqual({
      id: true,
      email: true,
    });
  });

  it('should handle aliases in the selection set', () => {
    const mockInfo = createMockInfo([
      {
        kind: 'Field',
        alias: { kind: 'Name', value: 'userId' },
        name: { kind: 'Name', value: 'id' },
      },
      { kind: 'Field', name: { value: 'name' } },
    ]);

    const result = getPrismaSelectionFromInfo(mockInfo);
    expect(result).toEqual({
      id: true,
      name: true,
    });
  });

  it('should be usable as a decorator', () => {
    const mockInfo = createMockInfo([{ kind: 'Field', name: { value: 'id' } }]);
    const mockGqlCtx = createMockGqlExecutionContext(mockInfo);
    const mockCtx: ExecutionContext = {
      getClass: () => class {} as any,
      getHandler: () => (() => {}) as any,
      getArgs: () => [] as any,
      getArgByIndex: () => undefined as any,
      switchToHttp: () => ({}) as any,
      switchToRpc: () => ({}) as any,
      switchToWs: () => ({}) as any,
      getType: () => 'graphql' as any,
    };

    (GqlExecutionContext.create as jest.Mock).mockReturnValue(mockGqlCtx);

    const factory = (PrismaSelection as any).factory;
    const result = factory({}, mockCtx);

    expect(GqlExecutionContext.create).toHaveBeenCalledWith(mockCtx);
    expect(result).toEqual({ id: true });
  });
});
