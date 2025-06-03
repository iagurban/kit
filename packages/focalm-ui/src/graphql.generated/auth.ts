import { gql } from 'urql';
import * as Urql from 'urql';

import * as Types from './_types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LoginMutationVariables = Types.Exact<{
  login: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type LoginMutation = { __typename?: 'Mutation'; accessToken: string };

export const LoginDocument = gql`
  mutation Login($login: String!, $password: String!) {
    accessToken: login(login: $login, password: $password)
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
