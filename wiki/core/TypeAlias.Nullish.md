# Type Alias: Nullish

```ts
type Nullish = null | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:39](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/types.ts#L39)

Represents a type that can be either `null` or `undefined`.

This type is useful in cases where a value is explicitly allowed
to be missing or not set, and it is necessary to differentiate
between other valid types.

Commonly used for optional values or to indicate an absence of data.
