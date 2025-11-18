# Function: boundingBox()

```ts
function boundingBox(points): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:372](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/numbers/geometry.ts#L372)

Calculates the bounding box of a given set of points.

## Parameters

### points

\[`number`, `number`\][]

An array of points where each point is represented as a tuple containing two numbers [x, y].

## Returns

`object`

An object describing the bounding box, including
- `x`: The smallest x-coordinate of the bounding box.
- `y`: The smallest y-coordinate of the bounding box.
- `width`: The width of the bounding box, calculated as the difference between the maximum and minimum x-coordinates.
- `height`: The height of the bounding box, calculated as the difference between the maximum and minimum y-coordinates.

### height

```ts
height: number;
```

### width

```ts
width: number;
```

### x

```ts
x: number;
```

### y

```ts
y: number;
```
