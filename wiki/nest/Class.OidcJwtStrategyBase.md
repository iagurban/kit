# Abstract Class: OidcJwtStrategyBase\<TUser, TPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-jwt-strategy.base.ts:25](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/nest/oidc-jwt-strategy.base.ts#L25)

Abstract base class for a Passport JWT strategy that validates tokens from an
OIDC-compliant third-party identity provider (e.g., Keycloak, Auth0).

It automates the process of fetching the public signing key from the provider's
JWKS (JSON Web Key Set) endpoint.

## Extends

- `Strategy`\<`this`\> & `PassportStrategyMixin`\<`unknown`, `this`\>

## Type Parameters

### TUser

`TUser` *extends* `object`

The application-specific user object type.

### TPayload

`TPayload` *extends* `object`

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
PassportStrategy(Strategy, 'jwt').authenticate
```

***

### convertPayloadToUser() {#convertpayloadtouser}

```ts
abstract convertPayloadToUser(payload): Promise<TUser>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-jwt-strategy.base.ts:38](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/nest/oidc-jwt-strategy.base.ts#L38)

Converts the validated JWT payload from the IdP into your application's
internal user representation. This is where you map claims to user properties.

#### Parameters

##### payload

`TPayload`

The validated JWT payload.

#### Returns

`Promise`\<`TUser`\>

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

##### err

`Error`

#### Returns

`void`

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

###### status

`number`

##### Returns

`void`

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

#### Returns

`void`

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
PassportStrategy(Strategy, 'jwt').success
```

***

### validate() {#validate}

```ts
validate(payload): Promise<TUser>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-jwt-strategy.base.ts:62](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/nest/oidc-jwt-strategy.base.ts#L62)

Passport's validation method. It receives the payload after the signature
and claims (`iss`, `aud`, `exp`) have been verified.

This method delegates the payload-to-user conversion to the abstract
`convertPayloadToUser` method.

#### Parameters

##### payload

`TPayload`

#### Returns

`Promise`\<`TUser`\>

#### Overrides

```ts
PassportStrategy(Strategy, 'jwt').validate
```
