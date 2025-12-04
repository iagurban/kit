# Function: getCurrentUserFromExeContext()

```ts
function getCurrentUserFromExeContext<CurrentUser>(context): CurrentUser | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:11](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/nest/decorators/current-user.decorator-base.ts#L11)

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
