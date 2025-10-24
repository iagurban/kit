import {
  ApolloClient,
  ApolloError,
  ApolloQueryResult,
  DocumentNode,
  FetchResult,
  LazyQueryResultTuple,
  MaybeMasked,
  MutationHookOptions,
  MutationOptions,
  MutationTuple,
  OperationVariables,
  QueryHookOptions,
  QueryOptions,
  QueryResult,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import { isTruthy } from '@gurban/kit/core/checks.ts';
import { GraphQLFormattedError } from 'graphql';

const assureNotMaskedPromise = <T,>(o: Promise<FetchResult<MaybeMasked<T>>>) => o as Promise<FetchResult<T>>;
const assureNotMaskedQueryPromise = <T,>(o: Promise<ApolloQueryResult<MaybeMasked<T>>>) =>
  o as Promise<ApolloQueryResult<T>>;

const errorMessage = (name: () => string) => `Async Apollo request failed on operation ${name()}`;

const apolloClientRequest = async <Result,>(
  name: () => string,
  fn: () => Promise<{
    data?: Result | null | undefined;
    errors?: readonly GraphQLFormattedError[] | undefined;
    extensions?: Record<string, unknown> | undefined;
  }>
): Promise<Result> => {
  const { data, errors } = await fn();
  if (!data) {
    throw new ApolloError({ errorMessage: errorMessage(name), graphQLErrors: errors || [] });
  }
  return data;
};

// Берет имя операции из query, описанной через gql``
const getOperationName = (query: DocumentNode) => {
  const ops = query.definitions.filter(d => d.kind === 'OperationDefinition');
  return (
    ops
      .map(op => op && 'name' in op && op.name?.value)
      .filter(isTruthy)
      .map(op => `[${op}]`)
      .join(',') || '#unknown#'
  );
};

// кеширующая функция, второй аргумент передавать не нужно
const nameGetter =
  (query: DocumentNode, o: { name?: string } = {}) =>
  () =>
    o.name || (o.name = getOperationName(query));

const addNameProp = <T,>(name: () => string, o: T): T & { name: string } =>
  Object.defineProperty(o, 'name', {
    get: name,
    enumerable: true,
  }) as T & { name: string };

const addDeniedProps =
  <R,>() =>
  <T,>(o: T, fields: (keyof R & string)[]): T & R => {
    fields.forEach(field => {
      Object.defineProperty(o, field, {
        get() {
          throw new Error(
            `programming error: field ${field} can't be called in runtime, use it for access to type`
          );
        },
        enumerable: false,
      });
    });

    return o as T & R;
  };

const optionsMerger = <A extends Record<string, unknown>, B extends Record<string, unknown>>(
  defaultFetchOptions?: A,
  defaultHookOptions?: B
) => {
  const fullOptions =
    defaultFetchOptions || defaultHookOptions ? { ...defaultFetchOptions, ...defaultHookOptions } : undefined;
  return fullOptions && Object.keys(fullOptions).length > 0
    ? <T extends Record<string, unknown>>(o?: T) => (o ? { ...fullOptions, ...o } : fullOptions)
    : <T extends Record<string, unknown>>(o?: T) => o;
};

type FakeTypeFields<Result, Args> = {
  Result: Result;
  Arguments: Args;
};

export type UseQueryFetchOptions<Result, Args extends OperationVariables> = Omit<
  QueryOptions<Args, Result>,
  'query' | 'variables'
>;
export type UseQueryHookOptions<Result, Args extends OperationVariables> = Omit<
  QueryHookOptions<Result, Args>,
  'query'
>;

type QueryDefinerSignature<Result, Args extends OperationVariables> = (
  options?: UseQueryHookOptions<Result, Args>
) => QueryResult<Result, Args>;

export type TypedUseQuery<Result, Args extends OperationVariables> = QueryDefinerSignature<Result, Args> & {
  query: DocumentNode;
  name: string;

  lazy: (options?: UseQueryHookOptions<Result, Args>) => LazyQueryResultTuple<Result, Args>;
  fetch: (
    client: ApolloClient<unknown>,
    variables: Args,
    options?: UseQueryFetchOptions<Result, Args>
  ) => Promise<ApolloQueryResult<Result>>;
  fetch2: ((
    client: ApolloClient<unknown>,
    variables: Args,
    options?: UseQueryFetchOptions<Result, Args>
  ) => Promise<Result>) & {
    cancellable: (
      client: ApolloClient<unknown>,
      variables: Args,
      options?: UseQueryFetchOptions<Result, Args>
    ) => { promise: Promise<Result>; cancel(): void };
  };
} & FakeTypeFields<Result, Args>;

export const defineQueryHook = <Result, Args extends OperationVariables>(
  query: DocumentNode,
  defaultFetchOptions?: Partial<Omit<QueryOptions<Args, Result>, 'query'>>,
  defaultHookOptions?: Partial<UseQueryHookOptions<Result, Args>>
): TypedUseQuery<Result, Args> => {
  const mergeOptions = optionsMerger(defaultFetchOptions, defaultHookOptions);
  const name = nameGetter(query);

  const withAbort = () => {
    const a = new AbortController();
  };

  const fetch = (
    client: ApolloClient<unknown>,
    variables: Args,
    options?: UseQueryFetchOptions<Result, Args>
  ) => client.query<Result, Args>({ query, variables, ...defaultFetchOptions, ...options });

  const data = Object.assign(
    (options?: UseQueryHookOptions<Result, Args>) => useQuery<Result, Args>(query, mergeOptions(options)),
    {
      query,
      lazy: (options?: UseQueryHookOptions<Result, Args>) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useLazyQuery<Result, Args>(query, mergeOptions(options)),
      fetch: (...args: Parameters<typeof fetch>) => assureNotMaskedQueryPromise(fetch(...args)),
      fetch2: Object.assign(
        (client: ApolloClient<unknown>, variables: Args, options?: UseQueryFetchOptions<Result, Args>) =>
          apolloClientRequest(name, () => assureNotMaskedQueryPromise(fetch(client, variables, options))),
        {
          cancellable: (
            client: ApolloClient<unknown>,
            variables: Args,
            options?: UseQueryFetchOptions<Result, Args>
          ) => {
            const ac = new AbortController();
            return {
              promise: apolloClientRequest(name, () =>
                assureNotMaskedQueryPromise(
                  fetch(client, variables, {
                    ...options,
                    context: { ...options?.context, signal: ac.signal },
                  })
                )
              ),
              cancel() {
                ac.abort();
              },
            };
          },
        }
      ),
    }
  );

  return addNameProp(name, addDeniedProps<FakeTypeFields<Result, Args>>()(data, ['Result', 'Arguments']));
};

type UseMutationFetchOptions<Result, Args> = Omit<MutationOptions<Result, Args>, 'mutation' | 'variables'>;
type UseMutationHookOptions<Result, Args> = Omit<MutationHookOptions<Result, Args>, 'mutation'>;

type MutationDefinerSignature<Result, Args> = (
  options?: MutationHookOptions<Result, Args>
) => MutationTuple<Result, Args>;

type TypedUseMutation<Result, Args> = MutationDefinerSignature<Result, Args> & {
  mutation: DocumentNode;
  name: string;

  execute: (
    client: ApolloClient<unknown>,
    variables: Args,
    options?: UseMutationFetchOptions<Result, Args>
  ) => Promise<Result>;
} & FakeTypeFields<Result, Args>;

export const defineMutationHook = <Result, Args extends OperationVariables>(
  mutation: DocumentNode,
  defaultFetchOptions?: Partial<Omit<MutationOptions<Result, Args>, 'mutation'>>,
  defaultHookOptions?: Partial<UseMutationHookOptions<Result, Args>>
): TypedUseMutation<Result, Args> => {
  const mergeOptions = optionsMerger(defaultFetchOptions, defaultHookOptions);
  const name = nameGetter(mutation);

  const data = Object.assign(
    (options?: UseMutationHookOptions<Result, Args>) =>
      useMutation<Result, Args>(mutation, mergeOptions(options)),
    {
      mutation,
      execute: (
        client: ApolloClient<unknown>,
        variables: Args,
        options?: UseMutationFetchOptions<Result, Args>
      ) =>
        apolloClientRequest(name, () =>
          assureNotMaskedPromise(
            client.mutate<Result, Args>({ mutation, variables, ...defaultFetchOptions, ...options })
          )
        ),
    }
  );

  return addNameProp(name, addDeniedProps<FakeTypeFields<Result, Args>>()(data, ['Result', 'Arguments']));
};
