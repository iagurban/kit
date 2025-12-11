# Function: composeArgv()

```ts
function composeArgv<Args>(prev, next): (...args) => boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/composer.ts:29](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/composer.ts#L29)

Composes two predicate functions into a single predicate function that returns true
only if both the provided functions return true for the same arguments.

## Type Parameters

### Args

`Args` *extends* [`AnyArray`](TypeAlias.AnyArray.md)

The type of the arguments accepted by the predicate functions.

## Parameters

### prev

(...`args`) => `boolean`

The first predicate function to be evaluated.

### next

(...`args`) => `boolean`

The second predicate function to be evaluated.

## Returns

A composed predicate function that returns true if both
the `prev` and `next` functions return true for the provided arguments; otherwise, it returns false.

```ts
(...args): boolean;
```

### Parameters

#### args

...`Args`

### Returns

`boolean`
