import DataLoader from 'dataloader';

import { ExMap } from '../../core';
import { UniversalSelection } from '../';
import { SelectionDataLoaderProvider } from './selection-data-loader.types';

/**
 * Creates a provider for selection-aware DataLoader instances.
 * This allows for efficient, batched, and cached data loading in GraphQL resolvers,
 * where the loaded fields are determined by the GraphQL query selection.
 *
 * The created provider should be used within the `httpContext` of `GraphqlSubgraphModule`.
 * It's designed to work with `createSelectionDataLoaderCacheInterceptor` and the `@InjectSelectionDataLoader` decorator.
 *
 * @param fetch A function that takes a `UniversalSelection` and returns a DataLoader-compatible batch load function.
 *
 * @example
 *
 * // 1. First, create a factory for your data loader provider.
 * // This factory will be injected into your GraphQL module configuration.
 *
 * import { Injectable, Module } from '@nestjs/common';
 * import { Prisma } from '@prisma/client';
 * import { ExMap } from '@grbn/kit';
 * import { notNull } from '@grbn/kit/data';
 * import { universalSelectionToPrisma } from '@grbn/db/prisma';
 * import {
 *   createSelectionDataLoaderProvider,
 *   createSelectionDataLoaderCacheInterceptor,
 *   InjectSelectionDataLoader,
 *   DataLoaderInstance,
 *   GraphqlSubgraphModule,
 * } from '@poslah/util'; // Assuming types and this function are exported
 * import { User } from './user.model';
 * import { UsersService } from './users.service';
 *
 * // @Injectable()
 * // export class UsersService {
 * //   getUsers(args: any, select: Prisma.UserSelect): Promise<User[]> { ... }
 * // }
 *
 * @Injectable()
 * export class UserSelectionDataLoaderProviderFactory {
 *   constructor(private usersService: UsersService) {}
 *
 *   public createProvider() {
 *     // This cache is unique FOR EACH REQUEST
 *     return createSelectionDataLoaderProvider<string, User>(selection => async keys => {
 *       const byId = ExMap.mappedBy(
 *         await this.usersService.getUsers(
 *           { id: { in: [...keys] } },
 *           universalSelectionToPrisma(selection) as Prisma.UserSelect
 *         ),
 *         u => u.id
 *       );
 *       return keys.map(id => notNull(byId.get(id)));
 *     });
 *   }
 * }
 *
 * // 2. Create a module to provide and export the factory.
 *
 * @Module({
 *   providers: [UsersService, UserSelectionDataLoaderProviderFactory],
 *   exports: [UserSelectionDataLoaderProviderFactory],
 * })
 * export class UserSelectionDataLoaderProviderFactoryModule {}
 *
 * // 3. Configure GraphqlSubgraphModule to use the provider factory.
 * // The `httpContext` will create a new set of providers for each request.
 *
 * GraphqlSubgraphModule.forRootAsync(buildInfo.buildTime, {
 *   addImports: [UserSelectionDataLoaderProviderFactoryModule],
 *   addInject: [UserSelectionDataLoaderProviderFactory],
 *   httpContext: (usersLoaderFactory: UserSelectionDataLoaderProviderFactory) => ({
 *     selectionDataLoaderProviders: {
 *       User: usersLoaderFactory.createProvider(), // 'User' is the key for this loader
 *     },
 *   }),
 * });
 *
 * // 4. Create an interceptor to cache the selection set for the data loader.
 *
 * export const UserSelectionDataLoaderCacheInterceptor = createSelectionDataLoaderCacheInterceptor({
 *   check: (path, field) => field.name.value !== `__typename`,
 *   postProcess: selection => {
 *     selection.id = true; // Ensure 'id' is always selected for caching keys
 *   },
 * });
 *
 * // 5. Use the interceptor and inject the data loader in your resolver.
 *
 * import { UseInterceptors } from '@nestjs/common';
 * import { Parent, ResolveReference, Resolver } from '@nestjs/graphql';
 *
 * @Resolver('User')
 * export class UserResolver {
 *   @UseInterceptors(UserSelectionDataLoaderCacheInterceptor)
 *   @ResolveReference()
 *   async resolveReference(
 *     @Parent() reference: { __typename: 'User'; id: string },
 *     @InjectSelectionDataLoader('User') loader: DataLoaderInstance<string, User>
 *   ): Promise<User> {
 *     return loader.load(reference.id);
 *   }
 *
 *   // It can also be used with @ResolveField in a similar way, combined with
 *   // UserSelectionDataLoaderCacheInterceptor and @InjectSelectionDataLoader.
 * }
 */
export const createSelectionDataLoaderProvider = <TKey, TData>(
  fetch: (selection: UniversalSelection) => (keys: readonly TKey[]) => Promise<readonly TData[]>
): SelectionDataLoaderProvider<TKey, TData> => {
  const loaderCache = new ExMap<string, DataLoader<TKey, TData>>();

  return {
    getLoader: (selection: UniversalSelection, stringifiedKey: string) =>
      loaderCache.getOrCreate(stringifiedKey, () => new DataLoader(fetch(selection))),
  };
};
