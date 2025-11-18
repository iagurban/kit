# Function: snap()

```ts
function snap(
   x, 
   step, 
   mode?): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:15](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L15)

Adjusts a given number to the nearest multiple of a specified step size.
The adjustment can be controlled using an optional rounding mode.

## Parameters

### x

`number`

The number to be adjusted.

### step

`number`

The step size to which the number will be snapped.

### mode?

Optional rounding mode to apply; defaults to 'round' if not provided.
Valid values are:
  - 'ceil': Rounds up to the nearest step.
  - 'floor': Rounds down to the nearest step.
  - 'round': Rounds to the nearest step based on standard rounding rules.

`"ceil"` | `"floor"` | `"round"`

## Returns

`number`

The adjusted value, snapped to the nearest multiple of the step size.
