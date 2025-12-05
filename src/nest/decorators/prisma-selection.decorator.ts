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

type RecurSelect = { select: { [key: string]: RecurSelect | boolean } } | boolean;

const collectRecursivePrismaSelection = (
  fields: readonly (GqlASTField | GqlASTFragmentSpread | GqlASTInlineFragmentSpread)[] | undefined,
  path: string,
  getCheckedSubpath: (path: string, f: GqlASTField) => string | undefined,
  fragments: Record<string, GqlASTFragmentDefinition>
): RecurSelect =>
  fields?.length
    ? {
        select: Object.fromEntries(
          flattenSpreads(fields, fragments)
            .map(f =>
              collectRecursiveSelectionPair(
                path,
                f,
                getCheckedSubpath,
                fragments,
                collectRecursivePrismaSelection
              )
            )
            .filter(isDefined)
        ),
      }
    : true;

/**
 * Extracts the Prisma selection object from a GraphQL info object.
 * @param info The GraphQL info object.
 * @param opts Options for the selection.
 * @returns The Prisma selection object.
 */
export const getPrismaSelectionFromInfo = (
  { fieldName, fieldNodes: [fieldNode], fragments }: GqlContextInfo,
  opts?: BasicSelectionArgs<Record<never, never>>
) => {
  const { root, path, getCheckedSubpath } = unpackSelectArgs(opts, fieldNode, fragments, fieldName);

  const r = collectRecursivePrismaSelection(
    root.selectionSet?.selections,
    path?.join(`.`) || ``,
    getCheckedSubpath,
    fragments
  );
  return typeof r === `object` ? r['select'] : undefined;
};

/**
 * Extracts the Prisma selection object from a GraphQL execution context.
 * @param ctx The GraphQL execution context.
 * @param opts Options for the selection.
 * @returns The Prisma selection object.
 */
export const prismaSelectionFromGqlExecutionCtx = (
  ctx: GqlExecutionContext,
  opts: BasicSelectionArgs<Record<never, never>>
) => {
  return getPrismaSelectionFromInfo(ctx.getInfo(), opts);
};

/**
 * A decorator that extracts the Prisma selection object from a GraphQL execution context.
 */
export const PrismaSelection = createParamDecorator(
  (opts: BasicSelectionArgs<Record<never, never>>, context: ExecutionContext) =>
    prismaSelectionFromGqlExecutionCtx(GqlExecutionContext.create(context), opts)
);
