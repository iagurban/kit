# Type Alias: ReadonlyJsonValue

```ts
type ReadonlyJsonValue = JsonScalar | ReadonlyJsonArray | ReadonlyJsonObject;
```

Defined in: [IdeaProjects/kit/kit/src/core/json/readonly-json-type.ts:17](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/json/readonly-json-type.ts#L17)

Represents a read-only JSON value, which can be a scalar value,
a read-only array, or a read-only object.

This type is intended to ensure that JSON-like data structures
are treated as immutable, preventing modification of their contents.

Components:
- `JsonScalar`: Represents primitive JSON values (string, number, boolean, or null).
- `ReadonlyJsonArray`: An array where elements are also `ReadonlyJsonValue`.
- `ReadonlyJsonObject`: An object where values are `ReadonlyJsonValue`.
