# Function: createUsableContext()

```ts
function createUsableContext<T>(name): object;
```

Defined in: [create-usable-context.ts:28](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/react/create-usable-context.ts#L28)

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

`object`

### ctx

```ts
ctx: Context<T | undefined>;
```

### provider

```ts
provider: Provider<T | undefined>;
```

### use()

```ts
use: () => T;
```

#### Returns

`T`

### useIfProvided()

```ts
useIfProvided: () => T | undefined;
```

#### Returns

`T` \| `undefined`
