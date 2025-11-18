# Function: allStringCodePoints()

```ts
function allStringCodePoints(s): number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/string-util.ts:11](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/string-util.ts#L11)

Converts a given string into an array of its Unicode code points.

This function iterates over each character of the input string,
capturing the Unicode code point of each character, and returns
an array containing all code points in sequence.

## Parameters

### s

`string`

The input string to be converted into Unicode code points.

## Returns

`number`[]

An array of numbers representing the Unicode code points of the input string characters.
