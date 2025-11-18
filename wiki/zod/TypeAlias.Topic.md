# Type Alias: Topic\<S, N\>

```ts
type Topic<S, N> = Readonly<{
  name: N;
  schema: S;
}>;
```

Defined in: [declare-events-topic.ts:12](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/zod/declare-events-topic.ts#L12)

Represents a Topic with a unique name and an associated schema.

## Type Parameters

### S

`S` *extends* `z.ZodType`

The Zod schema type associated with the topic.

### N

`N` *extends* `string` = `string`

The name of the topic, defaults to string if not specified.
