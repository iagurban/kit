# Function: enhanceStepsEvenly()

```ts
function enhanceStepsEvenly(steps, o?): Record<`${number}%`, CSSProperties>;
```

Defined in: [mobx/keyframes-builder.tsx:94](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/react/mobx/keyframes-builder.tsx#L94)

Generates a mapping of percentages to CSS properties, evenly distributing the provided steps.
Optionally completes a cycle by repeating the first step at the end.

## Parameters

### steps

readonly `CSSProperties`[]

An array of CSS properties representing animation steps.

### o?

An options-object.

#### cycle?

`boolean`

If true, appends the first step to the end to create a seamless loop.

## Returns

`Record`\<`` `${number}%` ``, `CSSProperties`\>

A record where keys are percentage strings and values are CSS properties.
