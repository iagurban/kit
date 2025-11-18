import { isROArray, isTruthy, notNull } from '../core';

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

export type GqlASTInlineFragmentSpread = {
  kind: 'InlineFragment';
  typeCondition: unknown;
  directives: unknown[];
  selectionSet?: GqlASTSelectionSet;
  loc: GqlASTLoc;
};

export const flattenSpreads = (
  fields: readonly (GqlASTField | GqlASTFragmentSpread | GqlASTInlineFragmentSpread)[] | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>
): GqlASTField[] => {
  // console.log(`fields`, fields);
  return fields
    ? fields.flatMap(field =>
        field.kind === `FragmentSpread`
          ? flattenSpreads(notNull(fragments[field.name.value]).selectionSet?.selections, fragments)
          : field.kind === `InlineFragment`
            ? flattenSpreads(notNull(field.selectionSet?.selections), fragments)
            : [field]
      )
    : [];
};

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

type BasicSelectionArgsObject = {
  path?: readonly string[];
  skip?: readonly string[];
  check?: (subPath: string, field: GqlASTField) => boolean;
};

export type BasicSelectionArgs<Add extends Record<string, unknown>> =
  | readonly string[]
  | (BasicSelectionArgsObject & Add)
  | undefined;

type UnpackedBasicSelectionOptions = {
  root: GqlASTField;
  path: BasicSelectionArgsObject[`path`];
  getCheckedSubpath: (path: string, f: GqlASTField) => string | undefined;
};

export const unpackSelectArgs = <Add extends Record<string, unknown>>(
  opts: BasicSelectionArgs<Add> | undefined,
  fieldNode: GqlASTField,
  fragments: Record<string, GqlASTFragmentDefinition>,
  fieldName: string
): UnpackedBasicSelectionOptions & Add => {
  const { path, skip, check, ...rest } = isROArray(opts) ? { path: opts } : (opts ?? {});

  const skipSet = skip && new Set(skip);

  const root = path?.length ? findGqlNodeByPath(path, fieldNode, fragments) : fieldNode;
  if (!root) {
    throw new Error(`Path "${path?.join(`.`)}" not found in ${fieldName}`);
  }

  return {
    root,
    path,
    skipSet,
    getCheckedSubpath: (path, f) => {
      const subPath = [path, f.name.value].filter(isTruthy).join(`.`);
      return (skipSet && skipSet.has(subPath)) || (check && !check(subPath, f)) ? undefined : subPath;
    },

    ...(rest as Add),
  };
};

export type GqlContextInfo = {
  fieldName: string;
  fieldNodes: GqlASTField[];
  fragments: Record<string, GqlASTFragmentDefinition>;
};
type RecursiveSelectionGaterFunction<R> = (
  fields: readonly (GqlASTField | GqlASTFragmentSpread | GqlASTInlineFragmentSpread)[] | undefined,
  path: string,
  getCheckedSubpath: (path: string, f: GqlASTField) => string | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>
) => R;

export const collectRecursiveSelectionPair = <T>(
  path: string,
  f: GqlASTField,
  getCheckedSubpath: (path: string, f: GqlASTField) => string | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>,
  recur: RecursiveSelectionGaterFunction<T>
) => {
  const subPath = getCheckedSubpath(path, f);
  return subPath
    ? ([f.name.value, recur(f.selectionSet?.selections, subPath, getCheckedSubpath, fragments)] as const)
    : undefined;
};
