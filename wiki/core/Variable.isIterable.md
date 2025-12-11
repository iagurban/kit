# Variable: isIterable()

```ts
const isIterable: (value) => value is Iterable<unknown, any, any>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-iterable.ts:9](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-iterable.ts#L9)

Checker that determines whether a value is iterable.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Iterable<unknown, any, any>`

True if the value implements `Symbol.iterator`, otherwise false.
