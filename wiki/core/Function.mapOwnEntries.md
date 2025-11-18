# Function: mapOwnEntries()

```ts
function mapOwnEntries<R, D>(o, fn): Record<keyof R, D>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/object-utils.ts:78](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/object-utils.ts#L78)

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
