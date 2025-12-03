# Function: isPromise()

```ts
function isPromise<T>(o): o is Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:8](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/async/promise-util.ts#L8)

Determines whether the given object is a Promise.

## Type Parameters

### T

`T`

## Parameters

### o

`unknown`

The object to test.

## Returns

`o is Promise<T>`

- Returns `true` if the object is a Promise; otherwise, `false`.
