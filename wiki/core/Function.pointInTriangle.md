# Function: pointInTriangle()

```ts
function pointInTriangle(
   px, 
   py, 
   x1, 
   y1, 
   x2, 
   y2, 
   x3, 
   y3): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:300](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/numbers/geometry.ts#L300)

Determines if a point is inside a triangle using the area comparison method.

This function checks if the given point (px, py) lies inside the triangle defined by
the vertices (x1, y1), (x2, y2), and (x3, y3). It calculates the area of the triangle
and compares it to the sum of the areas of three sub-triangles formed by the point and
each side of the triangle.

## Parameters

### px

`number`

The x-coordinate of the point to check.

### py

`number`

The y-coordinate of the point to check.

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

`boolean`

Returns true if the point lies inside the triangle, false otherwise.
