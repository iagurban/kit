# Function: isPromise()

```ts
function isPromise<T>(o): o is Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:8](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/async/promise-util.ts#L8)

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
