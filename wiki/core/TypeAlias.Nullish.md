# Type Alias: Nullish

```ts
type Nullish = null | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:39](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/types.ts#L39)

Represents a type that can be either `null` or `undefined`.

This type is useful in cases where a value is explicitly allowed
to be missing or not set, and it is necessary to differentiate
between other valid types.

Commonly used for optional values or to indicate an absence of data.
