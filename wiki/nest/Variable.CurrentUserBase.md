# Variable: CurrentUserBase()

```ts
const CurrentUserBase: <CurrentUser>(...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:30](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/decorators/current-user.decorator-base.ts#L30)

A decorator that extracts the current user from the execution context.
If the user is not found, it throws an error.

## Type Parameters

### CurrentUser

`CurrentUser`

## Parameters

### dataOrPipes

...`unknown`[]

## Returns

`ParameterDecorator`
