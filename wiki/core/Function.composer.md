# Function: composer()

```ts
function composer<T>(initial): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/composer.ts:71](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/composer.ts#L71)

A utility function that creates a composer object for managing and composing
multiple functions of the same type.

## Type Parameters

### T

`T`

## Parameters

### initial

(`o`) => `boolean`

The initial function to be set as the starting point
in the composition.

## Returns

`object`

An object with the following properties:
- push: A method to add a new function to the composition. It updates the `run`
  property to represent the composed result of all added functions.
- run: The current composition of functions, starting with the initial function
  and including any subsequent additions via the `push` method.

### run()

```ts
run: (o) => boolean;
```

#### Parameters

##### o

`T`

#### Returns

`boolean`

### push()

```ts
push(next): void;
```

#### Parameters

##### next

(`o`) => `boolean`

#### Returns

`void`
