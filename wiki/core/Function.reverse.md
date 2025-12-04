# Function: reverse()

```ts
function reverse<T>(a): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/iterable-utils.ts:44](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/collections/iterable-utils.ts#L44)

Creates an iterator that yields the elements of an array-like object in reverse order.

## Type Parameters

### T

`T`

## Parameters

### a

`ArrayLike`\<`T`\>

The array-like object to iterate over.

## Returns

`object`

An iterator that yields the elements of the array-like object in reverse order.

### \[iterator\]()

```ts
iterator: { next(): { done: boolean; value: T; }; Symbol.iterator: ...; };
```

#### Returns

\{ next(): \{ done: boolean; value: T; \}; \[Symbol.iterator\](): ...; \}

### next()

```ts
next(): object;
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
