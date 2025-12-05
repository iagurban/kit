# Function: createUsableContext()

```ts
function createUsableContext<T>(name): UsableContext<T>;
```

Defined in: [create-usable-context.ts:30](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/react/create-usable-context.ts#L30)

A utility function to create a reusable React context with strict type safety.

This function generates a context that enforces access to values through
custom hooks, ensuring that a value is always provided within the React
component tree or explicitly handled otherwise.

## Type Parameters

### T

`T`

The type of the value that the context will hold.

## Parameters

### name

`string`

The display name of the context, used for debugging and error messages.

## Returns

`UsableContext`\<`T`\>
