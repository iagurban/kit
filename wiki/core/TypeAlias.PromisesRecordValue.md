# Type Alias: PromisesRecordValue\<T\>

```ts
type PromisesRecordValue<T> = { [K in keyof T]: PromiseValue<T[K]> };
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:35](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/async/promise-util.ts#L35)

Represents a type that transforms the values of an object type `T` into their resolved promise values.

Each property in the resulting type corresponds to the properties of the input object `T`,
with the values being replaced by the resolved types of any promises they may hold.

This utility is useful when you are working with a record where each value is wrapped in a `Promise`,
allowing you to define a type for the resolved values of those promises.

## Type Parameters

### T

`T`

The original object type whose values are promises or other types.
