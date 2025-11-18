# Function: mapOwnEntries()

```ts
function mapOwnEntries<R, D>(o, fn): Record<keyof R, D>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/object-utils.ts:78](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/collections/object-utils.ts#L78)

Iterates over the own enumerable string-keyed properties of an object and
applies a transformation function to each key-value pair, returning a new
object with the transformed values.

## Type Parameters

### R

`R` *extends* `Record`\<`string`, `unknown`\>

An object with string keys and values of any type.

### D

`D`

The type of the resulting transformed values.

## Parameters

### o

`R`

The object whose own enumerable properties are to be iterated over.

### fn

(`v`, `k`) => `D`

The function to apply to each property.
The function receives the value and key of each property as arguments.

## Returns

`Record`\<keyof `R`, `D`\>

A new object with the same keys as the input
object, but transformed values based on the provided function.
