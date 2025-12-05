# Function: indexed()

```ts
function indexed<T>(array): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/iterable-utils.ts:24](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/iterable-utils.ts#L24)

Creates an iterator that yields the elements of an array along with their indices.

## Type Parameters

### T

`T`

## Parameters

### array

`T`[]

The array to iterate over.

## Returns

`object`

An iterator that yields pairs of [element, index].

### next()

```ts
next: () => object;
```

#### Returns

`object`

##### done

```ts
done: boolean;
```

##### value

```ts
value: readonly [T, number];
```

### \[iterator\]()

```ts
iterator: { next: () => { done: boolean; value: readonly [T, number]; }; Symbol.iterator: ...; };
```

#### Returns

\{ next: () =\> \{ done: boolean; value: readonly \[T, number\]; \}; \[Symbol.iterator\](): ...; \}
