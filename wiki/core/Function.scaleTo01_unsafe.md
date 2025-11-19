# Function: scaleTo01\_unsafe()

```ts
function scaleTo01_unsafe(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:40](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/utils.ts#L40)

Scales a given value to a normalized range between 0 and 1.

This function is used to map a value `v` from an input range defined by `min`
and `max` to a proportional position within the range [0, 1]. It assumes
that `min` is not equal to `max` and does not perform validation on the inputs.

## Parameters

### v

`number`

The value to be scaled.

### min

`number`

The lower bound of the input range.

### max

`number`

The upper bound of the input range.

## Returns

`number`

The normalized value within the range [0, 1].
