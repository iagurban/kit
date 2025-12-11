# Variable: isGenerator()

```ts
const isGenerator: (value) => value is Generator<unknown, any, any>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-generator.ts:12](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-generator.ts#L12)

Checker that determines whether a value is a generator instance.

A generator must be an `IterableIterator` and provide `return` and `throw` methods.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Generator<unknown, any, any>`

True if the value is a generator, otherwise false.
