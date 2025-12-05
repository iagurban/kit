import DataLoader from 'dataloader';

import { UniversalSelection } from '../';

/**
 * The "Provider" (Request-Scoped)
 * This is a request-scoped object with its own internal cache.
 * Its job is to provide unique DataLoader instances for each unique selection.
 */
export type SelectionDataLoaderProvider<TKey, TValue> = {
  getLoader: (selection: UniversalSelection, stringifiedKey: string) => DataLoader<TKey, TValue>;
};

export type DataLoaderInstance<TKey, TValue> = DataLoader<TKey, TValue>;

/**
 * The "Selection Cache" Entry
 * This is the object our interceptor will create and cache.
 */
export type CachedSelection = {
  selection: UniversalSelection;
  stringified: string;
};

/**
 * A generic map of type names to their corresponding SelectionDataLoader providers.
 * T will be an interface like { User: User; Post: Post }
 */
type SelectionDataLoaderProviderMap<T> = {
  [K in keyof T]: SelectionDataLoaderProvider<string, T[K]>; // Assumes string IDs
};

/**
 * The main, "Ready to use" Context
 * This is the new base context for our entire application.
 */
export interface GqlSelectionDataLoaderContext<T> {
  /**
   * The top-level map holding all request-scoped providers,
   * keyed by entity name (e.g., "User").
   */
  selectionDataLoaderProviders: SelectionDataLoaderProviderMap<T>;

  /**
   * Internal, request-scoped cache for selections.
   * Key: Full query path (e.g., "q1.author")
   * Value: The pre-calculated selection object and its stringified key.
   */
  __selectionDataLoaderSelectionCache?: {
    [fieldPath: string]: CachedSelection | undefined;
  };
}

// --- Your Application's Specific Context ---
// You only need to define this once and import it everywhere.

/**
 * Your app's specific, strongly-typed GQL context.
 */
// export type AppGqlContext = GqlSelectionDataLoaderContext<{
//   User: User;
//   Post: Post; // Add other models here
// }>;
