# Variable: isConstructor()

```ts
const isConstructor: (value) => value is ClassConstructor<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-constructor.ts:12](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-constructor.ts#L12)

Checker that determines whether a value is a class/constructor function
(i.e., has a prototype and is not a generator function).

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is ClassConstructor<unknown>`

True if the value can be used with `new`, otherwise false.
