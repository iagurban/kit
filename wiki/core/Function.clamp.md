# Function: clamp()

```ts
function clamp(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:121](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/utils.ts#L121)

Restricts a number to be within a specified range.

The `clamp` function ensures that a given number `v` lies within the bounds
defined by `min` and `max`. If `v` is less than `min`, the function returns
`min`. If `v` is greater than `max`, the function returns `max`.
Otherwise, it returns `v`.

Throws an error if `min` is greater than `max`.

## Parameters

### v

`number`

The number to be clamped.

### min

`number`

The lower boundary of the range.

### max

`number`

The upper boundary of the range.

## Returns

`number`

The clamped value, restricted to the inclusive range [min, max].

## Throws

If `min` is greater than `max`.
