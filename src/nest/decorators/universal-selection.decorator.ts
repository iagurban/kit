import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { isDefined } from '../../core';
import {
  BasicSelectionArgs,
  collectRecursiveSelectionPair,
  flattenSpreads,
  GqlASTField,
  GqlASTFragmentDefinition,
  GqlASTFragmentSpread,
  GqlASTInlineFragmentSpread,
  GqlContextInfo,
  unpackSelectArgs,
} from '../../graphql';

/**
 * A recursive type for representing a universal selection.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UniversalSelection extends Record<string, boolean | UniversalSelection> {}

/**
 * Stringifies a universal selection object.
 * @param selection The universal selection object.
 * @returns The stringified universal selection.
 */
export const stringifyUniversalSelection = (selection: UniversalSelection): string => {
  // { id: true, nn: true, author: { id: true, name: true } }
  // must be converted to
  // "author{id name}id nn"
  // (keys must be sorted, spaces added only if previous was not ended with "}")

  const keys = Object.keys(selection).sort();

  // indicates that before was a brace, and we do not need to insert space
  // "true" initially to not insert space before the first key
  let wasBraces = true;

  let result = '';
  for (const key of keys) {
    const value = selection[key];
    if (value) {
      switch (typeof value) {
        case 'object': {
          if (Object.getPrototypeOf(value) !== Object.prototype) {
            throw new Error(`Unsupported value type: ${typeof value}`);
          }

          // sub-selection
          const inner = stringifyUniversalSelection(value);
          if (inner) {
            if (!wasBraces) {
              result += ' ';
            }
            result += `${key}{${inner}}`;
            wasBraces = true;
          }
          break;
        }
        case `boolean`: {
          // true
          if (!wasBraces) {
            result += ' ';
          }
          result += key;
          wasBraces = false;

          break;
        }

        default: {
          throw new Error(`Unsupported value type: ${typeof value}`);
        }
      }
    }
    // ignore false/null/undefined
  }

  return result;
};

const collectRecursiveUniversalSelection = (
  fields: readonly (GqlASTField | GqlASTFragmentSpread | GqlASTInlineFragmentSpread)[] | undefined,
  path: string,
  getCheckedSubpath: (path: string, f: GqlASTField) => string | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>
): UniversalSelection | boolean =>
  fields?.length
    ? Object.fromEntries(
        flattenSpreads(fields, fragments)
          .map(f => {
            return collectRecursiveSelectionPair(
              path,
              f,
              getCheckedSubpath,
              fragments,
              collectRecursiveUniversalSelection
            );
          })
          .filter(isDefined)
      )
    : true;

/**
 * Arguments for the universal selection decorator.
 */
export type UniversalSelectionArgs = BasicSelectionArgs<{
  /**
   * A function to post-process the selection.
   */
  postProcess?: (selection: UniversalSelection) => void;
}>;

/**
 * Extracts the universal selection object from a GraphQL info object.
 * @param info The GraphQL info object.
 * @param opts Options for the selection.
 * @returns The universal selection object.
 */
export const getUniversalSelectionFromInfo = (
  { fieldName, fieldNodes: [fieldNode], fragments }: GqlContextInfo,
  opts?: UniversalSelectionArgs
) => {
  const { root, path, getCheckedSubpath, postProcess } = unpackSelectArgs(
    opts,
    fieldNode,
    fragments,
    fieldName
  );

  const r = collectRecursiveUniversalSelection(
    root.selectionSet?.selections,
    path?.join(`.`) || ``,
    getCheckedSubpath,
    fragments
  );
  const result = typeof r === `object` ? r : {};
  postProcess?.(result);
  return result;
};

/**
 * A decorator that extracts the universal selection object from a GraphQL execution context.
 */
export const GetUniversalSelection = createParamDecorator(
  (opts: UniversalSelectionArgs, context: ExecutionContext) =>
    getUniversalSelectionFromInfo(GqlExecutionContext.create(context).getInfo(), opts)
);
