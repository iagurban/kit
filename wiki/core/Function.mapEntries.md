# Function: mapEntries()

```ts
function mapEntries<K, R, D>(o, fn): Record<K, D>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/object-utils.ts:54](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/object-utils.ts#L54)

Transforms the entries of an object by applying a mapping function to its values and keys.

## Type Parameters

### K

`K` *extends* `string`

The type of the keys in the input object. Must extend `string`.

### R

`R` *extends* `Record`\<`K`, `unknown`\>

The type of the input object. Must be a record where the key is of type `K` and the value is of type `V`.

### D

`D`

The type of the values in the output object.

## Parameters

### o

`R`

The input object whose entries will be transformed.

### fn

(`v`, `k`) => `D`

A function that takes a value of type `V` and a key of type `K`, and returns a transformed value of type `D`.

## Returns

`Record`\<`K`, `D`\>

A new object with the same keys as the input object, but with transformed values of type `D`.
