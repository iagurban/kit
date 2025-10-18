import {
  ApolloClient,
  ApolloLink,
  CombinedGraphQLErrors,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { sleep } from '@gurban/kit/utils/async-utils';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { createClient } from 'graphql-ws';

const host = notNull(import.meta.env.VITE_GATE_SERVICE_HOST);
const port = notNull(import.meta.env.VITE_GATE_SERVICE_PORT);

const PREFETCHED_ACCESS_TOKEN_WINDOW_KEY = `PREFETCHED_ACCESS_TOKEN_WINDOW_KEY`;

const accessTokenStore = (() => {
  let fetching = false;
  const prefetched = (window as { [PREFETCHED_ACCESS_TOKEN_WINDOW_KEY]?: string })[
    PREFETCHED_ACCESS_TOKEN_WINDOW_KEY
  ];
  let promise: Promise<string> | null = prefetched ? Promise.resolve(prefetched) : null;

  // refreshToken must be called only if fetching = false
  const refreshToken = async () => {
    fetching = true;

    try {
      for (let attempt = 0; ; ++attempt) {
        try {
          const response = await fetch(`https://${host}:${port}/auth/refresh`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });

          if (!response.ok) {
            window.location.replace(`https://${host}:${port}/auth/login`);
            await sleep(99999999);
            throw new Error('Session expired. Please log in again.');
          }

          const data = await response.json();
          return data.accessToken;
        } catch (error) {
          console.error('Failed to refresh token:', error);

          await sleep(Math.min(attempt, 3) * 1000);
        }
      }
    } finally {
      fetching = false;
    }
  };

  // if somebody is already fetching, join to wait it
  const invalidate = () => (fetching ? promise : (promise = refreshToken()));

  if (!promise) {
    invalidate();
  }

  return {
    invalidate,
    get: () => notNull(promise),
  };
})();

const httpLink = new HttpLink({
  uri: `https://${host}:${port}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `wss://${host}:${port}/graphql`,
  })
);

// The Error Link: This is the trigger for your refresh logic.
const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const e of error.errors) {
      if (e.extensions?.code === 'UNAUTHENTICATED') {
        console.log('Caught UNAUTHENTICATED error.');
        accessTokenStore.invalidate();
        return forward(operation);
      }
    }
  }
  return undefined;
});

const authLink = new SetContextLink(async ({ headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${await accessTokenStore.get()}`,
    },
  };
});

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, httpLink])
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
