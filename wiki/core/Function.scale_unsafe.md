# Function: scale\_unsafe()

```ts
function scale_unsafe(
   v, 
   fromMin, 
   fromMax, 
   toMin, 
   toMax): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:75](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/numbers/utils.ts#L75)

Scales a given number `v` from one range to another without enforcing boundary checks.

This function converts the input value from an initial range [fromMin, fromMax]
into a normalized range [0, 1], and then scales it to the target range [toMin, toMax].
It does not guarantee the input `v` is within the range [fromMin, fromMax], hence
may produce results beyond the target range boundaries if the input is outside the source range.

## Parameters

### v

`number`

The value to be scaled from the source range to the target range.

### fromMin

`number`

The minimum value of the source range.

### fromMax

`number`

The maximum value of the source range.

### toMin

`number`

The minimum value of the target range.

### toMax

`number`

The maximum value of the target range.

## Returns

`number`

The scaled value in the target range.
