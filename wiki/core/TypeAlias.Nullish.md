# Type Alias: Nullish

```ts
type Nullish = null | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:39](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/types.ts#L39)

Represents a type that can be either `null` or `undefined`.

This type is useful in cases where a value is explicitly allowed
to be missing or not set, and it is necessary to differentiate
between other valid types.

Commonly used for optional values or to indicate an absence of data.
