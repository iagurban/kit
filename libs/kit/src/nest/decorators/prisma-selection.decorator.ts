import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { isDefined, isROArray, isTruthy } from '../../core/checks';
import { notNull } from '../../utils/flow-utils';

type Loc = { start: number; end: number };
type Name = { kind: `Name`; value: string; loc: Loc };
type SelectionSet = { kind: `SelectionSet`; selections: (Field | FragmentSpread)[]; loc: Loc };
type Field = {
  kind: `Field`;
  alias?: Name;
  name: Name;
  arguments: { kind: `Argument`; name: Name; value: { kind: `Variable`; name: Name; loc: Loc }; loc: Loc }[];
  directives: unknown[];
  selectionSet?: SelectionSet;
  loc: Loc;
};

type FragmentDefinition = {
  kind: 'FragmentDefinition';
  name: Name;
  typeCondition: unknown;
  directives: unknown[];
  selectionSet?: SelectionSet;
  loc: Loc;
};

type FragmentSpread = {
  kind: 'FragmentSpread';
  name: Name;
};

type RecurSelect = { select: { [key: string]: RecurSelect | boolean } } | boolean;

const gqlSelectionTraverser = (
  fragments: Record<string, FragmentDefinition>,
  skip?: Set<string>,
  check?: (subPath: string, field: Field) => boolean
) => {
  const flattenSpreads = (fields?: readonly (Field | FragmentSpread)[]): Field[] =>
    fields
      ? fields.flatMap(field =>
          field.kind === `FragmentSpread`
            ? flattenSpreads(notNull(fragments[field.name.value]).selectionSet?.selections)
            : [field]
        )
      : [];

  const collectSelection = (
    fields: readonly (Field | FragmentSpread)[] | undefined,
    path: string
  ): RecurSelect =>
    fields?.length
      ? {
          select: Object.fromEntries(
            flattenSpreads(fields)
              .map(f => {
                const subPath = [path, f.name.value].filter(isTruthy).join(`.`);
                return (skip && skip.has(subPath)) || (check && !check(subPath, f))
                  ? undefined
                  : ([f.name.value, collectSelection(f.selectionSet?.selections, subPath)] as const);
              })
              .filter(isDefined)
          ),
        }
      : true;

  const findByPath = (path: readonly string[], field: Field): Field | null => {
    if (/* DEBUG */ path.length < 1) {
      // path.length > 0 expected
      throw new Error(`Programming Error: path.length < 1 in findByPath`);
    }

    const found = flattenSpreads(field.selectionSet?.selections).find(f => f.name.value === path[0]);
    return !found ? null : path.length === 1 ? found : findByPath(path.slice(1), found);
  };

  return { collectSelection, findByPath };
};

type Args = {
  path?: readonly string[];
  skip?: readonly string[];
  check?: (subPath: string, field: Field) => boolean;
};

export const getPrismaSelectionFromInfo = (
  {
    fieldName,
    fieldNodes: [fieldNode],
    fragments,
  }: { fieldName: string; fieldNodes: Field[]; fragments: Record<string, FragmentDefinition> },
  opts?: readonly string[] | Args | undefined
) => {
  // console.log(`opts`, opts);

  const { path, skip, check } = isROArray(opts) ? { path: opts } : (opts ?? {});

  const skipSet = skip && new Set(skip);

  const s = gqlSelectionTraverser(fragments, skipSet, check);
  const root = path?.length ? s.findByPath(path, fieldNode) : fieldNode;
  if (!root) {
    throw new Error(`Path "${path?.join(`.`)}" not found in ${fieldName}`);
  }

  const r = s.collectSelection(root.selectionSet?.selections, path?.join(`.`) || ``);
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
