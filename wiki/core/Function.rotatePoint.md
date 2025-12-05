# Function: rotatePoint()

```ts
function rotatePoint(
   x, 
   y, 
   cx, 
   cy, 
   rad): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:96](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/numbers/geometry.ts#L96)

Rotates a point around a specified pivot point by a given angle in radians.

## Parameters

### x

`number`

The x-coordinate of the point to be rotated.

### y

`number`

The y-coordinate of the point to be rotated.

### cx

`number`

The x-coordinate of the pivot point around which rotation occurs.

### cy

`number`

The y-coordinate of the pivot point around which rotation occurs.

### rad

`number`

The angle of rotation in radians.

## Returns

\[`number`, `number`\]

The coordinates of the rotated point as a tuple [x, y].
