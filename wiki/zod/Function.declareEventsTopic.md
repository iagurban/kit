# Function: declareEventsTopic()

```ts
function declareEventsTopic<S, N>(name, schema): Topic<S, N>;
```

Defined in: [declare-events-topic.ts:23](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/zod/declare-events-topic.ts#L23)

Declares an event topic with the specified name and schema.

## Type Parameters

### S

`S` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The Zod schema type used to validate the event topic's data.

### N

`N` *extends* `string`

A string representing the name of the event topic.

## Parameters

### name

`N`

The name of the event topic.

### schema

`S`

The schema used to validate the event topic's data.

## Returns

[`Topic`](TypeAlias.Topic.md)\<`S`, `N`\>

An object representing the event topic, including its name and validation schema.
