# Type Alias: PromisesRecordValue\<T\>

```ts
type PromisesRecordValue<T> = { [K in keyof T]: PromiseValue<T[K]> };
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:35](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/async/promise-util.ts#L35)

Represents a type that transforms the values of an object type `T` into their resolved promise values.

Each property in the resulting type corresponds to the properties of the input object `T`,
with the values being replaced by the resolved types of any promises they may hold.

This utility is useful when you are working with a record where each value is wrapped in a `Promise`,
allowing you to define a type for the resolved values of those promises.

## Type Parameters

### T

`T`

The original object type whose values are promises or other types.
