# Type Alias: JsonValue

```ts
type JsonValue = JsonScalar | JsonObject | JsonArray;
```

Defined in: [IdeaProjects/kit/kit/src/core/json/json-type.ts:12](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/json/json-type.ts#L12)

Represents a JSON value that can either be a scalar, an object, or an array.

JsonValue is a TypeScript type union combining the following:
- JsonScalar: Represents primitive JSON values such as strings, numbers, booleans, or null.
- JsonObject: Represents a JSON object, which is a collection of key-value pairs where keys are strings and values are other JSON values.
- JsonArray: Represents a JSON array, which is an ordered list of JSON values.
