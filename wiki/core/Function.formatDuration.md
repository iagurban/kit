# Function: formatDuration()

```ts
function formatDuration(durationInMs): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/format-duration.ts:13](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/format-duration.ts#L13)

Converts a duration in milliseconds to a human-readable string format.

The output string includes the duration in seconds and milliseconds,
separated by a decimal point, followed by the letter "s" as a unit symbol.
Milliseconds are always represented with three digits, padded with leading
zeros if necessary.

## Parameters

### durationInMs

`number`

The duration in milliseconds to be formatted.

## Returns

`string`

A string representation of the duration in the format "X.XXXs",
                  where X represents seconds and XXX represents milliseconds.
