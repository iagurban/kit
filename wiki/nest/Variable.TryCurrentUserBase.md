# Variable: TryCurrentUserBase()

```ts
const TryCurrentUserBase: <CurrentUser>(...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/current-user.decorator-base.ts:22](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/decorators/current-user.decorator-base.ts#L22)

A decorator that extracts the current user from the execution context.
If the user is not found, it returns undefined.

## Type Parameters

### CurrentUser

`CurrentUser`

## Parameters

### dataOrPipes

...`unknown`[]

## Returns

`ParameterDecorator`
