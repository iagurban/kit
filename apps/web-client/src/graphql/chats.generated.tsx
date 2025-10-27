/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from '@apollo/client/core';
import * as Apollo from '@apollo/client/react';

import * as Types from './generated';

const defaultOptions = {} as const;
export type PushChatEventMutationVariables = Types.Exact<{
  chatId: Types.Scalars['ID']['input'];
  type: Types.Scalars['String']['input'];
  payload: Types.Scalars['JSON']['input'];
}>;

export type PushChatEventMutation = {
  __typename?: 'Mutation';
  pushChatEvent: { __typename?: 'PushEventResponseDto'; nn: string; createdAt: any };
};

export const PushChatEventDocument = gql`
  mutation PushChatEvent($chatId: ID!, $type: String!, $payload: JSON!) {
    pushChatEvent(chatId: $chatId, type: $type, payload: $payload) {
      nn
      createdAt
    }
  }
`;
export type PushChatEventMutationFn = Apollo.MutationFunction<
  PushChatEventMutation,
  PushChatEventMutationVariables
>;

/**
 * __usePushChatEventMutation__
 *
 * To run a mutation, you first call `usePushChatEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePushChatEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pushChatEventMutation, { data, loading, error }] = usePushChatEventMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      type: // value for 'type'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function usePushChatEventMutation(
  baseOptions?: Apollo.MutationHookOptions<PushChatEventMutation, PushChatEventMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PushChatEventMutation, PushChatEventMutationVariables>(
    PushChatEventDocument,
    options
  );
}
export type PushChatEventMutationHookResult = ReturnType<typeof usePushChatEventMutation>;
export type PushChatEventMutationResult = Apollo.MutationResult<PushChatEventMutation>;
export type PushChatEventMutationOptions = Apollo.BaseMutationOptions<
  PushChatEventMutation,
  PushChatEventMutationVariables
>;
