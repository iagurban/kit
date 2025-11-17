import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { isDefined } from '../../core/checks';
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
} from './graphql-traverse';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UniversalSelection extends Record<string, boolean | UniversalSelection> {}

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

export type UniversalSelectionArgs = BasicSelectionArgs<{
  postProcess?: (selection: UniversalSelection) => void;
}>;

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

export const GetUniversalSelection = createParamDecorator(
  (opts: UniversalSelectionArgs, context: ExecutionContext) =>
    getUniversalSelectionFromInfo(GqlExecutionContext.create(context).getInfo(), opts)
);
