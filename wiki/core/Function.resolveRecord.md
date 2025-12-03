# Function: resolveRecord()

```ts
function resolveRecord<T>(o): Promise<PromisesRecordValue<T>>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:50](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/async/promise-util.ts#L50)

Asynchronously resolves all promise values within an object while preserving the structure of the object.

The function iterates over all key-value pairs in the provided object. If a value is a Promise, it waits until the promise
resolves and sets the resolved value in the corresponding key. If a value is not a Promise, it is directly added to
the resulting object. The function ensures that all promises are resolved concurrently, and the resolved object retains
the same keys as the input with resolved values.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

The type of the input object with possible promise values.

## Parameters

### o

`T`

An object that may contain values or promises to be resolved.

## Returns

`Promise`\<[`PromisesRecordValue`](TypeAlias.PromisesRecordValue.md)\<`T`\>\>

A promise that resolves to an object of the same shape as the input object
with all promises replaced by their resolved values.
