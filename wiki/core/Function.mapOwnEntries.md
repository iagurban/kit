# Function: mapOwnEntries()

```ts
function mapOwnEntries<K, R, D>(o, fn): Record<K, D>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/object-utils.ts:79](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/object-utils.ts#L79)

Iterates over the own enumerable string-keyed properties of an object and
applies a transformation function to each key-value pair, returning a new
object with the transformed values.

## Type Parameters

### K

`K` *extends* `string`

### R

`R` *extends* `Record`\<`K`, `unknown`\>

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

`Record`\<`K`, `D`\>

A new object with the same keys as the input
object, but transformed values based on the provided function.
