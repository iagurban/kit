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
  createdAt: any;
  updatedAt: any;
  dueTo?: any | null;
  startAfter?: any | null;
  plannedStart?: any | null;
  impact: number;
  ease: number;
  orderKey: string;
  parent?: { __typename?: 'Task'; id: string; title: string } | null;
  responsible?: { __typename?: 'User'; id: string; email: string; name: string } | null;
  author: { __typename?: 'User'; id: string; email: string; name: string };
};

export type GetTasksQueryVariables = Types.Exact<{
  updatedAfter?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;

export type GetTasksQuery = {
  __typename?: 'Query';
  tasks: Array<{
    __typename?: 'Task';
    id: string;
    state: Types.TaskState;
    title: string;
    archived: boolean;
    createdAt: any;
    updatedAt: any;
    dueTo?: any | null;
    startAfter?: any | null;
    plannedStart?: any | null;
    impact: number;
    ease: number;
    orderKey: string;
    parent?: { __typename?: 'Task'; id: string; title: string } | null;
    responsible?: { __typename?: 'User'; id: string; email: string; name: string } | null;
    author: { __typename?: 'User'; id: string; email: string; name: string };
  }>;
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
    tasks: Array<{
      __typename?: 'Task';
      id: string;
      state: Types.TaskState;
      title: string;
      archived: boolean;
      createdAt: any;
      updatedAt: any;
      dueTo?: any | null;
      startAfter?: any | null;
      plannedStart?: any | null;
      impact: number;
      ease: number;
      orderKey: string;
      parent?: { __typename?: 'Task'; id: string; title: string } | null;
      responsible?: { __typename?: 'User'; id: string; email: string; name: string } | null;
      author: { __typename?: 'User'; id: string; email: string; name: string };
    }>;
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
    dueTo
    startAfter
    plannedStart
    impact
    ease
    orderKey
    parent {
      id
      title
    }
    responsible {
      id
      email
      name
    }
    author {
      id
      email
      name
    }
  }
`;
export const GetTasksDocument = gql`
  query GetTasks($updatedAfter: DateTime) {
    tasks(updatedAfter: $updatedAfter) {
      ...FullTask
    }
  }
  ${FullTaskFragmentDoc}
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
        ...FullTask
      }
    }
  }
  ${FullTaskFragmentDoc}
`;

export function useUpdateTasksMutation() {
  return Urql.useMutation<UpdateTasksMutation, UpdateTasksMutationVariables>(UpdateTasksDocument);
}
