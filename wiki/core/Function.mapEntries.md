# Function: mapEntries()

```ts
function mapEntries<K, V, R, D>(o, fn): Record<K, D>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/object-utils.ts:54](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/collections/object-utils.ts#L54)

Transforms the entries of an object by applying a mapping function to its values and keys.

## Type Parameters

### K

`K` *extends* `string`

The type of the keys in the input object. Must extend `string`.

### V

`V`

The type of the values in the input object.

### R

`R` *extends* `Record`\<`K`, `V`\>

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
