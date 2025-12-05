# Function: getCurrentUserFromExeContext()

```ts
function getCurrentUserFromExeContext<CurrentUser>(context): CurrentUser | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:11](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/nest/decorators/current-user.decorator-base.ts#L11)

Extracts the current user from the execution context.

## Type Parameters

### CurrentUser

`CurrentUser`

## Parameters

### context

`ExecutionContext`

The execution context.

## Returns

`CurrentUser` \| `undefined`

The current user, or undefined if not found.
