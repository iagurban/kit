/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** 64-bit signed integer */
  BigInt: { input: any; output: any };

  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  join__FieldSet: { input: any; output: any };
  link__Import: { input: any; output: any };
};

export type MessageDto = {
  __typename?: 'MessageDTO';
  nn: Scalars['BigInt']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  pushChatEvent: PushEventResponseDto;
};

export type MutationPushChatEventArgs = {
  chatId: Scalars['ID']['input'];
  payload: Scalars['JSON']['input'];
  type: Scalars['String']['input'];
};

export type PushEventResponseDto = {
  __typename?: 'PushEventResponseDto';
  /** Серверное время генерации события */
  createdAt: Scalars['DateTime']['output'];
  /** Присвоенный порядковый номер события в чате */
  nn: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  dummyQuery: Scalars['Float']['output'];
  getMessages: MessageDto;
};

export type QueryGetMessagesArgs = {
  greaterThanNn?: InputMaybe<Scalars['Int']['input']>;
  lessThanNn?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export enum JoinGraph {
  Chats = 'CHATS',
  Messages = 'MESSAGES',
}

export enum LinkPurpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY',
}
