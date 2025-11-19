# Type Alias: ReadonlyExtendedJsonValue

```ts
type ReadonlyExtendedJsonValue = 
  | ExtendedJsonScalar
  | ReadonlyExtendedJsonArray
  | ReadonlyExtendedJsonObject;
```

Defined in: [IdeaProjects/kit/kit/src/core/json/readonly-extended-json-type.ts:11](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/json/readonly-extended-json-type.ts#L11)

Represents an extended JSON value that is immutable. This can be any of the following types:
- An `ExtendedJsonScalar`, which includes scalar values like strings, numbers, or booleans.
- A `ReadonlyExtendedJsonArray`, which is an immutable array of extended JSON values.
- A `ReadonlyExtendedJsonObject`, which is an immutable object with values that are extended JSON values.
