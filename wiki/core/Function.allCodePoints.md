# Function: allCodePoints()

```ts
function allCodePoints<T>(s): number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/string-util.ts:35](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/string-util.ts#L35)

Computes and returns an array of numeric code points for the provided input.

If the input is a string, it returns an array of Unicode code points
for all characters in the string.
If the input is an array of strings, it recursively processes each string
in the array and combines all the resulting code points into a single array.

## Type Parameters

### T

`T` *extends* `string` \| readonly `string`[]

The type of the input, which can either be a string or an array of strings.

## Parameters

### s

`T`

The string or array of strings to process for code points.

## Returns

`number`[]

An array of numeric code points for the given string(s).
