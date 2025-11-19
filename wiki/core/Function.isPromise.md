# Function: isPromise()

```ts
function isPromise<T>(o): o is Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:8](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/async/promise-util.ts#L8)

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
