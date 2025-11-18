# Function: angleBetween()

```ts
function angleBetween(
   x1, 
   y1, 
   x2, 
   y2): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:84](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/numbers/geometry.ts#L84)

Calculates the angle in radians between two points (x1, y1) and (x2, y2).

The angle is determined using the arctangent of the difference in y-coordinates
divided by the difference in x-coordinates. It is measured counterclockwise
from the positive x-axis.

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

## Returns

`number`

The angle in radians between the two points.
