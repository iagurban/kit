# Function: distanceTo00()

```ts
function distanceTo00(x, y): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:12](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/numbers/geometry.ts#L12)

Calculates the Euclidean distance from a point (x, y) to the origin (0, 0).

The function computes the straight-line distance using the Pythagorean theorem.
This formula essentially finds the length of the hypotenuse of a right triangle where
the legs are represented by the x and y coordinates.

## Parameters

### x

`number`

The x-coordinate of the point.

### y

`number`

The y-coordinate of the point.

## Returns

`number`

The calculated distance from the point (x, y) to the origin (0, 0).
