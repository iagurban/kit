# Function: pointOnCircle()

```ts
function pointOnCircle(
   cx, 
   cy, 
   r, 
   angleRad): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:202](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/numbers/geometry.ts#L202)

Calculates the coordinates of a point on the circumference of a circle given the circle's center, radius, and an angle in radians.

## Parameters

### cx

`number`

The x-coordinate of the circle's center.

### cy

`number`

The y-coordinate of the circle's center.

### r

`number`

The radius of the circle.

### angleRad

`number`

The angle in radians at which to compute the point on the circle.

## Returns

\[`number`, `number`\]

A tuple representing the x and y coordinates of the point on the circle.
