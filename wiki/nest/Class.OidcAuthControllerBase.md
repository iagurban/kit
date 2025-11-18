# Abstract Class: OidcAuthControllerBase

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:16](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/nest/oidc-auth-controller.base.ts#L16)

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

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:60](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/nest/oidc-auth-controller.base.ts#L60)

Exchanges an authorization code for OIDC tokens.
This method contains the provider-specific logic for the token endpoint.

#### Parameters

##### code

`string`

The authorization code from the callback URL.

#### Returns

`Promise`\<`OidcTokens`\>

A promise that resolves to the OIDC tokens.

***

### getAuthorizationUrl() {#getauthorizationurl}

```ts
abstract protected getAuthorizationUrl(): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:23](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/nest/oidc-auth-controller.base.ts#L23)

Constructs the full authorization URL to which the user should be redirected
to start the login process.

#### Returns

`string`

The complete URL for the IdP's authorization endpoint with necessary query parameters.

***

### getLogoutUrl() {#getlogouturl}

```ts
abstract protected getLogoutUrl(): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/oidc-auth-controller.base.ts:33](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/nest/oidc-auth-controller.base.ts#L33)

Constructs the full logout URL to which the user should be redirected
to end their session on the identity provider.

#### Returns

`string`

The complete URL for the IdP's end-session endpoint.
