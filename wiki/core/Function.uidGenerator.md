# Function: uidGenerator()

```ts
function uidGenerator(): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/uid-generator.ts:29](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/uid-generator.ts#L29)

Generates a unique identifier string.

The `uidGenerator` function creates a unique identifier combining a
timestamp-derived component and a random component.
The first part of the identifier is generated using the current
timestamp modulo `dateMask`, converted through the `from10` function.
The second part is a random string provided by the `randomGen` function.

Ensure that `from10()` and `randomGen()` are defined and accessible in
the context where this function is used.

This function is useful for creating compact and unique identifiers
for various application needs.

## Returns

`string`

A unique string identifier.
