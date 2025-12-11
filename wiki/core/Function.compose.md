# Function: compose()

```ts
function compose<T>(prev, next): (v) => boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/composer.ts:14](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/composer.ts#L14)

Combines two predicate functions into a single function that returns true
if both predicates return true for the given input.

## Type Parameters

### T

`T`

## Parameters

### prev

(`v`) => `boolean`

The first predicate function to evaluate.

### next

(`v`) => `boolean`

The second predicate function to evaluate.

## Returns

A new function that takes an input value of type T
and returns true only if both predicate functions return true for that input.

```ts
(v): boolean;
```

### Parameters

#### v

`T`

### Returns

`boolean`
