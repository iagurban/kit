# Type Alias: RecordValues\<T\>

```ts
type RecordValues<T> = T[keyof T];
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:105](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/types.ts#L105)

A utility type that extracts the values of an object type.

The `RecordValues` type allows you to get the union of all the values
that can be accessed from the specified object type `T`. This is helpful
for scenarios where you need to work with the possible values of an object
rather than its keys.

## Type Parameters

### T

`T`

The object type from which the values will be extracted.
