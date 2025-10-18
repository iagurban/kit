import { ApolloClient } from '@apollo/client';
import { notNull } from '@gurban/kit/utils/flow-utils';
import { createContext } from 'mobx-keystone';

// keep private
const graphqlClientContext = createContext<ApolloClient>();

export const getGraphqlClient = (node: object) =>
  notNull(graphqlClientContext.get(node), () => `Graphql client not set`);

export const setGraphqlClient = (node: object, client: ApolloClient) =>
  graphqlClientContext.set(node, client);
