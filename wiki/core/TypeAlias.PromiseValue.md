# Type Alias: PromiseValue\<T\>

```ts
type PromiseValue<T> = T extends Promise<infer R> ? R : T;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:22](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/async/promise-util.ts#L22)

A utility type that extracts the resolved value type of Promise.
If the provided type `T` is a Promise, `PromiseValue<T>` resolves to the type of the value that the Promise resolves/rejects with.
Otherwise, it resolves to the original type `T`.

## Type Parameters

### T

`T`

The type to evaluate.
