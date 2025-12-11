# Type Alias: PromisesRecordValue\<T\>

```ts
type PromisesRecordValue<T> = { [K in keyof T]: PromiseValue<T[K]> };
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:23](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/async/promise-util.ts#L23)

Represents a type that transforms the values of an object type `T` into their resolved promise values.

Each property in the resulting type corresponds to the properties of the input object `T`,
with the values being replaced by the resolved types of any promises they may hold.

This utility is useful when you are working with a record where each value is wrapped in a `Promise`,
allowing you to define a type for the resolved values of those promises.

## Type Parameters

### T

`T`

The original object type whose values are promises or other types.
