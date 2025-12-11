# Function: getCurrentUserFromExeContext()

```ts
function getCurrentUserFromExeContext<CurrentUser>(context): CurrentUser | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:11](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/decorators/current-user.decorator-base.ts#L11)

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
