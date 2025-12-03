# Type Alias: Topic\<S, N\>

```ts
type Topic<S, N> = Readonly<{
  name: N;
  schema: S;
}>;
```

Defined in: [declare-events-topic.ts:12](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/zod/declare-events-topic.ts#L12)

Represents a Topic with a unique name and an associated schema.

## Type Parameters

### S

`S` *extends* `z.ZodType`

The Zod schema type associated with the topic.

### N

`N` *extends* `string` = `string`

The name of the topic, defaults to string if not specified.
