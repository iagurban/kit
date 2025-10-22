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

export type AttachmentInfo = {
  __typename?: 'AttachmentInfo';
  fileId: Scalars['ID']['output'];
  filename: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  mimeType: Scalars['String']['output'];
  size: Scalars['BigInt']['output'];
  url: Scalars['String']['output'];
};

export type AttachmentPreview = {
  __typename?: 'AttachmentPreview';
  thumbnail?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type Chat = {
  __typename?: 'Chat';
  _count: ChatCount;
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  defaultRole?: Maybe<ChatRole>;
  defaultRoleId?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<ChatEvent>>;
  eventsCounter?: Maybe<ChatEventsCounter>;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<ChatMember>>;
  messagesCounter?: Maybe<MessagesCounter>;
  owner: User;
  ownerId: Scalars['String']['output'];
  roles?: Maybe<Array<ChatRole>>;
  title: Scalars['String']['output'];
  userPermissions?: Maybe<Array<UserChatPermissions>>;
};

export type ChatCount = {
  __typename?: 'ChatCount';
  events: Scalars['Int']['output'];
  members: Scalars['Int']['output'];
  roles: Scalars['Int']['output'];
  userPermissions: Scalars['Int']['output'];
};

export type ChatEvent = {
  __typename?: 'ChatEvent';
  author: User;
  authorId: Scalars['String']['output'];
  chat: Chat;
  chatId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  nn: Scalars['String']['output'];
  payload: Scalars['JSON']['output'];
  type: Scalars['String']['output'];
};

export type ChatEventsCounter = {
  __typename?: 'ChatEventsCounter';
  chat: Chat;
  chatId: Scalars['ID']['output'];
  lastNn: Scalars['String']['output'];
};

export type ChatMember = {
  __typename?: 'ChatMember';
  chat: Chat;
  chatId: Scalars['String']['output'];
  joinedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ChatRole = {
  __typename?: 'ChatRole';
  _count: ChatRoleCount;
  chat: Chat;
  chatId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDefaultForChats?: Maybe<Array<Chat>>;
  name: Scalars['String']['output'];
  permissions: Scalars['JSON']['output'];
  tags?: Maybe<Array<ChatRoleTag>>;
  userPermissions?: Maybe<Array<UserChatPermissions>>;
};

export type ChatRoleCount = {
  __typename?: 'ChatRoleCount';
  isDefaultForChats: Scalars['Int']['output'];
  userPermissions: Scalars['Int']['output'];
};

export enum ChatRoleTag {
  Admin = 'ADMIN',
  Banned = 'BANNED',
  Member = 'MEMBER',
  Moderator = 'MODERATOR',
  Viewer = 'VIEWER',
}

export type ForwardInfo = {
  __typename?: 'ForwardInfo';
  attachments?: Maybe<Array<AttachmentInfo>>;
  authorId: Scalars['ID']['output'];
  chatId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  nn: Scalars['BigInt']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

export type Message = {
  __typename?: 'Message';
  attachments?: Maybe<Array<AttachmentInfo>>;
  authorId: Scalars['ID']['output'];
  chatId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  editedAt?: Maybe<Scalars['DateTime']['output']>;
  editedNn?: Maybe<Scalars['BigInt']['output']>;
  eventNn?: Maybe<Scalars['BigInt']['output']>;
  forwarded?: Maybe<Array<ForwardInfo>>;
  nn: Scalars['BigInt']['output'];
  replyToNn?: Maybe<Scalars['BigInt']['output']>;
  replyToPreview?: Maybe<ReplyToPreview>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type MessagesCounter = {
  __typename?: 'MessagesCounter';
  chat: Chat;
  chatId: Scalars['ID']['output'];
  lastNn: Scalars['String']['output'];
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
  getMessages: Message;
  joinedChats: Array<Chat>;
};

export type QueryGetMessagesArgs = {
  greaterThanNn?: InputMaybe<Scalars['Int']['input']>;
  lessThanNn?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
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

export type ReplyToPreview = {
  __typename?: 'ReplyToPreview';
  attachments?: Maybe<Array<AttachmentPreview>>;
  authorId: Scalars['ID']['output'];
  nn: Scalars['ID']['output'];
  text?: Maybe<Scalars['String']['output']>;
};

export type StoredFile = {
  __typename?: 'StoredFile';
  cdnUrl: Scalars['String']['output'];
  checksum: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  mimeType: Scalars['String']['output'];
  originalFilename: Scalars['String']['output'];
  sizeBytes: Scalars['String']['output'];
  storageKey: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uploadSession?: Maybe<UploadSession>;
  uploadedByUser: User;
  uploadedByUserId: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messagesSubscription: Message;
};

export type UploadChunk = {
  __typename?: 'UploadChunk';
  eTag?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  leasedAt?: Maybe<Scalars['DateTime']['output']>;
  partNumber: Scalars['Int']['output'];
  session: UploadSession;
  sessionId: Scalars['String']['output'];
};

export type UploadSession = {
  __typename?: 'UploadSession';
  _count: UploadSessionCount;
  chunks?: Maybe<Array<UploadChunk>>;
  createdAt: Scalars['DateTime']['output'];
  failReason?: Maybe<Scalars['String']['output']>;
  file: StoredFile;
  fileId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: UploadStatus;
  storageUploadId: Scalars['String']['output'];
  totalChunks: Scalars['Int']['output'];
  totalFailureCount: Scalars['Int']['output'];
};

export type UploadSessionCount = {
  __typename?: 'UploadSessionCount';
  chunks: Scalars['Int']['output'];
};

export enum UploadStatus {
  Active = 'ACTIVE',
  Failed = 'FAILED',
  Finalizing = 'FINALIZING',
}

export type User = {
  __typename?: 'User';
  RefreshToken?: Maybe<Array<RefreshToken>>;
  _count: UserCount;
  abbrev?: Maybe<Scalars['String']['output']>;
  chatEvents?: Maybe<Array<ChatEvent>>;
  chatsMmbership?: Maybe<Array<ChatMember>>;
  chatsPermissions?: Maybe<Array<UserChatPermissions>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  ownChats?: Maybe<Array<Chat>>;
  uploadedFiles?: Maybe<Array<StoredFile>>;
};

export type UserChatPermissions = {
  __typename?: 'UserChatPermissions';
  chat: Chat;
  chatId: Scalars['String']['output'];
  permissions?: Maybe<Scalars['JSON']['output']>;
  role?: Maybe<ChatRole>;
  roleId?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  RefreshToken: Scalars['Int']['output'];
  chatEvents: Scalars['Int']['output'];
  chatsMmbership: Scalars['Int']['output'];
  chatsPermissions: Scalars['Int']['output'];
  ownChats: Scalars['Int']['output'];
  uploadedFiles: Scalars['Int']['output'];
};

export enum JoinGraph {
  Chats = 'CHATS',
  Messages = 'MESSAGES',
  Subscriptions = 'SUBSCRIPTIONS',
}

export enum LinkPurpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY',
}
