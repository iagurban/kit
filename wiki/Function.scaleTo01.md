# Function: scaleTo01()

```ts
function scaleTo01(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:53](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L53)

Scales a given value to a normalized range [0, 1] based on the specified minimum and maximum range values.

Throws an error if the maximum and minimum values are equal, as the result would be NaN in this scenario.

## Parameters

### v

`number`

The value to scale.

### min

`number`

The minimum value of the original range.

### max

`number`

The maximum value of the original range.

## Returns

`number`

The scaled value within the range [0, 1].

## Throws

If max is equal to min.
