import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { isDefined, isROArray, isTruthy } from '../../core/checks';
import { notNull } from '../../utils/flow/flow-utils';

export type GqlASTLoc = { start: number; end: number };
export type GqlASTName = { kind: `Name`; value: string; loc: GqlASTLoc };
export type GqlASTSelectionSet = {
  kind: `SelectionSet`;
  selections: (GqlASTField | GqlASTFragmentSpread)[];
  loc: GqlASTLoc;
};
export type GqlASTField = {
  kind: `Field`;
  alias?: GqlASTName;
  name: GqlASTName;
  arguments: {
    kind: `Argument`;
    name: GqlASTName;
    value: { kind: `Variable`; name: GqlASTName; loc: GqlASTLoc };
    loc: GqlASTLoc;
  }[];
  directives: unknown[];
  selectionSet?: GqlASTSelectionSet;
  loc: GqlASTLoc;
};

export type GqlASTFragmentDefinition = {
  kind: 'FragmentDefinition';
  name: GqlASTName;
  typeCondition: unknown;
  directives: unknown[];
  selectionSet?: GqlASTSelectionSet;
  loc: GqlASTLoc;
};

export type GqlASTFragmentSpread = {
  kind: 'FragmentSpread';
  name: GqlASTName;
};

type RecurSelect = { select: { [key: string]: RecurSelect | boolean } } | boolean;

export const flattenSpreads = (
  fields: readonly (GqlASTField | GqlASTFragmentSpread)[] | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>
): GqlASTField[] =>
  fields
    ? fields.flatMap(field =>
        field.kind === `FragmentSpread`
          ? flattenSpreads(notNull(fragments[field.name.value]).selectionSet?.selections, fragments)
          : [field]
      )
    : [];

export const findGqlNodeByPath = (
  path: readonly string[],
  field: GqlASTField,
  fragments: Record<string, GqlASTFragmentDefinition>
): GqlASTField | null => {
  if (/* DEBUG */ path.length < 1) {
    // path.length > 0 expected
    throw new Error(`Programming Error: path.length < 1 in findByPath`);
  }

  const found = flattenSpreads(field.selectionSet?.selections, fragments).find(f => f.name.value === path[0]);
  return !found ? null : path.length === 1 ? found : findGqlNodeByPath(path.slice(1), found, fragments);
};

const collectRecursiveSelection = (
  fields: readonly (GqlASTField | GqlASTFragmentSpread)[] | undefined,
  path: string,
  skip: Set<string> | undefined,
  check: ((subPath: string, field: GqlASTField) => boolean) | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>
): RecurSelect =>
  fields?.length
    ? {
        select: Object.fromEntries(
          flattenSpreads(fields, fragments)
            .map(f => {
              const subPath = [path, f.name.value].filter(isTruthy).join(`.`);
              return (skip && skip.has(subPath)) || (check && !check(subPath, f))
                ? undefined
                : ([
                    f.name.value,
                    collectRecursiveSelection(f.selectionSet?.selections, subPath, skip, check, fragments),
                  ] as const);
            })
            .filter(isDefined)
        ),
      }
    : true;

type Args = {
  path?: readonly string[];
  skip?: readonly string[];
  check?: (subPath: string, field: GqlASTField) => boolean;
};

export const getPrismaSelectionFromInfo = (
  {
    fieldName,
    fieldNodes: [fieldNode],
    fragments,
  }: { fieldName: string; fieldNodes: GqlASTField[]; fragments: Record<string, GqlASTFragmentDefinition> },
  opts?: readonly string[] | Args | undefined
) => {
  // console.log(`opts`, opts);

  const { path, skip, check } = isROArray(opts) ? { path: opts } : (opts ?? {});

  const skipSet = skip && new Set(skip);

  const root = path?.length ? findGqlNodeByPath(path, fieldNode, fragments) : fieldNode;
  if (!root) {
    throw new Error(`Path "${path?.join(`.`)}" not found in ${fieldName}`);
  }

  const r = collectRecursiveSelection(
    root.selectionSet?.selections,
    path?.join(`.`) || ``,
    skipSet,
    check,
    fragments
  );
  return typeof r === `object` ? r['select'] : undefined;
};

const prismaSelectionFromGqlExecutionCtx = (
  ctx: GqlExecutionContext,
  opts: readonly string[] | Args | undefined
) => {
  return getPrismaSelectionFromInfo(ctx.getInfo(), opts);
};

export const PrismaSelection = createParamDecorator(
  (opts: readonly string[] | Args | undefined, context: ExecutionContext) =>
    prismaSelectionFromGqlExecutionCtx(GqlExecutionContext.create(context), opts)
);
