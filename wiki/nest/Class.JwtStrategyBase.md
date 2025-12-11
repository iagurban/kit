# Abstract Class: JwtStrategyBase\<User, CurrentUserJwtPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/jwt-strategy-base.ts:33](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/passport-strategies/jwt-strategy-base.ts#L33)

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

### User

`User` *extends* `object`

The user entity type that must contain at least an 'id' property

### CurrentUserJwtPayload

`CurrentUserJwtPayload` *extends* `object`

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

### convert() {#convert}

```ts
abstract convert(payload): Promise<User>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/passport-strategies/jwt-strategy-base.ts:44](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/passport-strategies/jwt-strategy-base.ts#L44)

Abstract method to convert JWT payload into a user object.
Must be implemented by derived classes to define how the JWT payload maps to a user.

#### Parameters

##### payload

`CurrentUserJwtPayload`

The decoded JWT payload

#### Returns

`Promise`\<`User`\>

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
