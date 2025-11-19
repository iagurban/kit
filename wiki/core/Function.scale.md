# Function: scale()

```ts
function scale(
   v, 
   fromMin, 
   fromMax, 
   toMin, 
   toMax): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:102](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/utils.ts#L102)

Scales a numeric value from one range to another.

This function takes a value and re-maps it from a source range
([fromMin, fromMax]) to a target range ([toMin, toMax]).

The source range is defined with the parameters `fromMin` and `fromMax`.
The target range is defined with the parameters `toMin` and `toMax`.

If the value lies outside the source range, the scaling is performed
as if the source range were extended, without clamping the final result.

## Parameters

### v

`number`

The value to be scaled.

### fromMin

`number`

The minimum of the source range.

### fromMax

`number`

The maximum of the source range.

### toMin

`number`

The minimum of the target range.

### toMax

`number`

The maximum of the target range.

## Returns

`number`

The value scaled to the target range.
