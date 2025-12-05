import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { cacheKeyFromGraphqlPath } from '../../graphql';
import { getUniversalSelectionFromInfo, stringifyUniversalSelection, UniversalSelectionArgs } from '../';
import { GqlSelectionDataLoaderContext } from './selection-data-loader.types';

export const createSelectionDataLoaderCacheInterceptor = (opts: UniversalSelectionArgs) => {
  /**
   * This interceptor populates the internal selection cache.
   * It must run before the @InjectSelectionDataLoader decorator.
   */
  @Injectable()
  class SelectionDataLoaderCacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext<GqlSelectionDataLoaderContext<Record<string, unknown>>>();
      const info = gqlCtx.getInfo();

      const fieldKey = cacheKeyFromGraphqlPath(info); // e.g., "q1.author"

      // Use our specifically named cache property
      if (!ctx.__selectionDataLoaderSelectionCache?.[fieldKey]) {
        const selection = getUniversalSelectionFromInfo(info, opts);

        (ctx.__selectionDataLoaderSelectionCache ??= {})[fieldKey] = {
          selection,
          stringified: stringifyUniversalSelection(selection),
        };
      }

      return next.handle();
    }
  }

  return SelectionDataLoaderCacheInterceptor;
};
