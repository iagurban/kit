# Function: createUsableContext()

```ts
function createUsableContext<T>(name): object;
```

Defined in: [create-usable-context.ts:28](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/react/create-usable-context.ts#L28)

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
