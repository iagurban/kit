# Function: triangleCentroid()

```ts
function triangleCentroid(
   x1, 
   y1, 
   x2, 
   y2, 
   x3, 
   y3): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:274](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/numbers/geometry.ts#L274)

Calculates the centroid (geometric center) of a triangle given the coordinates
of its three vertices.

The centroid is the point that is the average position of all the points
in the triangle.

## Parameters

### x1

`number`

The x-coordinate of the first vertex of the triangle.

### y1

`number`

The y-coordinate of the first vertex of the triangle.

### x2

`number`

The x-coordinate of the second vertex of the triangle.

### y2

`number`

The y-coordinate of the second vertex of the triangle.

### x3

`number`

The x-coordinate of the third vertex of the triangle.

### y3

`number`

The y-coordinate of the third vertex of the triangle.

## Returns

\[`number`, `number`\]

The x and y coordinates of the triangle's centroid as a tuple.
