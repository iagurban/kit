# Function: isUppercase()

```ts
function isUppercase(word): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/string-util.ts:52](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/string-util.ts#L52)

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
