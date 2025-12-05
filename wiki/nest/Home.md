# @grbn/kit

## Classes

- [AuthControllerBase](Class.AuthControllerBase.md)
- [AuthServiceBase](Class.AuthServiceBase.md)
- [ContextualCurrentUserInterceptorBase](Class.ContextualCurrentUserInterceptorBase.md)
- [GqlJwtAuthGuardBase](Class.GqlJwtAuthGuardBase.md)
- [JwtStrategyBase](Class.JwtStrategyBase.md)
- [LocalStrategyBase](Class.LocalStrategyBase.md)
- [OidcAuthControllerBase](Class.OidcAuthControllerBase.md)
- [OidcJwtStrategyBase](Class.OidcJwtStrategyBase.md)
- [ServerTimestampInterceptorBase](Class.ServerTimestampInterceptorBase.md)
- [ServerTimestampMetaInterceptor](Class.ServerTimestampMetaInterceptor.md)
- [ServerTimestampPreciseInterceptor](Class.ServerTimestampPreciseInterceptor.md)
- [ServiceInfo](Class.ServiceInfo.md)

## Interfaces

- [GqlSelectionDataLoaderContext](Interface.GqlSelectionDataLoaderContext.md)
- [UniversalSelection](Interface.UniversalSelection.md)

## Type Aliases

- [CachedSelection](TypeAlias.CachedSelection.md)
- [DynamicModuleFabric](TypeAlias.DynamicModuleFabric.md)
- [SelectionDataLoaderProvider](TypeAlias.SelectionDataLoaderProvider.md)
- [UniversalSelectionArgs](TypeAlias.UniversalSelectionArgs.md)

## Variables

- [CurrentUserBase](Variable.CurrentUserBase.md)
- [GetUniversalSelection](Variable.GetUniversalSelection.md)
- [InjectSelectionDataLoader](Variable.InjectSelectionDataLoader.md)
- [PrismaSelection](Variable.PrismaSelection.md)
- [TryCurrentUserBase](Variable.TryCurrentUserBase.md)

## Functions

- [createSelectionDataLoaderProvider](Function.createSelectionDataLoaderProvider.md)
- [getCurrentUserFromExeContext](Function.getCurrentUserFromExeContext.md)
- [getPrismaSelectionFromInfo](Function.getPrismaSelectionFromInfo.md)
- [getUniversalSelectionFromInfo](Function.getUniversalSelectionFromInfo.md)
- [prismaSelectionFromGqlExecutionCtx](Function.prismaSelectionFromGqlExecutionCtx.md)
- [stringifyUniversalSelection](Function.stringifyUniversalSelection.md)


# Class: AuthControllerBase\<User, CurrentUserJwtPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:32](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-controller-base.ts#L32)

Base controller class that implements JWT-based authentication flow with access and refresh tokens.
Uses bearer tokens for access authorization and HTTP-only cookies for refresh tokens.

This class provides endpoints for login, logout, and token refresh operations.
Currently supports local authentication strategy.

Recommended usage is composition over inheritance - create an instance inside your controller
rather than extending this class.

## Example

```typescript
@Controller('auth')
export class AuthController {
  private authController: AuthControllerBase<User, JwtPayload>;

  constructor(private authService: AuthService) {
    this.authController = new AuthControllerBase(authService);
  }
}
```

## Type Parameters

### User `User` *extends* `object`

User entity type that must contain 'id' and 'passwordHash' properties

### CurrentUserJwtPayload `CurrentUserJwtPayload` *extends* `object`

JWT payload type that must contain a 'sub' property

## Methods

### login() {#login}

```ts
login(
   login, 
   password, 
res): Promise<string>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:71](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-controller-base.ts#L71)

Authenticates user credentials and creates new session.
Sets refresh token in cookies and returns access token.

#### Parameters

##### login `string`

User login (username or email)

##### password `string`

User password

##### res `Response`

Express response object for setting refresh token cookie

#### Returns `Promise`\<`string`\>

Access token for authenticated user

#### Throws

If credentials are invalid

***

### logout() {#logout}

```ts
logout(req, res): Promise<boolean>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:87](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-controller-base.ts#L87)

Ends the user session by invalidating refresh token and clearing cookies.
If refresh token exists, it will be invalidated on the server.

#### Parameters

##### req `Request`

Express request object containing refresh token in cookies

##### res `Response`

Express response object for clearing refresh token cookie

#### Returns `Promise`\<`boolean`\>

True if logout was successful

***

### refresh() {#refresh}

```ts
refresh(req, res): Promise<Response<any, Record<string, any>>>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:47](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-controller-base.ts#L47)

Refreshes the access token using a refresh token from cookies.
Issues new refresh token and returns new access token.

#### Parameters

##### req `Request`

Express request object containing refresh token in cookies

##### res `Response`

Express response object for setting new refresh token cookie

#### Returns `Promise`\<`Response`\<`any`, `Record`\<`string`, `any`\>\>\>

New access token in JSON format

#### Throws

If refresh token is missing in cookies


# Abstract Class: AuthServiceBase\<DbUser, JWTPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:46](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L46)

Base class for implementing authentication service in NestJS applications.
Provides a complete JWT-based authentication flow with access and refresh tokens.

This service handles:
- User authentication with username/password
- JWT access token generation and validation
- Refresh token rotation with secure cookie storage
- User session management

## Type Parameters

### DbUser `DbUser` *extends* `object`

User entity type that must contain 'id' and 'passwordHash' properties

### JWTPayload `JWTPayload` *extends* `object`

JWT payload type that must contain a 'sub' property

## Constructors

### Constructor

```ts
protected new AuthServiceBase<DbUser, JWTPayload>(jwtService, refreshCookieOptions): AuthServiceBase<DbUser, JWTPayload>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:60](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L60)

Creates an instance of AuthServiceBase.

#### Parameters

##### jwtService `JwtService`

NestJS JWT service for token operations

##### refreshCookieOptions

Configuration for refresh tokens

###### accessExpiresIn `number`

Access token lifetime

###### cookieSecret `string`

Secret for signing JWTs

###### refreshExpiresDays `number`

Refresh token lifetime in days

#### Returns `AuthServiceBase`\<`DbUser`, `JWTPayload`\>

## Properties

### jwtService {#jwtservice}

```ts
readonly jwtService: JwtService;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:61](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L61)

NestJS JWT service for token operations

***

### refreshCookieOptions {#refreshcookieoptions}

```ts
readonly refreshCookieOptions: object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:62](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L62)

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:106](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L106)

Deletes a specific refresh token from storage.

#### Parameters

##### id `string`

ID of the refresh token to delete

#### Returns `Promise`\<`void`\>

***

### deleteRefreshTokensOfUser() {#deleterefreshtokensofuser}

```ts
abstract deleteRefreshTokensOfUser(userId): Promise<void>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:114](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L114)

Deletes all refresh tokens belonging to a specific user.
Used for logging out from all devices.

#### Parameters

##### userId `string`

ID of the user whose tokens should be deleted

#### Returns `Promise`\<`void`\>

***

### findByUsernameOrEmail() {#findbyusernameoremail}

```ts
abstract findByUsernameOrEmail(nameOrMail): Promise<DbUser & object | null>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:76](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L76)

Finds a user by their username or email address.
Used during the initial authentication process.

#### Parameters

##### nameOrMail `string`

Username or email to search for

#### Returns `Promise`\<`DbUser` & `object` \| `null`\>

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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:94](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L94)

Retrieves a refresh token from storage by its ID.

#### Parameters

##### id `string`

ID of the refresh token to find

#### Returns `Promise`\<
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

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:188](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L188)

Revokes all refresh tokens for a user.

#### Parameters

##### userId `DbUser`\[`"id"`\]

The ID of the user.

#### Returns `Promise`\<`void`\>

***

### saveRefreshToken() {#saverefreshtoken}

```ts
abstract saveRefreshToken(
   userId, 
   hash, 
expiresAt): Promise<string>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:86](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L86)

Stores a new refresh token in the database.

#### Parameters

##### userId `string`

ID of the user the token belongs to

##### hash `string`

Hashed value of the refresh token

##### expiresAt `Date`

Token expiration date

#### Returns `Promise`\<`string`\>

ID of the stored refresh token

***

### userToPayload() {#usertopayload}

```ts
abstract userToPayload(user): JWTObject<JWTPayload>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-service-base.ts:123](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/auth-service-base.ts#L123)

Converts a user object to a JWT payload.
Implementing classes should define how user data maps to token claims.

#### Parameters

##### user `Omit`\<`DbUser`, `"passwordHash"`\>

User object without password hash

#### Returns `JWTObject`\<`JWTPayload`\>

JWT payload object


# Abstract Class: ContextualCurrentUserInterceptorBase\<CurrentUser\>

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/contextual-current-user.interceptor-base.ts:32](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/contextual-current-user.interceptor-base.ts#L32)

Base class for implementing Nest interceptors that manage user context in AsyncLocalStorage.

This interceptor extracts the current user from the execution context and stores it in an
AsyncLocalStorage instance specific to the implementing class. This enables access to the
current user throughout the request lifecycle without passing it explicitly through parameters.

## Example

```typescript
@Injectable()
class UserContextInterceptor extends ContextualCurrentUserInterceptorBase<User> {
  private static storage = new AsyncLocalStorage<User>();

  getStorage() {
    return UserContextInterceptor.storage;
  }
}
```

## Implements

## Type Parameters

### CurrentUser `CurrentUser`

The type representing the user data to be stored in AsyncLocalStorage

## Implements

- `NestInterceptor`

## Methods

### getStorage() {#getstorage}

```ts
abstract getStorage(): AsyncLocalStorage<CurrentUser>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/contextual-current-user.interceptor-base.ts:39](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/contextual-current-user.interceptor-base.ts#L39)

Abstract method that must be implemented by subclasses to provide the AsyncLocalStorage
instance where the current user data should be stored.

#### Returns `AsyncLocalStorage`\<`CurrentUser`\>

The storage instance for the current user

***

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/contextual-current-user.interceptor-base.ts:41](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/contextual-current-user.interceptor-base.ts#L41)

Method to implement a custom interceptor.

#### Parameters

##### context `ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next `CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns `Observable`\<`unknown`\>

#### Implementation of

```ts
NestInterceptor.intercept
```


# Class: GqlJwtAuthGuardBase

Defined in: [IdeaProjects/kit/kit/src/nest/guards/gql-jwt-auth-guard-base.ts:8](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/guards/gql-jwt-auth-guard-base.ts#L8)

A JWT authentication guard for GraphQL requests.

## Extends

- `IAuthGuard`

## Properties

### name {#name}

```ts
readonly static name: string;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es2015.core.d.ts:97

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

```ts
AuthGuard('jwt').name
```

## Methods

### canActivate() {#canactivate}

```ts
canActivate(context): boolean | Promise<boolean> | Observable<boolean>;
```

Defined in: IdeaProjects/kit/kit/.yarn/\_\_virtual\_\_/@nestjs-common-virtual-c83844d05c/4/.yarn/berry/cache/@nestjs-common-npm-11.1.9-c5d2997654-10c0.zip/node\_modules/@nestjs/common/interfaces/features/can-activate.interface.d.ts:21

#### Parameters

##### context `ExecutionContext`

Current execution context. Provides access to details about
the current request pipeline.

#### Returns `boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

Value indicating whether or not the current request is allowed to
proceed.

#### Inherited from

```ts
AuthGuard('jwt').canActivate
```

***

### getRequest() {#getrequest}

```ts
getRequest(context): any;
```

Defined in: [IdeaProjects/kit/kit/src/nest/guards/gql-jwt-auth-guard-base.ts:14](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/guards/gql-jwt-auth-guard-base.ts#L14)

Gets the request object from the execution context.

#### Parameters

##### context `ExecutionContext`

The execution context.

#### Returns `any`

The request object.

#### Overrides

```ts
AuthGuard('jwt').getRequest
```

***

### \[hasInstance\]() {#hasinstance}

```ts
static hasInstance: boolean;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

##### value `any`

#### Returns `boolean`

#### Inherited from

```ts
AuthGuard('jwt').[hasInstance]
```

***

### apply() {#apply}

```ts
static apply(
   this, 
   thisArg, 
   argArray?): any;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

##### this `Function`

##### thisArg `any`

The object to be used as the this object.

##### argArray? `any`

A set of arguments to be passed to the function.

#### Returns `any`

#### Inherited from

```ts
AuthGuard('jwt').apply
```

***

### bind() {#bind}

```ts
static bind(
   this, 
   thisArg, ...
   argArray): any;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

##### this `Function`

##### thisArg `any`

An object to which the this keyword can refer inside the new function.

##### argArray

...`any`[]

A list of arguments to be passed to the new function.

#### Returns `any`

#### Inherited from

```ts
AuthGuard('jwt').bind
```

***

### call() {#call}

```ts
static call(
   this, 
   thisArg, ...
   argArray): any;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

#### Parameters

##### this `Function`

##### thisArg `any`

The object to be used as the current object.

##### argArray

...`any`[]

A list of arguments to be passed to the method.

#### Returns `any`

#### Inherited from

```ts
AuthGuard('jwt').call
```

***

### toString() {#tostring}

```ts
static toString(): string;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

#### Returns `string`

#### Inherited from

```ts
AuthGuard('jwt').toString
```


# Abstract Class: JwtStrategyBase\<User, CurrentUserJwtPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/jwt-strategy-base.ts:33](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/passport-strategies/jwt-strategy-base.ts#L33)

Base class for implementing Passport JWT authentication strategy in NestJS applications.
Provides the basic JWT authentication configuration and validation flow.

This class automatically configures JWT extraction from Bearer tokens and handles token validation.
Implementing classes only need to define the conversion from JWT payload to user object.

## Example

```typescript
@Injectable()
class CustomJwtStrategy extends JwtStrategyBase<UserType, JwtPayloadType> {
  constructor(configService: ConfigService) {
    super(configService.jwtSecret);
  }

  async convert(payload: JwtPayloadType): Promise<UserType> {
    return {
      id: payload.sub,
      // ... other user properties
    };
  }
}
```

## Extends

- `Strategy`\<`this`\> & `PassportStrategyMixin`\<`unknown`, `this`\>

## Type Parameters

### User `User` *extends* `object`

The user entity type that must contain at least an 'id' property

### CurrentUserJwtPayload `CurrentUserJwtPayload` *extends* `object`

The JWT payload type that must contain at least a 'sub' property

## Methods

### authenticate() {#authenticate}

```ts
authenticate(req, options?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:20

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

#### Parameters

##### req `Request`

The request to authenticate.

##### options? `any`

Options passed to the strategy.

#### Returns `void`

#### Inherited from

```ts
PassportStrategy(Strategy).authenticate
```

***

### convert() {#convert}

```ts
abstract convert(payload): Promise<User>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/jwt-strategy-base.ts:44](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/passport-strategies/jwt-strategy-base.ts#L44)

Abstract method to convert JWT payload into a user object.
Must be implemented by derived classes to define how the JWT payload maps to a user.

#### Parameters

##### payload `CurrentUserJwtPayload`

The decoded JWT payload

#### Returns `Promise`\<`User`\>

A promise that resolves to the user object

***

### error() {#error}

```ts
error(err): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:90

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

#### Parameters

##### err `Error`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).error
```

***

### fail() {#fail}

#### Call Signature

```ts
fail(challenge, status): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:54

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### challenge `any`

(Can also be an object with 'message' and 'type' fields).

###### status `number`

##### Returns `void`

##### Api

public

##### Inherited from

```ts
PassportStrategy(Strategy).fail
```

#### Call Signature

```ts
fail(status): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:55

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### status `number`

##### Returns `void`

##### Api

public

##### Inherited from

```ts
PassportStrategy(Strategy).fail
```

***

### pass() {#pass}

```ts
pass(): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:78

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function.  It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).pass
```

***

### redirect() {#redirect}

```ts
redirect(url, status?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:67

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

#### Parameters

##### url `string`

##### status? `number`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).redirect
```

***

### success() {#success}

```ts
success(user, info?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:42

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user.  `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials.  `info` is an
optional argument containing additional user information.  This is
useful for third-party authentication strategies to pass profile
details.

#### Parameters

##### user `any`

##### info? `any`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).success
```


# Abstract Class: LocalStrategyBase\<User, CurrentUserJwtPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/local-strategy-base.ts:36](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/passport-strategies/local-strategy-base.ts#L36)

Base class for implementing Passport Local authentication strategy in NestJS applications.
Provides username/password authentication integration with Passport.js.

To use this class:
1. Import AuthModule in your module
2. Create a strategy class that extends this base class
3. Inject AuthService implementation in the constructor
4. Implement getAuthService() to return the injected service

## Example

```typescript
@Injectable()
class LocalStrategy extends LocalStrategyBase<UserType, JwtPayloadType> {
  constructor(private authService: AuthService) {
    super();
  }

  getAuthService() {
    return this.authService;
  }
}
```

## Extends

- `Strategy`\<`this`\> & `PassportStrategyMixin`\<`unknown`, `this`\>

## Type Parameters

### User `User` *extends* `object`

User entity type that must contain 'id' and 'passwordHash' properties

### CurrentUserJwtPayload `CurrentUserJwtPayload` *extends* `object`

JWT payload type that must contain a 'sub' property

## Methods

### authenticate() {#authenticate}

```ts
authenticate(req, options?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:20

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

#### Parameters

##### req `Request`

The request to authenticate.

##### options? `any`

Options passed to the strategy.

#### Returns `void`

#### Inherited from

```ts
PassportStrategy(Strategy).authenticate
```

***

### error() {#error}

```ts
error(err): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:90

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

#### Parameters

##### err `Error`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).error
```

***

### fail() {#fail}

#### Call Signature

```ts
fail(challenge, status): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:54

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### challenge `any`

(Can also be an object with 'message' and 'type' fields).

###### status `number`

##### Returns `void`

##### Api

public

##### Inherited from

```ts
PassportStrategy(Strategy).fail
```

#### Call Signature

```ts
fail(status): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:55

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### status `number`

##### Returns `void`

##### Api

public

##### Inherited from

```ts
PassportStrategy(Strategy).fail
```

***

### getAuthService() {#getauthservice}

```ts
abstract getAuthService(): AuthServiceBase<User, CurrentUserJwtPayload>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/local-strategy-base.ts:49](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/passport-strategies/local-strategy-base.ts#L49)

Abstract method that must return an authentication service instance.
The service must extend AuthServiceBase and implement user validation logic.

#### Returns

[`AuthServiceBase`](Class.AuthServiceBase.md)\<`User`, `CurrentUserJwtPayload`\>

An authentication service instance
that can validate users with username/password credentials

***

### pass() {#pass}

```ts
pass(): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:78

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function.  It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).pass
```

***

### redirect() {#redirect}

```ts
redirect(url, status?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:67

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

#### Parameters

##### url `string`

##### status? `number`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).redirect
```

***

### success() {#success}

```ts
success(user, info?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:42

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user.  `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials.  `info` is an
optional argument containing additional user information.  This is
useful for third-party authentication strategies to pass profile
details.

#### Parameters

##### user `any`

##### info? `any`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).success
```


# Abstract Class: OidcAuthControllerBase

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:16](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/oidc-auth-controller.base.ts#L16)

Abstract base class for a controller that manages the OIDC Authorization Code Flow.
It provides endpoints to initiate login and logout by redirecting the user
to the third-party identity provider.

This is primarily intended for server-side applications. For SPAs, the
frontend typically handles this flow.

## Methods

### exchangeCodeForTokens() {#exchangecodefortokens}

```ts
abstract exchangeCodeForTokens(code): Promise<OidcTokens>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:60](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/oidc-auth-controller.base.ts#L60)

Exchanges an authorization code for OIDC tokens.
This method contains the provider-specific logic for the token endpoint.

#### Parameters

##### code `string`

The authorization code from the callback URL.

#### Returns `Promise`\<`OidcTokens`\>

A promise that resolves to the OIDC tokens.

***

### getAuthorizationUrl() {#getauthorizationurl}

```ts
abstract protected getAuthorizationUrl(): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:23](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/oidc-auth-controller.base.ts#L23)

Constructs the full authorization URL to which the user should be redirected
to start the login process.

#### Returns `string`

The complete URL for the IdP's authorization endpoint with necessary query parameters.

***

### getLogoutUrl() {#getlogouturl}

```ts
abstract protected getLogoutUrl(): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:33](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/oidc-auth-controller.base.ts#L33)

Constructs the full logout URL to which the user should be redirected
to end their session on the identity provider.

#### Returns `string`

The complete URL for the IdP's end-session endpoint.


# Abstract Class: OidcJwtStrategyBase\<TUser, TPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-jwt-strategy.base.ts:25](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/oidc-jwt-strategy.base.ts#L25)

Abstract base class for a Passport JWT strategy that validates tokens from an
OIDC-compliant third-party identity provider (e.g., Keycloak, Auth0).

It automates the process of fetching the public signing key from the provider's
JWKS (JSON Web Key Set) endpoint.

## Extends

- `Strategy`\<`this`\> & `PassportStrategyMixin`\<`unknown`, `this`\>

## Type Parameters

### TUser `TUser` *extends* `object`

The application-specific user object type.

### TPayload `TPayload` *extends* `object`

The expected type of the JWT payload from the IdP.

## Methods

### authenticate() {#authenticate}

```ts
authenticate(req, options?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:20

Performs authentication for the request.
Note: Virtual function - re-implement in the strategy.

#### Parameters

##### req `Request`

The request to authenticate.

##### options? `any`

Options passed to the strategy.

#### Returns `void`

#### Inherited from

```ts
PassportStrategy(Strategy, 'jwt').authenticate
```

***

### convertPayloadToUser() {#convertpayloadtouser}

```ts
abstract convertPayloadToUser(payload): Promise<TUser>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-jwt-strategy.base.ts:38](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/oidc-jwt-strategy.base.ts#L38)

Converts the validated JWT payload from the IdP into your application's
internal user representation. This is where you map claims to user properties.

#### Parameters

##### payload `TPayload`

The validated JWT payload.

#### Returns `Promise`\<`TUser`\>

A promise that resolves to the application user object.

***

### error() {#error}

```ts
error(err): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:90

Internal error while performing authentication.

Strategies should call this function when an internal error occurs
during the process of performing authentication; for example, if the
user directory is not available.

#### Parameters

##### err `Error`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy, 'jwt').error
```

***

### fail() {#fail}

#### Call Signature

```ts
fail(challenge, status): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:54

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### challenge `any`

(Can also be an object with 'message' and 'type' fields).

###### status `number`

##### Returns `void`

##### Api

public

##### Inherited from

```ts
PassportStrategy(Strategy, 'jwt').fail
```

#### Call Signature

```ts
fail(status): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:55

Fail authentication, with optional `challenge` and `status`, defaulting
to 401.

Strategies should call this function to fail an authentication attempt.

##### Parameters

###### status `number`

##### Returns `void`

##### Api

public

##### Inherited from

```ts
PassportStrategy(Strategy, 'jwt').fail
```

***

### pass() {#pass}

```ts
pass(): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:78

Pass without making a success or fail decision.

Under most circumstances, Strategies should not need to call this
function.  It exists primarily to allow previous authentication state
to be restored, for example from an HTTP session.

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy, 'jwt').pass
```

***

### redirect() {#redirect}

```ts
redirect(url, status?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:67

Redirect to `url` with optional `status`, defaulting to 302.

Strategies should call this function to redirect the user (via their
user agent) to a third-party website for authentication.

#### Parameters

##### url `string`

##### status? `number`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy, 'jwt').redirect
```

***

### success() {#success}

```ts
success(user, info?): void;
```

Defined in: .yarn/berry/cache/@types-passport-strategy-npm-0.2.38-6460f7e728-10c0.zip/node\_modules/@types/passport-strategy/index.d.ts:42

Authenticate `user`, with optional `info`.

Strategies should call this function to successfully authenticate a
user.  `user` should be an object supplied by the application after it
has been given an opportunity to verify credentials.  `info` is an
optional argument containing additional user information.  This is
useful for third-party authentication strategies to pass profile
details.

#### Parameters

##### user `any`

##### info? `any`

#### Returns `void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy, 'jwt').success
```

***

### validate() {#validate}

```ts
validate(payload): Promise<TUser>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-jwt-strategy.base.ts:62](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/oidc-jwt-strategy.base.ts#L62)

Passport's validation method. It receives the payload after the signature
and claims (`iss`, `aud`, `exp`) have been verified.

This method delegates the payload-to-user conversion to the abstract
`convertPayloadToUser` method.

#### Parameters

##### payload `TPayload`

#### Returns `Promise`\<`TUser`\>

#### Overrides

```ts
PassportStrategy(Strategy, 'jwt').validate
```


# Abstract Class: ServerTimestampInterceptorBase\<Intermediate, Result\>

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:33](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L33)

Base interceptor class for adding server-side timestamp information to request processing.
Tracks request timing by adding timestamps at entry and exit points of NestJS request pipeline.

Can be used to:
- Measure request processing time
- Add timing metadata to responses
- Server time offset detection on clients

## Implements

## Example

```typescript
class TimingInterceptor extends ServerTimestampInterceptorBase<
  { data: Record<string, string>; entryTime: number },
  { data: Record<string, string>; entryTime: number; exitTime: number }
> {
  prepare(t1: number, data: Record<string, string>) {
    return { data, entryTime: t1 };
  }

  update(o: { data: any; entryTime: number }) {
    return { ...o, exitTime: Date.now() };
  }
}
```

## Extended by

- [`ServerTimestampMetaInterceptor`](Class.ServerTimestampMetaInterceptor.md)
- [`ServerTimestampPreciseInterceptor`](Class.ServerTimestampPreciseInterceptor.md)

## Type Parameters

### Intermediate `Intermediate`

Type for intermediate data structure between prepare and update steps

### Result `Result`

Final type of the processed response

## Implements

- `NestInterceptor`

## Methods

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:89](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L89)

Method to implement a custom interceptor.

#### Parameters

##### context `ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next `CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns `Observable`\<`unknown`\>

#### Implementation of

```ts
NestInterceptor.intercept
```

***

### prepare() {#prepare}

```ts
abstract prepare(t1, data): Intermediate;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:60](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L60)

Prepares intermediate data structure by combining request entry timestamp with response data.
Called immediately after receiving response from route handler.

#### Parameters

##### t1 `number`

Timestamp when request entered NestJS pipeline (milliseconds since epoch)

##### data `Record`\<`string`, `string`\>

Response data from route handler

#### Returns `Intermediate`

Combined data structure for further processing

#### Example

```typescript
// Example #1: Return object with data and entry timestamp
prepare(t1: number, data: Record<string, string>) {
  return { data, t1 };
}

// Example #2: Return string prefix with entry timestamp
prepare(t1: number) {
  return t1.toString() + ':'; // ignore data for precision
}

// Example #3: Return object with data and entry timestamp in addition meta
prepare(t1: number, data: Record<string, string>) {
  return { ...data, __timeMetadata: {t1} };
}
```

***

### update() {#update}

```ts
abstract update(o): Result;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:87](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L87)

Updates intermediate data with exit timestamp just before sending response.
Called at the last possible moment before response is sent to client.

#### Parameters

##### o `Intermediate`

Intermediate data structure from prepare step

#### Returns `Result`

Final response data with timing information

#### Example

```typescript
// Example #1: Add exit timestamp to object
update(o: { data: any; t1: number }) {
  return { ...o, t2: Date.now() }; // result: {data, t1, t2}
}

// Example #2: Append exit timestamp to string
update(o: string) {
  return o + Date.now().toString(); // result: `${t1}:${t2}`
}

// Example #3: Add exit timestamp to object metadata
update(o: { data: any; t1: number }) {
  return { ...o, __timeMetadata: { ...o.__timeMetadata, t2: Date.now() }}; // result: {...data, __timeMetadata: {t1, t2}}
}
```


# Class: ServerTimestampMetaInterceptor

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts:31](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts#L31)

An interceptor that injects server-side request timestamps into the response body.

This interceptor extends `ServerTimestampInterceptorBase` to add a `__sync` object
to the JSON response. The original data from the route handler is merged at the
top level of the response body.

The `__sync` object contains:
- `t1`: The timestamp (in milliseconds since epoch) when the request entered the NestJS pipeline.
- `t2`: The timestamp (in milliseconds since epoch) just before the response is sent.

This is particularly useful for client-side applications that need to calculate the
server time offset or measure the exact request processing duration.

## Example

```ts
// If the route handler returns: { "message": "hello" }
// The final response body will be:
{
  "message": "hello",
  "__sync": {
    "t1": 1672531200000,
    "t2": 1672531200100
  }
}
```

## Extends

- [`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md)\<\{
  `__sync`: \{
     `t1`: `number`;
  \};
\}, \{
  `__sync`: \{
     `t1`: `number`;
     `t2`: `number`;
  \};
\}\>

## Methods

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:89](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L89)

Method to implement a custom interceptor.

#### Parameters

##### context `ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next `CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns `Observable`\<`unknown`\>

#### Inherited from

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`intercept`](Class.ServerTimestampInterceptorBase.md#intercept)

***

### prepare() {#prepare}

```ts
prepare(t1, data): object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts:35](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts#L35)

Prepares intermediate data structure by combining request entry timestamp with response data.
Called immediately after receiving response from route handler.

#### Parameters

##### t1 `number`

Timestamp when request entered NestJS pipeline (milliseconds since epoch)

##### data `Record`\<`string`, `string`\>

Response data from route handler

#### Returns `object`

Combined data structure for further processing

##### \_\_sync

```ts
__sync: object;
```

###### \_\_sync.t1

```ts
t1: number;
```

#### Example

```typescript
// Example #1: Return object with data and entry timestamp
prepare(t1: number, data: Record<string, string>) {
  return { data, t1 };
}

// Example #2: Return string prefix with entry timestamp
prepare(t1: number) {
  return t1.toString() + ':'; // ignore data for precision
}

// Example #3: Return object with data and entry timestamp in addition meta
prepare(t1: number, data: Record<string, string>) {
  return { ...data, __timeMetadata: {t1} };
}
```

#### Overrides

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`prepare`](Class.ServerTimestampInterceptorBase.md#prepare)

***

### update() {#update}

```ts
update(o): object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts:39](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts#L39)

Updates intermediate data with exit timestamp just before sending response.
Called at the last possible moment before response is sent to client.

#### Parameters

##### o

Intermediate data structure from prepare step

###### __sync

\{
  `t1`: `number`;
\}

###### __sync.t1 `number`

#### Returns `object`

Final response data with timing information

##### \_\_sync

```ts
__sync: object;
```

###### \_\_sync.t1

```ts
t1: number;
```

###### \_\_sync.t2

```ts
t2: number;
```

#### Example

```typescript
// Example #1: Add exit timestamp to object
update(o: { data: any; t1: number }) {
  return { ...o, t2: Date.now() }; // result: {data, t1, t2}
}

// Example #2: Append exit timestamp to string
update(o: string) {
  return o + Date.now().toString(); // result: `${t1}:${t2}`
}

// Example #3: Add exit timestamp to object metadata
update(o: { data: any; t1: number }) {
  return { ...o, __timeMetadata: { ...o.__timeMetadata, t2: Date.now() }}; // result: {...data, __timeMetadata: {t1, t2}}
}
```

#### Overrides

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`update`](Class.ServerTimestampInterceptorBase.md#update)


# Class: ServerTimestampPreciseInterceptor

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts:23](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts#L23)

An interceptor that replaces the entire response body with a string containing server-side request timestamps.

## Warning

This interceptor completely ignores and discards the data returned from the route handler.
The response body will *always* be a string in the format "t1:t2".

The returned string contains:
- `t1`: The timestamp (in milliseconds since epoch) when the request entered the NestJS pipeline.
- `t2`: The timestamp (in milliseconds since epoch) just before the response is sent.

This interceptor is designed for use cases where only the precise server-side timing is required,
such as client-side time synchronization, and the original response data is not needed.

## Example

```ts
// Regardless of what the route handler returns, the final response body will be a string like:
// "1672531200000:1672531200100"
```

## Extends

- [`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md)\<`string`, `string`\>

## Methods

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:89](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L89)

Method to implement a custom interceptor.

#### Parameters

##### context `ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next `CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns `Observable`\<`unknown`\>

#### Inherited from

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`intercept`](Class.ServerTimestampInterceptorBase.md#intercept)

***

### prepare() {#prepare}

```ts
prepare(t1): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts:24](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts#L24)

Prepares intermediate data structure by combining request entry timestamp with response data.
Called immediately after receiving response from route handler.

#### Parameters

##### t1 `number`

Timestamp when request entered NestJS pipeline (milliseconds since epoch)

#### Returns `string`

Combined data structure for further processing

#### Example

```typescript
// Example #1: Return object with data and entry timestamp
prepare(t1: number, data: Record<string, string>) {
  return { data, t1 };
}

// Example #2: Return string prefix with entry timestamp
prepare(t1: number) {
  return t1.toString() + ':'; // ignore data for precision
}

// Example #3: Return object with data and entry timestamp in addition meta
prepare(t1: number, data: Record<string, string>) {
  return { ...data, __timeMetadata: {t1} };
}
```

#### Overrides

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`prepare`](Class.ServerTimestampInterceptorBase.md#prepare)

***

### update() {#update}

```ts
update(o): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts:28](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts#L28)

Updates intermediate data with exit timestamp just before sending response.
Called at the last possible moment before response is sent to client.

#### Parameters

##### o `string`

Intermediate data structure from prepare step

#### Returns `string`

Final response data with timing information

#### Example

```typescript
// Example #1: Add exit timestamp to object
update(o: { data: any; t1: number }) {
  return { ...o, t2: Date.now() }; // result: {data, t1, t2}
}

// Example #2: Append exit timestamp to string
update(o: string) {
  return o + Date.now().toString(); // result: `${t1}:${t2}`
}

// Example #3: Add exit timestamp to object metadata
update(o: { data: any; t1: number }) {
  return { ...o, __timeMetadata: { ...o.__timeMetadata, t2: Date.now() }}; // result: {...data, __timeMetadata: {t1, t2}}
}
```

#### Overrides

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`update`](Class.ServerTimestampInterceptorBase.md#update)


# Class: ServiceInfo

Defined in: [IdeaProjects/kit/kit/src/nest/service-info.ts:21](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/service-info.ts#L21)

Represents service information, including its name, optional short name,
and a uniquely generated client name.

This class is designed to be used for dependency injection in applications
that use dependency injection frameworks.

It provides a factory method for generating a provider to inject an instance
of the ServiceInfo class with the specified parameters.

The `clientName` is automatically generated by combining the name of the service
with a random hexadecimal identifier to ensure uniqueness.

The constructor is protected, ensuring that this class cannot be directly instantiated
but is only accessible through the provided factory method.


# Function: createSelectionDataLoaderProvider()

```ts
function createSelectionDataLoaderProvider<TKey, TData>(fetch): SelectionDataLoaderProvider<TKey, TData>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader-provider.ts:111](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader-provider.ts#L111)

Creates a provider for selection-aware DataLoader instances.
This allows for efficient, batched, and cached data loading in GraphQL resolvers,
where the loaded fields are determined by the GraphQL query selection.

The created provider should be used within the `httpContext` of `GraphqlSubgraphModule`.
It's designed to work with `createSelectionDataLoaderCacheInterceptor` and the `@InjectSelectionDataLoader` decorator.

## Type Parameters

### TKey `TKey`

### TData `TData`

## Parameters

### fetch

(`selection`) => (`keys`) => `Promise`\<readonly `TData`[]\>

A function that takes a `UniversalSelection` and returns a DataLoader-compatible batch load function.

## Returns

[`SelectionDataLoaderProvider`](TypeAlias.SelectionDataLoaderProvider.md)\<`TKey`, `TData`\>

## Example

```ts
// 1. First, create a factory for your data loader provider.
// This factory will be injected into your GraphQL module configuration.

import { Injectable, Module } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ExMap } from '@grbn/kit';
import { notNull } from '@grbn/kit/data';
import { universalSelectionToPrisma } from '@grbn/db/prisma';
import {
  createSelectionDataLoaderProvider,
  createSelectionDataLoaderCacheInterceptor,
  InjectSelectionDataLoader,
  DataLoaderInstance,
  GraphqlSubgraphModule,
} from '@poslah/util'; // Assuming types and this function are exported
import { User } from './user.model';
import { UsersService } from './users.service';

// @Injectable()
// export class UsersService {
//   getUsers(args: any, select: Prisma.UserSelect): Promise<User[]> { ... }
// }

@Injectable()
export class UserSelectionDataLoaderProviderFactory {
  constructor(private usersService: UsersService) {}

  public createProvider() {
    // This cache is unique FOR EACH REQUEST
    return createSelectionDataLoaderProvider<string, User>(selection => async keys => {
      const byId = ExMap.mappedBy(
        await this.usersService.getUsers(
          { id: { in: [...keys] } },
          universalSelectionToPrisma(selection) as Prisma.UserSelect
        ),
        u => u.id
      );
      return keys.map(id => notNull(byId.get(id)));
    });
  }
}

// 2. Create a module to provide and export the factory.

@Module({
  providers: [UsersService, UserSelectionDataLoaderProviderFactory],
  exports: [UserSelectionDataLoaderProviderFactory],
})
export class UserSelectionDataLoaderProviderFactoryModule {}

// 3. Configure GraphqlSubgraphModule to use the provider factory.
// The `httpContext` will create a new set of providers for each request.

GraphqlSubgraphModule.forRootAsync(buildInfo.buildTime, {
  addImports: [UserSelectionDataLoaderProviderFactoryModule],
  addInject: [UserSelectionDataLoaderProviderFactory],
  httpContext: (usersLoaderFactory: UserSelectionDataLoaderProviderFactory) => ({
    selectionDataLoaderProviders: {
      User: usersLoaderFactory.createProvider(), // 'User' is the key for this loader
    },
  }),
});

// 4. Create an interceptor to cache the selection set for the data loader.

export const UserSelectionDataLoaderCacheInterceptor = createSelectionDataLoaderCacheInterceptor({
  check: (path, field) => field.name.value !== `__typename`,
  postProcess: selection => {
    selection.id = true; // Ensure 'id' is always selected for caching keys
  },
});

// 5. Use the interceptor and inject the data loader in your resolver.

import { UseInterceptors } from '@nestjs/common';
import { Parent, ResolveReference, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  @UseInterceptors(UserSelectionDataLoaderCacheInterceptor)
  @ResolveReference()
  async resolveReference(
    @Parent() reference: { __typename: 'User'; id: string },
    @InjectSelectionDataLoader('User') loader: DataLoaderInstance<string, User>
  ): Promise<User> {
    return loader.load(reference.id);
  }

  // It can also be used with
```

## Resolve Field

in a similar way, combined with
  // UserSelectionDataLoaderCacheInterceptor and @InjectSelectionDataLoader.
}


# Function: getCurrentUserFromExeContext()

```ts
function getCurrentUserFromExeContext<CurrentUser>(context): CurrentUser | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:11](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/current-user.decorator-base.ts#L11)

Extracts the current user from the execution context.

## Type Parameters

### CurrentUser `CurrentUser`

## Parameters

### context `ExecutionContext`

The execution context.

## Returns

`CurrentUser` \| `undefined`

The current user, or undefined if not found.


# Function: getPrismaSelectionFromInfo()

```ts
function getPrismaSelectionFromInfo(info, opts?): 
  | {
[key: string]: RecurSelect;
}
  | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:49](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/prisma-selection.decorator.ts#L49)

Extracts the Prisma selection object from a GraphQL info object.

## Parameters

### info `GqlContextInfo`

The GraphQL info object.

### opts? `BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>

Options for the selection.

## Returns

  \| \{
\[`key`: `string`\]: `RecurSelect`;
\}
  \| `undefined`

The Prisma selection object.


# Function: getUniversalSelectionFromInfo()

```ts
function getUniversalSelectionFromInfo(info, opts?): UniversalSelection;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:121](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/universal-selection.decorator.ts#L121)

Extracts the universal selection object from a GraphQL info object.

## Parameters

### info `GqlContextInfo`

The GraphQL info object.

### opts?

[`UniversalSelectionArgs`](TypeAlias.UniversalSelectionArgs.md)

Options for the selection.

## Returns

[`UniversalSelection`](Interface.UniversalSelection.md)

The universal selection object.


# Function: prismaSelectionFromGqlExecutionCtx()

```ts
function prismaSelectionFromGqlExecutionCtx(ctx, opts): 
  | {
[key: string]: RecurSelect;
}
  | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:70](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/prisma-selection.decorator.ts#L70)

Extracts the Prisma selection object from a GraphQL execution context.

## Parameters

### ctx `GqlExecutionContext`

The GraphQL execution context.

### opts `BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>

Options for the selection.

## Returns

  \| \{
\[`key`: `string`\]: `RecurSelect`;
\}
  \| `undefined`

The Prisma selection object.


# Function: stringifyUniversalSelection()

```ts
function stringifyUniversalSelection(selection): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:28](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/universal-selection.decorator.ts#L28)

Stringifies a universal selection object.

## Parameters

### selection

[`UniversalSelection`](Interface.UniversalSelection.md)

The universal selection object.

## Returns

`string`

The stringified universal selection.


# Interface: GqlSelectionDataLoaderContext\<T\>

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:37](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L37)

The main, "Ready to use" Context
This is the new base context for our entire application.

## Type Parameters

### T `T`

## Properties

### \_\_selectionDataLoaderSelectionCache? {#__selectiondataloaderselectioncache}

```ts
optional __selectionDataLoaderSelectionCache: object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:49](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L49)

Internal, request-scoped cache for selections.
Key: Full query path (e.g., "q1.author")
Value: The pre-calculated selection object and its stringified key.

#### Index Signature

```ts
[fieldPath: string]: CachedSelection | undefined
```

***

### selectionDataLoaderProviders {#selectiondataloaderproviders}

```ts
selectionDataLoaderProviders: SelectionDataLoaderProviderMap<T>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:42](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L42)

The top-level map holding all request-scoped providers,
keyed by entity name (e.g., "User").


# Interface: UniversalSelection

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:21](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/universal-selection.decorator.ts#L21)

A recursive type for representing a universal selection.

## Extends

- `Record`\<`string`, `boolean` \| `UniversalSelection`\>


# Type Alias: CachedSelection

```ts
type CachedSelection = object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:20](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L20)

The "Selection Cache" Entry
This is the object our interceptor will create and cache.


# Type Alias: DynamicModuleFabric\<T\>

```ts
type DynamicModuleFabric<T> = object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/dynamic-module-fabric.ts:31](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/dynamic-module-fabric.ts#L31)

Represents a factory configuration object for creating a dynamic module.
Used to construct modules dynamically with flexible importing and dependency injection options.

## Type Parameters

### T `T`

The type of the module or service being created by the factory.


# Type Alias: SelectionDataLoaderProvider\<TKey, TValue\>

```ts
type SelectionDataLoaderProvider<TKey, TValue> = object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:10](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L10)

The "Provider" (Request-Scoped)
This is a request-scoped object with its own internal cache.
Its job is to provide unique DataLoader instances for each unique selection.

## Type Parameters

### TKey `TKey`

### TValue `TValue`


# Type Alias: UniversalSelectionArgs

```ts
type UniversalSelectionArgs = BasicSelectionArgs<{
  postProcess?: (selection) => void;
}>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:108](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/universal-selection.decorator.ts#L108)

Arguments for the universal selection decorator.


# Variable: CurrentUserBase()

```ts
const CurrentUserBase: <CurrentUser>(...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:30](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/current-user.decorator-base.ts#L30)

A decorator that extracts the current user from the execution context.
If the user is not found, it throws an error.

## Type Parameters

### CurrentUser `CurrentUser`

## Parameters

### dataOrPipes

...`unknown`[]

## Returns

`ParameterDecorator`


# Variable: GetUniversalSelection()

```ts
const GetUniversalSelection: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:146](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/universal-selection.decorator.ts#L146)

A decorator that extracts the universal selection object from a GraphQL execution context.

## Parameters

### dataOrPipes

...(
  \| [`UniversalSelectionArgs`](TypeAlias.UniversalSelectionArgs.md)
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`


# Variable: InjectSelectionDataLoader()

```ts
const InjectSelectionDataLoader: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/inject-selection-data-loader.decorator.ts:13](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/inject-selection-data-loader.decorator.ts#L13)

This decorator injects the correct, selection-specific DataLoader.
It *must* be used with @UseInterceptors(SelectionDataLoaderCacheInterceptor).

## Parameters

### dataOrPipes

...(
  \| `string`
  \| `void`
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`


# Variable: PrismaSelection()

```ts
const PrismaSelection: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:80](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/prisma-selection.decorator.ts#L80)

A decorator that extracts the Prisma selection object from a GraphQL execution context.

## Parameters

### dataOrPipes

...(
  \| `BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`


# Variable: TryCurrentUserBase()

```ts
const TryCurrentUserBase: <CurrentUser>(...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:22](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/current-user.decorator-base.ts#L22)

A decorator that extracts the current user from the execution context.
If the user is not found, it returns undefined.

## Type Parameters

### CurrentUser `CurrentUser`

## Parameters

### dataOrPipes

...`unknown`[]

## Returns

`ParameterDecorator`
