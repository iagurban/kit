import { gql } from 'urql';
import * as Urql from 'urql';

import * as Types from './_types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type FullTaskFragment = {
  __typename?: 'Task';
  id: string;
  state: Types.TaskState;
  title: string;
  description: any;
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
  projectId: string;
  parent?: { __typename?: 'Task'; id: string; title: string } | null;
  participants?: Array<{
    __typename?: 'UserInTask';
    userId: string;
    tags?: Array<{
      __typename?: 'UserInTaskTag';
      role: { __typename?: 'ParticipantRole'; id: string; name: string; color: string };
    }> | null;
  }> | null;
  relationsSrc?: Array<{ __typename?: 'TaskToTaskRelation'; dstId: string; typeId: string }> | null;
  relationsDst?: Array<{ __typename?: 'TaskToTaskRelation'; srcId: string; typeId: string }> | null;
};

export type BriefUserFragment = {
  __typename?: 'User';
  id: string;
  email: string;
  name: string;
  abbrev?: string | null;
};

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
      description: any;
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
      projectId: string;
      parent?: { __typename?: 'Task'; id: string; title: string } | null;
      participants?: Array<{
        __typename?: 'UserInTask';
        userId: string;
        tags?: Array<{
          __typename?: 'UserInTaskTag';
          role: { __typename?: 'ParticipantRole'; id: string; name: string; color: string };
        }> | null;
      }> | null;
      relationsSrc?: Array<{ __typename?: 'TaskToTaskRelation'; dstId: string; typeId: string }> | null;
      relationsDst?: Array<{ __typename?: 'TaskToTaskRelation'; srcId: string; typeId: string }> | null;
    }>;
    relatedUsers: Array<{
      __typename?: 'User';
      id: string;
      email: string;
      name: string;
      abbrev?: string | null;
    }>;
  };
};

export type SearchTasksQueryVariables = Types.Exact<{
  titleLike?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type SearchTasksQuery = {
  __typename?: 'Query';
  searchTasks: {
    __typename?: 'TasksWithRelatedStuff';
    tasks: Array<{ __typename?: 'Task'; id: string; title: string; state: Types.TaskState }>;
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
        description: any;
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
        projectId: string;
        parent?: { __typename?: 'Task'; id: string; title: string } | null;
        participants?: Array<{
          __typename?: 'UserInTask';
          userId: string;
          tags?: Array<{
            __typename?: 'UserInTaskTag';
            role: { __typename?: 'ParticipantRole'; id: string; name: string; color: string };
          }> | null;
        }> | null;
        relationsSrc?: Array<{ __typename?: 'TaskToTaskRelation'; dstId: string; typeId: string }> | null;
        relationsDst?: Array<{ __typename?: 'TaskToTaskRelation'; srcId: string; typeId: string }> | null;
      }>;
      relatedUsers: Array<{
        __typename?: 'User';
        id: string;
        email: string;
        name: string;
        abbrev?: string | null;
      }>;
    };
  };
};

export type GetParticipantsRolesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetParticipantsRolesQuery = {
  __typename?: 'Query';
  participantsRoles: Array<{ __typename?: 'ParticipantRole'; id: string; name: string; color: string }>;
};

export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: 'Query';
  users: Array<{ __typename?: 'User'; id: string; email: string; name: string; abbrev?: string | null }>;
};

export type GetProjectQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type GetProjectQuery = {
  __typename?: 'Query';
  project: {
    __typename?: 'Project2';
    id: string;
    name: string;
    relationTypes: Array<{
      __typename?: 'TaskToTaskRelationType';
      id: string;
      forward: string;
      inverse: string;
    }>;
  };
};

export type GetProjectsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetProjectsQuery = {
  __typename?: 'Query';
  projects: Array<{
    __typename?: 'Project2';
    id: string;
    name: string;
    relationTypes: Array<{
      __typename?: 'TaskToTaskRelationType';
      id: string;
      forward: string;
      inverse: string;
    }>;
    ownOf?: { __typename?: 'User'; id: string } | null;
  }>;
};

export type GetFailingQueryQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetFailingQueryQuery = { __typename?: 'Query'; failingQuery: boolean };

export const FullTaskFragmentDoc = gql`
  fragment FullTask on Task {
    id
    state
    title
    description
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
    projectId
    participants {
      userId
      tags {
        role {
          id
          name
          color
        }
      }
    }
    relationsSrc {
      dstId
      typeId
    }
    relationsDst {
      srcId
      typeId
    }
  }
`;
export const BriefUserFragmentDoc = gql`
  fragment BriefUser on User {
    id
    email
    name
    abbrev
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
export const SearchTasksDocument = gql`
  query SearchTasks($titleLike: String) {
    searchTasks(titleLike: $titleLike) {
      tasks {
        id
        title
        state
      }
    }
  }
`;

export function useSearchTasksQuery(options?: Omit<Urql.UseQueryArgs<SearchTasksQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchTasksQuery, SearchTasksQueryVariables>({
    query: SearchTasksDocument,
    ...options,
  });
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
export const GetParticipantsRolesDocument = gql`
  query GetParticipantsRoles {
    participantsRoles {
      id
      name
      color
    }
  }
`;

export function useGetParticipantsRolesQuery(
  options?: Omit<Urql.UseQueryArgs<GetParticipantsRolesQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetParticipantsRolesQuery, GetParticipantsRolesQueryVariables>({
    query: GetParticipantsRolesDocument,
    ...options,
  });
}
export const GetUsersDocument = gql`
  query GetUsers {
    users {
      id
      email
      name
      abbrev
    }
  }
`;

export function useGetUsersQuery(options?: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables>({ query: GetUsersDocument, ...options });
}
export const GetProjectDocument = gql`
  query GetProject($id: String) {
    project(id: $id) {
      id
      name
      relationTypes {
        id
        forward
        inverse
      }
    }
  }
`;

export function useGetProjectQuery(options?: Omit<Urql.UseQueryArgs<GetProjectQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProjectQuery, GetProjectQueryVariables>({ query: GetProjectDocument, ...options });
}
export const GetProjectsDocument = gql`
  query GetProjects {
    projects {
      id
      name
      relationTypes {
        id
        forward
        inverse
      }
      ownOf {
        id
      }
    }
  }
`;

export function useGetProjectsQuery(options?: Omit<Urql.UseQueryArgs<GetProjectsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProjectsQuery, GetProjectsQueryVariables>({
    query: GetProjectsDocument,
    ...options,
  });
}
export const GetFailingQueryDocument = gql`
  query GetFailingQuery {
    failingQuery
  }
`;

export function useGetFailingQueryQuery(
  options?: Omit<Urql.UseQueryArgs<GetFailingQueryQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetFailingQueryQuery, GetFailingQueryQueryVariables>({
    query: GetFailingQueryDocument,
    ...options,
  });
}
