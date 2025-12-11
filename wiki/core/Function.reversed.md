# Function: reversed()

```ts
function reversed<T>(array): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/iterable-utils.ts:6](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/iterable-utils.ts#L6)

Creates an iterator that yields the elements of an array in reverse order.

## Type Parameters

### T

`T`

## Parameters

### array

`T`[]

The array to iterate over.

## Returns

`object`

An iterator that yields the elements of the array in reverse order.

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
value: T;
```

### \[iterator\]()

```ts
iterator: { next: () => { done: boolean; value: T; }; Symbol.iterator: ...; };
```

#### Returns

\{ next: () =\> \{ done: boolean; value: T; \}; \[Symbol.iterator\](): ...; \}
