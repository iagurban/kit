# Function: lerpPoint()

```ts
function lerpPoint(
   x1, 
   y1, 
   x2, 
   y2, 
   t): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:66](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/numbers/geometry.ts#L66)

Computes a point along a linear interpolation between two points in a 2D space.

## Parameters

### x1

`number`

The x-coordinate of the first point.

### y1

`number`

The y-coordinate of the first point.

### x2

`number`

The x-coordinate of the second point.

### y2

`number`

The y-coordinate of the second point.

### t

`number`

The interpolation factor, typically in the range [0, 1], where 0 represents the first point and 1 represents the second point.

## Returns

\[`number`, `number`\]

The interpolated point as an array in the format [x, y].
