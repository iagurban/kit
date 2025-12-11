# Variable: isAwaitable()

```ts
const isAwaitable: (value) => value is { then: AnyAnyFunction };
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-awaitable.ts:10](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-awaitable.ts#L10)

Checker that determines whether a value is awaitable (a thenable).

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is { then: AnyAnyFunction }`

True if the value has a callable `then`, otherwise false.
