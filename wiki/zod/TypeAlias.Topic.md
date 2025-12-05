# Type Alias: Topic\<S, N\>

```ts
type Topic<S, N> = Readonly<{
  name: N;
  schema: S;
}>;
```

Defined in: [declare-events-topic.ts:12](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/declare-events-topic.ts#L12)

Represents a Topic with a unique name and an associated schema.

## Type Parameters

### S

`S` *extends* `z.ZodType`

The Zod schema type associated with the topic.

### N

`N` *extends* `string` = `string`

The name of the topic, defaults to string if not specified.
