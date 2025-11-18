# Function: scaleFrom01()

```ts
function scaleFrom01(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:26](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/numbers/utils.ts#L26)

Scales a value from a normalized range [0, 1] to a specified range [min, max].

## Parameters

### v

`number`

The value to be scaled, assumed to be in the range [0, 1].

### min

`number`

The lower bound of the target range.

### max

`number`

The upper bound of the target range.

## Returns

`number`

The scaled value in the range [min, max].
