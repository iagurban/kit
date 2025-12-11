# Abstract Class: ContextualCurrentUserInterceptorBase\<CurrentUser\>

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/contextual-current-user.interceptor-base.ts:32](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/interceptors/contextual-current-user.interceptor-base.ts#L32)

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

### CurrentUser

`CurrentUser`

The type representing the user data to be stored in AsyncLocalStorage

## Implements

- `NestInterceptor`

## Methods

### getStorage() {#getstorage}

```ts
abstract getStorage(): AsyncLocalStorage<CurrentUser>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/contextual-current-user.interceptor-base.ts:39](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/interceptors/contextual-current-user.interceptor-base.ts#L39)

Abstract method that must be implemented by subclasses to provide the AsyncLocalStorage
instance where the current user data should be stored.

#### Returns

`AsyncLocalStorage`\<`CurrentUser`\>

The storage instance for the current user

***

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/contextual-current-user.interceptor-base.ts:41](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/interceptors/contextual-current-user.interceptor-base.ts#L41)

Method to implement a custom interceptor.

#### Parameters

##### context

`ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next

`CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns

`Observable`\<`unknown`\>

#### Implementation of

```ts
NestInterceptor.intercept
```
