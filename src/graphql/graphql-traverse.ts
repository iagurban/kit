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

/**
 * Recursively processes an array of GraphQL AST fields, fragment spreads, and inline fragment spreads,
 * and returns a flattened array of `GqlASTField` objects.
 *
 * @param {readonly (GqlASTField | GqlASTFragmentSpread | GqlASTInlineFragmentSpread)[] | undefined} fields - The array of fields, fragment spreads, and inline fragment spreads to be processed.
 *     It may be `undefined`.
 * @param {Record<string, GqlASTFragmentDefinition>} fragments - A map of fragment definitions, keyed by the fragment name.
 * @returns {GqlASTField[]} A flattened array containing only `GqlASTField` objects from the input fields,
 *     including those contained within fragment spreads or inline fragments.
 */
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

/**
 * Recursively finds a GraphQL node by traversing a path through a GraphQL Abstract Syntax Tree (AST).
 *
 * @param {readonly string[]} path - An array of strings representing the path to the node in the GraphQL AST.
 *                                   Each string corresponds to a field name to traverse.
 * @param {GqlASTField} field - The starting field node in the GraphQL AST to begin the traversal.
 * @param {Record<string, GqlASTFragmentDefinition>} fragments - A mapping of fragment names to their
 *                                                               corresponding definitions in the GraphQL AST.
 * @returns {GqlASTField | null} - The GraphQL AST node found at the specified path, or null if the path
 *                                 does not exist in the AST.
 * @throws {Error} - Throws an error if the provided path array is empty, as it expects a non-empty path to traverse.
 */
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

/**
 * Processes and unpacks selection arguments for a GraphQL field node, combining
 * user-provided options with information from the GraphQL query AST.
 *
 * @template Add - An additional set of properties that can be extended in the returned object.
 * @param {BasicSelectionArgs<Add> | undefined} opts - Selection options, which may include a path, skip list, check function, or additional properties.
 * @param {GqlASTField} fieldNode - The GraphQL AST field node that serves as the starting point for selection.
 * @param {Record<string, GqlASTFragmentDefinition>} fragments - A mapping of fragment names to their respective GraphQL AST definitions.
 * @param {string} fieldName - The name of the GraphQL field being processed.
 * @returns {UnpackedBasicSelectionOptions & Add} Processed selection data, including the root node, path, skip set, and additional methods for subpath checks and extensions.
 * @throws {Error} If the provided path does not exist within the specified field node or fragments.
 */
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

/**
 * Collects recursive selection pairs based on a GraphQL field and its subpath.
 *
 * This function is utilized for traversing and processing a GraphQL Abstract Syntax Tree (AST),
 * extracting a defined recursive selection pair from the provided field and its substructure.
 * It invokes a recursive gating function to process nested selections when a valid subpath is available.
 *
 * @template T The type parameter associated with the recursive gating function.
 * @param {string} path The current path in the GraphQL query structure.
 * @param {GqlASTField} f The current field in the GraphQL AST being processed.
 * @param {(path: string, f: GqlASTField) => (string | undefined)} getCheckedSubpath
 * A function that determines the subpath for the current field, returning `undefined` if invalid.
 * @param {Record<string, GqlASTFragmentDefinition>} fragments
 * A record of GraphQL fragment definitions used for resolving fragment spreads.
 * @param {RecursiveSelectionGaterFunction<T>} recur
 * A recursive function that processes the selection set and returns gated selections.
 * @returns {readonly [string, T] | undefined}
 * A tuple containing the field's name and the result of the recursive processing for its selection set,
 * or `undefined` if no valid subpath is found.
 */
export const collectRecursiveSelectionPair = <T>(
  path: string,
  f: GqlASTField,
  getCheckedSubpath: (path: string, f: GqlASTField) => string | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>,
  recur: RecursiveSelectionGaterFunction<T>
): readonly [string, T] | undefined => {
  const subPath = getCheckedSubpath(path, f);
  return subPath
    ? ([f.name.value, recur(f.selectionSet?.selections, subPath, getCheckedSubpath, fragments)] as const)
    : undefined;
};
