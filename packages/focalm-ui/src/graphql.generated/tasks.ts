import { gql } from 'urql';
import * as Urql from 'urql';

import * as Types from './_types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type FullTaskFragment = {
  __typename?: 'Task';
  id: string;
  state: Types.TaskState;
  title: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  dueToDate?: any | null;
  dueToOffset?: number | null;
  startAfterDate?: any | null;
  startAfterOffset?: number | null;
  plannedStartDate?: any | null;
  plannedStartOffset?: number | null;
  impact: number;
  ease: number;
  orderKey: string;
  responsibleId?: string | null;
  authorId: string;
  parent?: { __typename?: 'Task'; id: string; title: string } | null;
  participants?: Array<{
    __typename?: 'UserInTask';
    userId: string;
    tags?: Array<{ __typename?: 'UserInTaskTag'; tag: string }> | null;
  }> | null;
};

export type BriefUserFragment = { __typename?: 'User'; id: string; email: string; name: string };

export type GetTasksQueryVariables = Types.Exact<{
  updatedAfter?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;

export type GetTasksQuery = {
  __typename?: 'Query';
  tasks: {
    __typename?: 'TasksWithRelatedStuff';
    tasks: Array<{
      __typename?: 'Task';
      id: string;
      state: Types.TaskState;
      title: string;
      archived: boolean;
      createdAt: string;
      updatedAt: string;
      dueToDate?: any | null;
      dueToOffset?: number | null;
      startAfterDate?: any | null;
      startAfterOffset?: number | null;
      plannedStartDate?: any | null;
      plannedStartOffset?: number | null;
      impact: number;
      ease: number;
      orderKey: string;
      responsibleId?: string | null;
      authorId: string;
      parent?: { __typename?: 'Task'; id: string; title: string } | null;
      participants?: Array<{
        __typename?: 'UserInTask';
        userId: string;
        tags?: Array<{ __typename?: 'UserInTaskTag'; tag: string }> | null;
      }> | null;
    }>;
    relatedUsers: Array<{ __typename?: 'User'; id: string; email: string; name: string }>;
  };
};

export type UpdateTasksMutationVariables = Types.Exact<{
  changes: Array<Types.TasksChangesGroup> | Types.TasksChangesGroup;
  updatedAfter?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;

export type UpdateTasksMutation = {
  __typename?: 'Mutation';
  result: {
    __typename?: 'TasksUpdateResult';
    changedIds: Array<{ __typename?: 'IDMapping'; src: string; dst: string }>;
    tasks: {
      __typename?: 'TasksWithRelatedStuff';
      tasks: Array<{
        __typename?: 'Task';
        id: string;
        state: Types.TaskState;
        title: string;
        archived: boolean;
        createdAt: string;
        updatedAt: string;
        dueToDate?: any | null;
        dueToOffset?: number | null;
        startAfterDate?: any | null;
        startAfterOffset?: number | null;
        plannedStartDate?: any | null;
        plannedStartOffset?: number | null;
        impact: number;
        ease: number;
        orderKey: string;
        responsibleId?: string | null;
        authorId: string;
        parent?: { __typename?: 'Task'; id: string; title: string } | null;
        participants?: Array<{
          __typename?: 'UserInTask';
          userId: string;
          tags?: Array<{ __typename?: 'UserInTaskTag'; tag: string }> | null;
        }> | null;
      }>;
      relatedUsers: Array<{ __typename?: 'User'; id: string; email: string; name: string }>;
    };
  };
};

export const FullTaskFragmentDoc = gql`
  fragment FullTask on Task {
    id
    state
    title
    archived
    createdAt
    updatedAt
    dueToDate
    dueToOffset
    startAfterDate
    startAfterOffset
    plannedStartDate
    plannedStartOffset
    impact
    ease
    orderKey
    parent {
      id
      title
    }
    responsibleId
    authorId
    participants {
      userId
      tags {
        tag
      }
    }
  }
`;
export const BriefUserFragmentDoc = gql`
  fragment BriefUser on User {
    id
    email
    name
  }
`;
export const GetTasksDocument = gql`
  query GetTasks($updatedAfter: DateTime) {
    tasks(updatedAfter: $updatedAfter) {
      tasks {
        ...FullTask
      }
      relatedUsers {
        ...BriefUser
      }
    }
  }
  ${FullTaskFragmentDoc}
  ${BriefUserFragmentDoc}
`;

export function useGetTasksQuery(options?: Omit<Urql.UseQueryArgs<GetTasksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTasksQuery, GetTasksQueryVariables>({ query: GetTasksDocument, ...options });
}
export const UpdateTasksDocument = gql`
  mutation UpdateTasks($changes: [TasksChangesGroup!]!, $updatedAfter: DateTime) {
    result: updateTasks(changes: $changes) {
      changedIds {
        src
        dst
      }
      tasks(updatedAfter: $updatedAfter) {
        tasks {
          ...FullTask
        }
        relatedUsers {
          ...BriefUser
        }
      }
    }
  }
  ${FullTaskFragmentDoc}
  ${BriefUserFragmentDoc}
`;

export function useUpdateTasksMutation() {
  return Urql.useMutation<UpdateTasksMutation, UpdateTasksMutationVariables>(UpdateTasksDocument);
}
