# Function: isPromise()

```ts
function isPromise<T>(o): o is Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:8](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/async/promise-util.ts#L8)

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
