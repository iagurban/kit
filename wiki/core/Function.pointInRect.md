# Function: pointInRect()

```ts
function pointInRect(
   px, 
   py, 
   rx, 
   ry, 
   width, 
   height): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:146](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/numbers/geometry.ts#L146)

Determines whether a point lies within a given rectangle.

## Parameters

### px

`number`

The x-coordinate of the point to check.

### py

`number`

The y-coordinate of the point to check.

### rx

`number`

The x-coordinate of the top-left corner of the rectangle.

### ry

`number`

The y-coordinate of the top-left corner of the rectangle.

### width

`number`

The width of the rectangle.

### height

`number`

The height of the rectangle.

## Returns

`boolean`

Returns true if the point (px, py) is within the bounds of the rectangle, otherwise false.
