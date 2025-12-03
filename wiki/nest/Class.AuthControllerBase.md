# Class: AuthControllerBase\<User, CurrentUserJwtPayload\>

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:32](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-controller-base.ts#L32)

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

### User

`User` *extends* `object`

User entity type that must contain 'id' and 'passwordHash' properties

### CurrentUserJwtPayload

`CurrentUserJwtPayload` *extends* `object`

JWT payload type that must contain a 'sub' property

## Methods

### login() {#login}

```ts
login(
   login, 
   password, 
res): Promise<string>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:71](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-controller-base.ts#L71)

Authenticates user credentials and creates new session.
Sets refresh token in cookies and returns access token.

#### Parameters

##### login

`string`

User login (username or email)

##### password

`string`

User password

##### res

`Response`

Express response object for setting refresh token cookie

#### Returns

`Promise`\<`string`\>

Access token for authenticated user

#### Throws

If credentials are invalid

***

### logout() {#logout}

```ts
logout(req, res): Promise<boolean>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:87](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-controller-base.ts#L87)

Ends the user session by invalidating refresh token and clearing cookies.
If refresh token exists, it will be invalidated on the server.

#### Parameters

##### req

`Request`

Express request object containing refresh token in cookies

##### res

`Response`

Express response object for clearing refresh token cookie

#### Returns

`Promise`\<`boolean`\>

True if logout was successful

***

### refresh() {#refresh}

```ts
refresh(req, res): Promise<Response<any, Record<string, any>>>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/auth-controller-base.ts:47](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/nest/auth-controller-base.ts#L47)

Refreshes the access token using a refresh token from cookies.
Issues new refresh token and returns new access token.

#### Parameters

##### req

`Request`

Express request object containing refresh token in cookies

##### res

`Response`

Express response object for setting new refresh token cookie

#### Returns

`Promise`\<`Response`\<`any`, `Record`\<`string`, `any`\>\>\>

New access token in JSON format

#### Throws

If refresh token is missing in cookies
