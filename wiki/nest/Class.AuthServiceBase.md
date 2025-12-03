# Abstract Class: AuthServiceBase\<DbUser, JWTPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:32](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L32)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:46](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L46)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:47](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L47)

NestJS JWT service for token operations

***

### refreshCookieOptions {#refreshcookieoptions}

```ts
readonly refreshCookieOptions: object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:48](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L48)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:92](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L92)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:100](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L100)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:62](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L62)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:80](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L80)

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

### saveRefreshToken() {#saverefreshtoken}

```ts
abstract saveRefreshToken(
   userId, 
   hash, 
expiresAt): Promise<string>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:72](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L72)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:109](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-service-base.ts#L109)

Converts a user object to a JWT payload.
Implementing classes should define how user data maps to token claims.

#### Parameters

##### user

`Omit`\<`DbUser`, `"passwordHash"`\>

User object without password hash

#### Returns

`JWTObject`\<`JWTPayload`\>

JWT payload object
