# Type Alias: ReadonlyExtendedJsonValue

```ts
type ReadonlyExtendedJsonValue = 
  | ExtendedJsonScalar
  | ReadonlyExtendedJsonArray
  | ReadonlyExtendedJsonObject;
```

Defined in: [IdeaProjects/kit/kit/src/core/json/readonly-extended-json-type.ts:11](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/json/readonly-extended-json-type.ts#L11)

Represents an extended JSON value that is immutable. This can be any of the following types:
- An `ExtendedJsonScalar`, which includes scalar values like strings, numbers, or booleans.
- A `ReadonlyExtendedJsonArray`, which is an immutable array of extended JSON values.
- A `ReadonlyExtendedJsonObject`, which is an immutable object with values that are extended JSON values.
