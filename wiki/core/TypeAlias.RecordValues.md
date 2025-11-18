# Type Alias: RecordValues\<T\>

```ts
type RecordValues<T> = T[keyof T];
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:104](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/types.ts#L104)

A utility type that extracts the values of an object type.

The `RecordValues` type allows you to get the union of all the values
that can be accessed from the specified object type `T`. This is helpful
for scenarios where you need to work with the possible values of an object
rather than its keys.

## Type Parameters

### T

`T`

The object type from which the values will be extracted.
