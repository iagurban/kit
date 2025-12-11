# Type Alias: Topic\<S, N\>

```ts
type Topic<S, N> = Readonly<{
  name: N;
  schema: S;
}>;
```

Defined in: [declare-events-topic.ts:12](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/zod/declare-events-topic.ts#L12)

Represents a Topic with a unique name and an associated schema.

## Type Parameters

### S

`S` *extends* `z.ZodMiniType`

The Zod schema type associated with the topic.

### N

`N` *extends* `string` = `string`

The name of the topic, defaults to string if not specified.
