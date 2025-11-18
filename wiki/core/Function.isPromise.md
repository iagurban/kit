# Function: isPromise()

```ts
function isPromise<T>(o): o is Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-util.ts:12](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/async/promise-util.ts#L12)

Determines if the given object is Promise.

This function checks if the provided object is not null or undefined
and possesses a `then` property, which is characteristic of Promise objects.
It uses type narrowing to assert the object as a Promise of a given type.

## Type Parameters

### T

`T`

The type of the value that the Promise resolves to.

## Parameters

### o

`unknown`

The object to be checked.

## Returns

`o is Promise<T>`

Returns `true` if the object is a Promise, otherwise `false`.
