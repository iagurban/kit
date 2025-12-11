# Variable: isAsyncGenerator()

```ts
const isAsyncGenerator: (value) => value is AsyncGenerator<unknown, any, any>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-async-generator.ts:12](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-async-generator.ts#L12)

Checker that determines whether a value is an async generator instance.

An async generator must be async-iterable and implement `next`, `return`, and `throw` methods.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is AsyncGenerator<unknown, any, any>`

True if the value is an async generator, otherwise false.
