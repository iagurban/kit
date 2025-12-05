# Function: getCurrentUserFromExeContext()

```ts
function getCurrentUserFromExeContext<CurrentUser>(context): CurrentUser | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:11](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/current-user.decorator-base.ts#L11)

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
