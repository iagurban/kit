import { gql } from '@apollo/client/core';
import * as Apollo from '@apollo/client/react';

import * as Types from './generated';

const defaultOptions = {} as const;
export type AllMessagesSubscriptionSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type AllMessagesSubscriptionSubscription = {
  __typename?: 'Subscription';
  message: { __typename?: 'Message'; nn: any };
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
