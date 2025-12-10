/* istanbul ignore file */

export { AuthControllerBase } from './auth-controller-base';
export { AuthServiceBase } from './auth-service-base';
export { InjectSelectionDataLoader } from './data-loaders-fabric/inject-selection-data-loader.decorator';
export type {
  CachedSelection,
  DataLoaderInstance,
  GqlSelectionDataLoaderContext,
  SelectionDataLoaderProvider,
} from './data-loaders-fabric/selection-data-loader.types';
export { createSelectionDataLoaderCacheInterceptor } from './data-loaders-fabric/selection-data-loader-cache.interceptor';
export { createSelectionDataLoaderProvider } from './data-loaders-fabric/selection-data-loader-provider';
export {
  CurrentUserBase,
  getCurrentUserFromExeContext,
  TryCurrentUserBase,
} from './decorators/current-user.decorator-base';
export {
  getPrismaSelectionFromInfo,
  PrismaSelection,
  prismaSelectionFromGqlExecutionCtx,
} from './decorators/prisma-selection.decorator';
export type { UniversalSelection, UniversalSelectionArgs } from './decorators/universal-selection.decorator';
export {
  GetUniversalSelection,
  getUniversalSelectionFromInfo,
  stringifyUniversalSelection,
} from './decorators/universal-selection.decorator';
export type { DynamicModuleFabric } from './dynamic-module-fabric';
export { GqlJwtAuthGuardBase } from './guards/gql-jwt-auth-guard-base';
export { ContextualCurrentUserInterceptorBase } from './interceptors/contextual-current-user.interceptor-base';
export { ServerTimestampInterceptorBase } from './interceptors/server-timestamp/server-timestamp-interceptor-base';
export { ServerTimestampMetaInterceptor } from './interceptors/server-timestamp/server-timestamp-meta.interceptor';
export { ServerTimestampPreciseInterceptor } from './interceptors/server-timestamp/server-timestamp-precise.interceptor';
export { OidcAuthControllerBase, OidcTokens } from './oidc-auth-controller.base';
export type { KeycloakJwtConfig } from './oidc-jwt-strategy.base';
export { keycloakJwtConfigToken, OidcJwtStrategyBase } from './oidc-jwt-strategy.base';
export { JwtStrategyBase } from './passport-strategies/jwt-strategy-base';
export { LocalStrategyBase } from './passport-strategies/local-strategy-base';
export { ServiceInfo, ServiceInfoModule } from './service-info';
export { universalSelectionToPrisma } from './universal-selection-to-prisma';
