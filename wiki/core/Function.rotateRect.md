# Function: rotateRect()

```ts
function rotateRect(
   x, 
   y, 
   width, 
   height, 
   cx, 
   cy, 
   angleRad): [number, number][];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:344](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/geometry.ts#L344)

Rotates a rectangle around a given center point by a specified angle in radians.

## Parameters

### x

`number`

The x-coordinate of the top-left corner of the rectangle.

### y

`number`

The y-coordinate of the top-left corner of the rectangle.

### width

`number`

The width of the rectangle.

### height

`number`

The height of the rectangle.

### cx

`number`

The x-coordinate of the center point of rotation.

### cy

`number`

The y-coordinate of the center point of rotation.

### angleRad

`number`

The angle of rotation in radians.

## Returns

\[`number`, `number`\][]

An array of the rotated rectangle's corner coordinates as [x, y] pairs.
