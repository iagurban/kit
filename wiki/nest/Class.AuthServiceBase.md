# Abstract Class: AuthServiceBase\<DbUser, JWTPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:45](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L45)

Base class for implementing authentication service in NestJS applications.
Provides a complete JWT-based authentication flow with access and refresh tokens.

This service handles:
- User authentication with username/password
- JWT access token generation and validation
- Refresh token rotation with secure cookie storage
- User session management

## Type Parameters

### DbUser

`DbUser` *extends* `object`

User entity type that must contain 'id' and 'passwordHash' properties

### JWTPayload

`JWTPayload` *extends* `object`

JWT payload type that must contain a 'sub' property

## Constructors

### Constructor

```ts
protected new AuthServiceBase<DbUser, JWTPayload>(jwtService, refreshCookieOptions): AuthServiceBase<DbUser, JWTPayload>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:59](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L59)

Creates an instance of AuthServiceBase.

#### Parameters

##### jwtService

`JwtService`

NestJS JWT service for token operations

##### refreshCookieOptions

Configuration for refresh tokens

###### accessExpiresIn

`number`

Access token lifetime

###### cookieSecret

`string`

Secret for signing JWTs

###### refreshExpiresDays

`number`

Refresh token lifetime in days

#### Returns

`AuthServiceBase`\<`DbUser`, `JWTPayload`\>

## Properties

### jwtService {#jwtservice}

```ts
readonly jwtService: JwtService;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:60](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L60)

NestJS JWT service for token operations

***

### refreshCookieOptions {#refreshcookieoptions}

```ts
readonly refreshCookieOptions: object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:61](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L61)

Configuration for refresh tokens

#### accessExpiresIn

```ts
accessExpiresIn: number;
```

#### cookieSecret

```ts
cookieSecret: string;
```

#### refreshExpiresDays

```ts
refreshExpiresDays: number;
```

## Methods

### deleteRefreshToken() {#deleterefreshtoken}

```ts
abstract deleteRefreshToken(id): Promise<void>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:105](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L105)

Deletes a specific refresh token from storage.

#### Parameters

##### id

`string`

ID of the refresh token to delete

#### Returns

`Promise`\<`void`\>

***

### deleteRefreshTokensOfUser() {#deleterefreshtokensofuser}

```ts
abstract deleteRefreshTokensOfUser(userId): Promise<void>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:113](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L113)

Deletes all refresh tokens belonging to a specific user.
Used for logging out from all devices.

#### Parameters

##### userId

`string`

ID of the user whose tokens should be deleted

#### Returns

`Promise`\<`void`\>

***

### findByUsernameOrEmail() {#findbyusernameoremail}

```ts
abstract findByUsernameOrEmail(nameOrMail): Promise<DbUser & object | null>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:75](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L75)

Finds a user by their username or email address.
Used during the initial authentication process.

#### Parameters

##### nameOrMail

`string`

Username or email to search for

#### Returns

`Promise`\<`DbUser` & `object` \| `null`\>

The found user or null if not found

***

### findRefreshToken() {#findrefreshtoken}

```ts
abstract findRefreshToken(id): Promise<
  | {
  expiresAt: Date;
  hash: string;
  id: string;
  user: Omit<DbUser, "passwordHash">;
}
| null>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:93](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L93)

Retrieves a refresh token from storage by its ID.

#### Parameters

##### id

`string`

ID of the refresh token to find

#### Returns

`Promise`\<
  \| \{
  `expiresAt`: `Date`;
  `hash`: `string`;
  `id`: `string`;
  `user`: `Omit`\<`DbUser`, `"passwordHash"`\>;
\}
  \| `null`\>

***

### revokeAll() {#revokeall}

```ts
revokeAll(userId): Promise<void>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:187](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L187)

Revokes all refresh tokens for a user.

#### Parameters

##### userId

`DbUser`\[`"id"`\]

The ID of the user.

#### Returns

`Promise`\<`void`\>

***

### saveRefreshToken() {#saverefreshtoken}

```ts
abstract saveRefreshToken(
   userId, 
   hash, 
expiresAt): Promise<string>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:85](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L85)

Stores a new refresh token in the database.

#### Parameters

##### userId

`string`

ID of the user the token belongs to

##### hash

`string`

Hashed value of the refresh token

##### expiresAt

`Date`

Token expiration date

#### Returns

`Promise`\<`string`\>

ID of the stored refresh token

***

### userToPayload() {#usertopayload}

```ts
abstract userToPayload(user): JWTObject<JWTPayload>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:122](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/auth-service-base.ts#L122)

Converts a user object to a JWT payload.
Implementing classes should define how user data maps to token claims.

#### Parameters

##### user

`Omit`\<`DbUser`, `"passwordHash"`\>

User object without password hash

#### Returns

`JWTObject`\<`JWTPayload`\>

JWT payload object
