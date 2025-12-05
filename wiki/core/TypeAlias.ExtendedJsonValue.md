# Type Alias: ExtendedJsonValue

```ts
type ExtendedJsonValue = ExtendedJsonScalar | ExtendedJsonArray | ExtendedJsonObject;
```

Defined in: [IdeaProjects/kit/kit/src/core/json/extended-json-type.ts:16](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/json/extended-json-type.ts#L16)

Represents an extended JSON value which can be one of the following:
- A scalar value (e.g., string, number, boolean, null, or other primitive types)
- An array of extended JSON values
- An object with string keys and extended JSON values as values

The ExtendedJsonValue type is designed for scenarios where JSON-like data structures
need additional flexibility while maintaining type safety across various nested levels.

This type can be used for defining complex data structures that extend beyond
the basic JSON specification but remain compatible with JSON-like formatting.
