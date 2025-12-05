# Type Alias: OverrideFields\<T, O\>

```ts
type OverrideFields<T, O> = { [K in keyof T | keyof O]: K extends keyof O ? O[K] : K extends keyof T ? T[K] : never };
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:16](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/types.ts#L16)

A utility type that combines two types, T and O, allowing you to override the properties
of the first type, T, with the properties from the second type, O.

For every property key, the resolved type will:
- Use the type from O if the key exists in O.
- Otherwise, use the type from T if the key exists in T.
- If a key exists in neither, it will resolve to `never`.

This type is particularly useful when you need to modify or replace specific properties
of an existing type with another set of properties while maintaining compatibility.

## Type Parameters

### T

`T`

The original type whose fields can be overridden.

### O

`O`

The type containing fields and their types to override in the original type.
