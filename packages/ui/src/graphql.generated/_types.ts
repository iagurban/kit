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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** An arbitrary-precision Decimal type */
  Decimal: { input: any; output: any };
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Item = {
  __typename?: 'Item';
  _count: ItemCount;
  children?: Maybe<Array<Item>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<UploadedFile>;
  imageId?: Maybe<Scalars['String']['output']>;
  menu: Menu;
  menuId: Scalars['String']['output'];
  orderKey: Scalars['String']['output'];
  parent?: Maybe<Item>;
  parentId?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Decimal']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ItemCount = {
  __typename?: 'ItemCount';
  children: Scalars['Int']['output'];
};

export type ItemListRelationFilter = {
  every?: InputMaybe<ItemWhereInput>;
  none?: InputMaybe<ItemWhereInput>;
  some?: InputMaybe<ItemWhereInput>;
};

export type ItemNullableScalarRelationFilter = {
  is?: InputMaybe<ItemWhereInput>;
  isNot?: InputMaybe<ItemWhereInput>;
};

export type ItemWhereInput = {
  AND?: InputMaybe<Array<ItemWhereInput>>;
  NOT?: InputMaybe<Array<ItemWhereInput>>;
  OR?: InputMaybe<Array<ItemWhereInput>>;
  children?: InputMaybe<ItemListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  image?: InputMaybe<UploadedFileNullableScalarRelationFilter>;
  imageId?: InputMaybe<StringNullableFilter>;
  menu?: InputMaybe<MenuScalarRelationFilter>;
  menuId?: InputMaybe<UuidFilter>;
  orderKey?: InputMaybe<StringFilter>;
  parent?: InputMaybe<ItemNullableScalarRelationFilter>;
  parentId?: InputMaybe<UuidNullableFilter>;
  price?: InputMaybe<DecimalNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
};

export type Menu = {
  __typename?: 'Menu';
  _count: MenuCount;
  createdAt: Scalars['DateTime']['output'];
  files?: Maybe<Array<UploadedFile>>;
  id: Scalars['ID']['output'];
  images: Array<UploadedFile>;
  items?: Maybe<Array<Item>>;
  owner: User;
  ownerId: Scalars['String']['output'];
  tags?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type MenuCount = {
  __typename?: 'MenuCount';
  files: Scalars['Int']['output'];
  items: Scalars['Int']['output'];
  tags: Scalars['Int']['output'];
};

export type MenuListRelationFilter = {
  every?: InputMaybe<MenuWhereInput>;
  none?: InputMaybe<MenuWhereInput>;
  some?: InputMaybe<MenuWhereInput>;
};

export type MenuScalarRelationFilter = {
  is?: InputMaybe<MenuWhereInput>;
  isNot?: InputMaybe<MenuWhereInput>;
};

export type MenuWhereInput = {
  AND?: InputMaybe<Array<MenuWhereInput>>;
  NOT?: InputMaybe<Array<MenuWhereInput>>;
  OR?: InputMaybe<Array<MenuWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  files?: InputMaybe<UploadedFileListRelationFilter>;
  id?: InputMaybe<UuidFilter>;
  items?: InputMaybe<ItemListRelationFilter>;
  owner?: InputMaybe<UserScalarRelationFilter>;
  ownerId?: InputMaybe<UuidFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MenuWhereUniqueInput = {
  AND?: InputMaybe<Array<MenuWhereInput>>;
  NOT?: InputMaybe<Array<MenuWhereInput>>;
  OR?: InputMaybe<Array<MenuWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  files?: InputMaybe<UploadedFileListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<ItemListRelationFilter>;
  owner?: InputMaybe<UserScalarRelationFilter>;
  ownerId?: InputMaybe<UuidFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String']['output'];
  logout: Scalars['Boolean']['output'];
  saveMenu: Menu;
};

export type MutationLoginArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSaveMenuArgs = {
  menu: SaveMenuInput;
};

export type MyItemCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  orderKey: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MyItemUpdateInput = {
  description?: InputMaybe<NullableStringInput>;
  id: Scalars['String']['input'];
  orderKey?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<NullableStringInput>;
  title?: InputMaybe<NullableStringInput>;
};

export type MyMenuUpdateFields = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedUuidFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type NestedUuidNullableFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedUuidNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type NullableStringInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  availableMenus: Array<Menu>;
  menu?: Maybe<Menu>;
};

export type QueryMenuArgs = {
  where?: InputMaybe<MenuWhereUniqueInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type RefreshToken = {
  __typename?: 'RefreshToken';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type RefreshTokenListRelationFilter = {
  every?: InputMaybe<RefreshTokenWhereInput>;
  none?: InputMaybe<RefreshTokenWhereInput>;
  some?: InputMaybe<RefreshTokenWhereInput>;
};

export type RefreshTokenWhereInput = {
  AND?: InputMaybe<Array<RefreshTokenWhereInput>>;
  NOT?: InputMaybe<Array<RefreshTokenWhereInput>>;
  OR?: InputMaybe<Array<RefreshTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  hash?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  user?: InputMaybe<UserScalarRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type SaveMenuInput = {
  creates: Array<MyItemCreateInput>;
  fields: MyMenuUpdateFields;
  id: Scalars['String']['input'];
  updates: Array<MyItemUpdateInput>;
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

export type StoredFileScalarRelationFilter = {
  is?: InputMaybe<StoredFileWhereInput>;
  isNot?: InputMaybe<StoredFileWhereInput>;
};

export type StoredFileWhereInput = {
  AND?: InputMaybe<Array<StoredFileWhereInput>>;
  NOT?: InputMaybe<Array<StoredFileWhereInput>>;
  OR?: InputMaybe<Array<StoredFileWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  hash?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  size?: InputMaybe<IntFilter>;
  uploads?: InputMaybe<UploadedFileListRelationFilter>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  menu: Menu;
  menuId: Scalars['String']['output'];
};

export type TagListRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  id?: InputMaybe<UuidFilter>;
  menu?: InputMaybe<MenuScalarRelationFilter>;
  menuId?: InputMaybe<UuidFilter>;
};

export type UploadedFile = {
  __typename?: 'UploadedFile';
  _count: UploadedFileCount;
  id: Scalars['ID']['output'];
  menu: Menu;
  menuId: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  storedFile: StoredFile;
  storedFileId: Scalars['String']['output'];
  uploadedAt: Scalars['DateTime']['output'];
  uploader: User;
  uploaderId: Scalars['String']['output'];
  url: Scalars['String']['output'];
  usingItems?: Maybe<Array<Item>>;
};

export type UploadedFileCount = {
  __typename?: 'UploadedFileCount';
  usingItems: Scalars['Int']['output'];
};

export type UploadedFileListRelationFilter = {
  every?: InputMaybe<UploadedFileWhereInput>;
  none?: InputMaybe<UploadedFileWhereInput>;
  some?: InputMaybe<UploadedFileWhereInput>;
};

export type UploadedFileNullableScalarRelationFilter = {
  is?: InputMaybe<UploadedFileWhereInput>;
  isNot?: InputMaybe<UploadedFileWhereInput>;
};

export type UploadedFileWhereInput = {
  AND?: InputMaybe<Array<UploadedFileWhereInput>>;
  NOT?: InputMaybe<Array<UploadedFileWhereInput>>;
  OR?: InputMaybe<Array<UploadedFileWhereInput>>;
  id?: InputMaybe<StringFilter>;
  menu?: InputMaybe<MenuScalarRelationFilter>;
  menuId?: InputMaybe<UuidFilter>;
  mimetype?: InputMaybe<StringFilter>;
  originalName?: InputMaybe<StringFilter>;
  storedFile?: InputMaybe<StoredFileScalarRelationFilter>;
  storedFileId?: InputMaybe<UuidFilter>;
  uploadedAt?: InputMaybe<DateTimeFilter>;
  uploader?: InputMaybe<UserScalarRelationFilter>;
  uploaderId?: InputMaybe<UuidFilter>;
  usingItems?: InputMaybe<ItemListRelationFilter>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  menus?: Maybe<Array<Menu>>;
  name: Scalars['String']['output'];
  passwordHash: Scalars['String']['output'];
  refreshTokens?: Maybe<Array<RefreshToken>>;
  uploadedFiles?: Maybe<Array<UploadedFile>>;
};

export type UserCount = {
  __typename?: 'UserCount';
  menus: Scalars['Int']['output'];
  refreshTokens: Scalars['Int']['output'];
  uploadedFiles: Scalars['Int']['output'];
};

export type UserScalarRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  menus?: InputMaybe<MenuListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  passwordHash?: InputMaybe<StringFilter>;
  refreshTokens?: InputMaybe<RefreshTokenListRelationFilter>;
  uploadedFiles?: InputMaybe<UploadedFileListRelationFilter>;
};

export type UuidFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UuidNullableFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};
