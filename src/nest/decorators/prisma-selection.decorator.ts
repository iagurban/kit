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

export const prismaSelectionFromGqlExecutionCtx = (
  ctx: GqlExecutionContext,
  opts: BasicSelectionArgs<Record<never, never>>
) => {
  return getPrismaSelectionFromInfo(ctx.getInfo(), opts);
};

export const PrismaSelection = createParamDecorator(
  (opts: BasicSelectionArgs<Record<never, never>>, context: ExecutionContext) =>
    prismaSelectionFromGqlExecutionCtx(GqlExecutionContext.create(context), opts)
);
