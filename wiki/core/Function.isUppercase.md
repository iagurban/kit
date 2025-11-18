# Function: isUppercase()

```ts
function isUppercase(word): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/string-util.ts:52](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/string-util.ts#L52)

Determines whether the given string contains at least one uppercase letter.

This function uses a regular expression to check for the presence of any character
categorized as an uppercase letter in Unicode. It supports all scripts and languages
defined in Unicode to identify uppercase characters.

## Parameters

### word

`string`

The input string to be evaluated.

## Returns

`boolean`

Returns true if the input string contains at least one uppercase letter, otherwise false.
