# Function: weakCache()

```ts
function weakCache<T, E>(create): (o) => E;
```

Defined in: [IdeaProjects/kit/kit/src/core/weak-cache.ts:11](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/weak-cache.ts#L11)

Creates a weak cache generator function that memoizes the output of a given creation function
associated with the input object. The cache automatically ensures that objects are garbage
collected once they are no longer referenced elsewhere in the application.

## Type Parameters

### T

`T` *extends* `Record`\<`never`, `never`\> \| readonly `Record`\<`never`, `never`\>[]

The type of the input object. Must be an object or an array of objects.

### E

`E`

The type of the value created and cached.

## Parameters

### create

(`o`) => `E`

A function that generates a value of type `E` based on the input object of type `T`.

## Returns

A function that takes an object of type `T` as input and returns a cached or newly created value of type `E`.

```ts
(o): E;
```

### Parameters

#### o

`T`

### Returns

`E`
