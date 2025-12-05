import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getNamedType, GraphQLResolveInfo } from 'graphql';

import { isString, notNull } from '../../core';
import { cacheKeyFromGraphqlPath } from '../../graphql';
import { GqlSelectionDataLoaderContext } from './selection-data-loader.types';

/**
 * This decorator injects the correct, selection-specific DataLoader.
 * It *must* be used with @UseInterceptors(SelectionDataLoaderCacheInterceptor).
 */
export const InjectSelectionDataLoader = createParamDecorator(
  (data: void | string, context: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext<Partial<GqlSelectionDataLoaderContext<Record<string, unknown>>>>();
    const info = gqlCtx.getInfo<GraphQLResolveInfo>();

    // Get a unique path key (e.g., "q1.author")
    const fieldKey = cacheKeyFromGraphqlPath(info);

    // Get the cached selection from our internal property
    const cachedSelection = notNull(
      ctx.__selectionDataLoaderSelectionCache?.[fieldKey],
      () =>
        `Selection for ${fieldKey} not found. Did you forget @UseInterceptors(SelectionDataLoaderCacheInterceptor)?`
    );

    // Get the return type name (e.g., "User")
    const typeName = isString(data) ? data : getNamedType(info.returnType).name;

    // Get the correct provider (e.g., ctx.selectionDataLoaderProviders.User)
    const provider = notNull(
      ctx.selectionDataLoaderProviders?.[typeName],
      () =>
        `SelectionDataLoaderProvider for type '${typeName}' not found on context. Did you register it in GraphqlSubgraphModule?`
    );

    // Get the specific loader instance from the provider
    return provider.getLoader(cachedSelection.selection, cachedSelection.stringified);
  }
);
