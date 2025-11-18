# Function: rectsIntersect()

```ts
function rectsIntersect(
   r1x, 
   r1y, 
   w1, 
   h1, 
   r2x, 
   r2y, 
   w2, 
   h2): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:168](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/numbers/geometry.ts#L168)

Determines whether two rectangles intersect.

## Parameters

### r1x

`number`

The x-coordinate of the top-left corner of the first rectangle.

### r1y

`number`

The y-coordinate of the top-left corner of the first rectangle.

### w1

`number`

The width of the first rectangle.

### h1

`number`

The height of the first rectangle.

### r2x

`number`

The x-coordinate of the top-left corner of the second rectangle.

### r2y

`number`

The y-coordinate of the top-left corner of the second rectangle.

### w2

`number`

The width of the second rectangle.

### h2

`number`

The height of the second rectangle.

## Returns

`boolean`

Returns `true` if the rectangles intersect, otherwise `false`.
