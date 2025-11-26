# Abstract Class: LocalStrategyBase\<User, CurrentUserJwtPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/local-strategy-base.ts:36](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/nest/passport-strategies/local-strategy-base.ts#L36)

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

### User

`User` *extends* `object`

User entity type that must contain 'id' and 'passwordHash' properties

### CurrentUserJwtPayload

`CurrentUserJwtPayload` *extends* `object`

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

##### req

`Request`

The request to authenticate.

##### options?

`any`

Options passed to the strategy.

#### Returns

`void`

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

##### err

`Error`

#### Returns

`void`

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

###### challenge

`any`

(Can also be an object with 'message' and 'type' fields).

###### status

`number`

##### Returns

`void`

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

###### status

`number`

##### Returns

`void`

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

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/local-strategy-base.ts:49](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/nest/passport-strategies/local-strategy-base.ts#L49)

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

#### Returns

`void`

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

##### url

`string`

##### status?

`number`

#### Returns

`void`

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

##### user

`any`

##### info?

`any`

#### Returns

`void`

#### Api

public

#### Inherited from

```ts
PassportStrategy(Strategy).success
```
