# Function: lerp()

```ts
function lerp(
   a, 
   b, 
   t): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:55](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/numbers/geometry.ts#L55)

Linearly interpolates between two numbers, `a` and `b`, based on the interpolation factor `t`.

## Parameters

### a

`number`

The starting value.

### b

`number`

The ending value.

### t

`number`

The interpolation factor, typically between 0 (returns `a`) and 1 (returns `b`).

## Returns

`number`

The interpolated value between `a` and `b` based on `t`.
