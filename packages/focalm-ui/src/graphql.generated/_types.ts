export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export enum CreatedAtFixReason {
  Both = 'Both',
  High = 'High',
  Low = 'Low',
}

export type IdMapping = {
  __typename?: 'IDMapping';
  dst: Scalars['String']['output'];
  src: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
  updateTasks: TasksUpdateResult;
};

export type MutationLoginArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationUpdateTasksArgs = {
  changes: Array<TasksChangesGroup>;
};

export type Query = {
  __typename?: 'Query';
  tasks: TasksWithRelatedStuff;
};

export type QueryTasksArgs = {
  updatedAfter?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RefreshToken = {
  __typename?: 'RefreshToken';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type StoredFile = {
  __typename?: 'StoredFile';
  _count: StoredFileCount;
  createdAt: Scalars['DateTime']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  size: Scalars['Int']['output'];
  uploads?: Maybe<Array<UploadedFile>>;
};

export type StoredFileCount = {
  __typename?: 'StoredFileCount';
  uploads: Scalars['Int']['output'];
};

export type Task = {
  __typename?: 'Task';
  _count: TaskCount;
  archived: Scalars['Boolean']['output'];
  author: User;
  authorId: Scalars['String']['output'];
  children?: Maybe<Array<Task>>;
  createdAt: Scalars['DateTime']['output'];
  dueToDate?: Maybe<Scalars['Date']['output']>;
  dueToOffset?: Maybe<Scalars['Int']['output']>;
  ease: Scalars['Float']['output'];
  historyValues?: Maybe<Array<TaskHistoryValue>>;
  id: Scalars['ID']['output'];
  impact: Scalars['Float']['output'];
  orderKey: Scalars['String']['output'];
  parent?: Maybe<Task>;
  parentId?: Maybe<Scalars['String']['output']>;
  participants?: Maybe<Array<UserInTask>>;
  plannedStartDate?: Maybe<Scalars['Date']['output']>;
  plannedStartOffset?: Maybe<Scalars['Int']['output']>;
  responsible?: Maybe<User>;
  responsibleId?: Maybe<Scalars['String']['output']>;
  startAfterDate?: Maybe<Scalars['Date']['output']>;
  startAfterOffset?: Maybe<Scalars['Int']['output']>;
  state: TaskState;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskCount = {
  __typename?: 'TaskCount';
  children: Scalars['Int']['output'];
  historyValues: Scalars['Int']['output'];
  participants: Scalars['Int']['output'];
};

export type TaskFieldUpdateInput = {
  field: TaskHistoryKey;
  stringValue: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};

export type TaskHistoryGroup = {
  __typename?: 'TaskHistoryGroup';
  _count: TaskHistoryGroupCount;
  author: User;
  authorId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdAtFixReason?: Maybe<CreatedAtFixReason>;
  id: Scalars['ID']['output'];
  localCreatedAt: Scalars['DateTime']['output'];
  values?: Maybe<Array<TaskHistoryValue>>;
};

export type TaskHistoryGroupCount = {
  __typename?: 'TaskHistoryGroupCount';
  values: Scalars['Int']['output'];
};

export enum TaskHistoryKey {
  Archived = 'archived',
  AuthorId = 'authorId',
  DueToDate = 'dueToDate',
  DueToOffset = 'dueToOffset',
  Ease = 'ease',
  Impact = 'impact',
  OrderKey = 'orderKey',
  ParentId = 'parentId',
  Participants = 'participants',
  PlannedStartDate = 'plannedStartDate',
  PlannedStartOffset = 'plannedStartOffset',
  ResponsibleId = 'responsibleId',
  StartAfterDate = 'startAfterDate',
  StartAfterOffset = 'startAfterOffset',
  State = 'state',
  Title = 'title',
}

export enum TaskHistoryOperation {
  Add = 'Add',
  Remove = 'Remove',
  Set = 'Set',
}

export type TaskHistoryValue = {
  __typename?: 'TaskHistoryValue';
  group: TaskHistoryGroup;
  groupId: Scalars['String']['output'];
  key: TaskHistoryKey;
  op: TaskHistoryOperation;
  task: Task;
  taskId: Scalars['String']['output'];
  value: Scalars['JSON']['output'];
};

export enum TaskState {
  Active = 'Active',
  Done = 'Done',
  Pending = 'Pending',
}

export type TasksChangesGroup = {
  createdAt: Scalars['DateTime']['input'];
  createdAtFixReason?: InputMaybe<CreatedAtFixReason>;
  localCreatedAt: Scalars['DateTime']['input'];
  updates: Array<TaskFieldUpdateInput>;
};

export type TasksUpdateResult = {
  __typename?: 'TasksUpdateResult';
  changedIds: Array<IdMapping>;
  tasks: TasksWithRelatedStuff;
};

export type TasksUpdateResultTasksArgs = {
  updatedAfter?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TasksWithRelatedStuff = {
  __typename?: 'TasksWithRelatedStuff';
  relatedUsers: Array<User>;
  tasks: Array<Task>;
};

export type UploadedFile = {
  __typename?: 'UploadedFile';
  id: Scalars['ID']['output'];
  mimetype: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  storedFile: StoredFile;
  storedFileId: Scalars['String']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  uploader: User;
  uploaderId: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  assignedTasks?: Maybe<Array<Task>>;
  authoredTaskChanges?: Maybe<Array<TaskHistoryGroup>>;
  authoredTasks?: Maybe<Array<Task>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  participatingTasks?: Maybe<Array<UserInTask>>;
  passwordHash: Scalars['String']['output'];
  refreshTokens?: Maybe<Array<RefreshToken>>;
  uploadedFiles?: Maybe<Array<UploadedFile>>;
};

export type UserCount = {
  __typename?: 'UserCount';
  assignedTasks: Scalars['Int']['output'];
  authoredTaskChanges: Scalars['Int']['output'];
  authoredTasks: Scalars['Int']['output'];
  participatingTasks: Scalars['Int']['output'];
  refreshTokens: Scalars['Int']['output'];
  uploadedFiles: Scalars['Int']['output'];
};

export type UserInTask = {
  __typename?: 'UserInTask';
  _count: UserInTaskCount;
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<UserInTaskTag>>;
  task: Task;
  taskId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type UserInTaskCount = {
  __typename?: 'UserInTaskCount';
  tags: Scalars['Int']['output'];
};

export type UserInTaskTag = {
  __typename?: 'UserInTaskTag';
  tag: Scalars['String']['output'];
  userInTask: UserInTask;
  userInTaskId: Scalars['String']['output'];
};
