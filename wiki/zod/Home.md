# @grbn/kit

## Type Aliases

- [Topic](TypeAlias.Topic.md)

## Variables

- [jsonLiteralSchema](Variable.jsonLiteralSchema.md)
- [jsonObjectSchema](Variable.jsonObjectSchema.md)
- [jsonValueSchema](Variable.jsonValueSchema.md)
- [stringifiedBigint](Variable.stringifiedBigint.md)
- [stringifiedISODate](Variable.stringifiedISODate.md)

## Functions

- [declareEventsTopic](Function.declareEventsTopic.md)
- [isZodInput](Function.isZodInput.md)
- [isZodOutput](Function.isZodOutput.md)


# Function: declareEventsTopic()

```ts
function declareEventsTopic<S, N>(name, schema): Topic<S, N>;
```

Defined in: [declare-events-topic.ts:23](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/declare-events-topic.ts#L23)

Declares an event topic with the specified name and schema.

## Type Parameters

### S `S` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The Zod schema type used to validate the event topic's data.

### N `N` *extends* `string`

A string representing the name of the event topic.

## Parameters

### name `N`

The name of the event topic.

### schema `S`

The schema used to validate the event topic's data.

## Returns

[`Topic`](TypeAlias.Topic.md)\<`S`, `N`\>

An object representing the event topic, including its name and validation schema.


# Function: isZodInput()

```ts
function isZodInput<T>(schema, o): o is input<T>;
```

Defined in: [zod-utils.ts:21](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/zod-utils.ts#L21)

Determines if a given value is "decodeable" input-value of the given Zod schema.

## Type Parameters

### T `T` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The type of the Zod schema.

## Parameters

### schema `T`

The Zod schema to validate against.

### o `unknown`

The input to check.

## Returns

`o is input<T>`

True if the input matches the schema's expected input type, otherwise false.


# Function: isZodOutput()

```ts
function isZodOutput<T>(schema, o): o is output<T>;
```

Defined in: [zod-utils.ts:32](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/zod-utils.ts#L32)

Determines if a given value is "encodeable" output-value of the given Zod schema.

## Type Parameters

### T `T` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The Zod schema type.

## Parameters

### schema `T`

The Zod schema to validate against.

### o `unknown`

The value to validate.

## Returns

`o is output<T>`

True if the value matches the schema's output type, otherwise false.


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

### S `S` *extends* `z.ZodType`

The Zod schema type associated with the topic.

### N `N` *extends* `string` = `string`

The name of the topic, defaults to string if not specified.


# Variable: jsonLiteralSchema

```ts
const jsonLiteralSchema: ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean, ZodNull]>;
```

Defined in: [json-schema.ts:9](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/json-schema.ts#L9)

A Zod schema for validating JSON literal values.
A JSON literal can be a string, number, boolean, or null.


# Variable: jsonObjectSchema

```ts
const jsonObjectSchema: ZodRecord<ZodString, ZodType<JsonValue, unknown, $ZodTypeInternals<JsonValue, unknown>>>;
```

Defined in: [json-schema.ts:40](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/json-schema.ts#L40)

A Zod schema for validating JSON objects.
A JSON object is a record with string keys and JSON values.


# Variable: jsonValueSchema

```ts
const jsonValueSchema: z.ZodType<JsonValue>;
```

Defined in: [json-schema.ts:26](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/json-schema.ts#L26)

Represents a Zod schema for validating JSON values, supporting recursive structures.
A JSON value can be a literal (string, number, boolean, or null), an array of JSON values,
or an object with string keys and JSON value entries.

This schema employs a lazy evaluation to allow for recursive structures, enabling validation
of nested arrays or objects that reference the schema itself.

The structure captures all possible valid JSON types as per the JSON standard:
- Literals: string, number, boolean, null
- Arrays of JSON values
- Objects with string keys and JSON value properties

Compatible with environments requiring the two-argument version of `z.record`.


# Variable: stringifiedBigint

```ts
const stringifiedBigint: ZodCodec<ZodString, ZodBigInt>;
```

Defined in: [stringified-types.ts:21](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/stringified-types.ts#L21)

A codec for handling the conversion between a stringified representation of
a bigint and its actual bigint value. This ensures strict validation and
transformation between the two forms.

The codec encodes a bigint value into its string representation and decodes
a stringified integer back into a bigint. During decoding, it verifies that
the input string matches the regular expression for a valid integer
representation, including optional '+' or '-' prefixes.

Validation ensures the input is:
- A string matching the regex /^[+-]?[0-9]+$/
- A valid integer string that can be safely converted to bigint

Fields:
- encode: A function that converts a bigint to its string representation.
- decode: A function that converts a valid integer string to a bigint.


# Variable: stringifiedISODate

```ts
const stringifiedISODate: ZodCodec<ZodISODateTime, ZodDate>;
```

Defined in: [stringified-types.ts:53](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/zod/stringified-types.ts#L53)

A Zod codec that validates and transforms ISO-formatted date strings.

This variable utilizes Zod's codec to work with ISO 8601-formatted date strings,
converting them into JavaScript `Date` objects and vice versa.

Validation Rules:
- The input must be a valid ISO 8601 date string.
- The resulting Date object should represent a valid date.

Encoding:
- Converts a `Date` object into an ISO 8601 string using `toISOString()`.

Decoding:
- Converts an ISO 8601 string into a `Date` object.

Refinement:
- Ensures that the decoded `Date` object represents a valid date.
- Throws an error if the date is invalid.

Throws:
- An error if the given date string is not valid or cannot be parsed into a valid `Date` object.
