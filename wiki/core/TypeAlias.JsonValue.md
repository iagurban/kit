# Type Alias: JsonValue

```ts
type JsonValue = JsonScalar | JsonObject | JsonArray;
```

Defined in: [IdeaProjects/kit/kit/src/core/json/json-type.ts:12](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/json/json-type.ts#L12)

Represents a JSON value that can either be a scalar, an object, or an array.

JsonValue is a TypeScript type union combining the following:
- JsonScalar: Represents primitive JSON values such as strings, numbers, booleans, or null.
- JsonObject: Represents a JSON object, which is a collection of key-value pairs where keys are strings and values are other JSON values.
- JsonArray: Represents a JSON array, which is an ordered list of JSON values.
