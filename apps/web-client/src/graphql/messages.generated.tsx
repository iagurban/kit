/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from '@apollo/client/core';
import * as Apollo from '@apollo/client/react';

import * as Types from './generated';

const defaultOptions = {} as const;
export type AllMessagesSubscriptionSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type AllMessagesSubscriptionSubscription = {
  __typename?: 'Subscription';
  message: { __typename?: 'Message'; nn: any };
};

export type JoinedChatsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type JoinedChatsQuery = {
  __typename?: 'Query';
  joinedChats: Array<{
    __typename?: 'Chat';
    id: string;
    title: string;
    bio?: string | null;
    userPermissions?: Array<{
      __typename?: 'UserChatPermissions';
      permissions?: any | null;
      role?: { __typename?: 'ChatRole'; permissions: any; tags?: Array<Types.ChatRoleTag> | null } | null;
    }> | null;
  }>;
};

export const AllMessagesSubscriptionDocument = gql`
  subscription AllMessagesSubscription {
    message: messagesSubscription {
      nn
    }
  }
`;

/**
 * __useAllMessagesSubscriptionSubscription__
 *
 * To run a query within a React component, call `useAllMessagesSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAllMessagesSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMessagesSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAllMessagesSubscriptionSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    AllMessagesSubscriptionSubscription,
    AllMessagesSubscriptionSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    AllMessagesSubscriptionSubscription,
    AllMessagesSubscriptionSubscriptionVariables
  >(AllMessagesSubscriptionDocument, options);
}
export type AllMessagesSubscriptionSubscriptionHookResult = ReturnType<
  typeof useAllMessagesSubscriptionSubscription
>;
export type AllMessagesSubscriptionSubscriptionResult =
  Apollo.SubscriptionResult<AllMessagesSubscriptionSubscription>;
export const JoinedChatsDocument = gql`
  query JoinedChats {
    joinedChats {
      id
      title
      bio
      userPermissions {
        permissions
        role {
          permissions
          tags
        }
      }
    }
  }
`;

/**
 * __useJoinedChatsQuery__
 *
 * To run a query within a React component, call `useJoinedChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJoinedChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinedChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useJoinedChatsQuery(
  baseOptions?: Apollo.QueryHookOptions<JoinedChatsQuery, JoinedChatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<JoinedChatsQuery, JoinedChatsQueryVariables>(JoinedChatsDocument, options);
}
export function useJoinedChatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<JoinedChatsQuery, JoinedChatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<JoinedChatsQuery, JoinedChatsQueryVariables>(JoinedChatsDocument, options);
}
export function useJoinedChatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<JoinedChatsQuery, JoinedChatsQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<JoinedChatsQuery, JoinedChatsQueryVariables>(JoinedChatsDocument, options);
}
export type JoinedChatsQueryHookResult = ReturnType<typeof useJoinedChatsQuery>;
export type JoinedChatsLazyQueryHookResult = ReturnType<typeof useJoinedChatsLazyQuery>;
export type JoinedChatsSuspenseQueryHookResult = ReturnType<typeof useJoinedChatsSuspenseQuery>;
export type JoinedChatsQueryResult = Apollo.QueryResult<JoinedChatsQuery, JoinedChatsQueryVariables>;
