# Function: scaleTo01\_unsafe()

```ts
function scaleTo01_unsafe(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:40](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/numbers/utils.ts#L40)

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
