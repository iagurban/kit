# Function: lerp()

```ts
function lerp(
   a, 
   b, 
   t): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:55](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/numbers/geometry.ts#L55)

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
