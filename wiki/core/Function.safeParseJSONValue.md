# Function: safeParseJSONValue()

```ts
function safeParseJSONValue(stringValue, fallback?): JsonValue;
```

Defined in: [IdeaProjects/kit/kit/src/core/json/safe-parse-json-value.ts:15](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/json/safe-parse-json-value.ts#L15)

Safely parses a JSON-encoded string into its corresponding JavaScript value.
If parsing fails, either a custom fallback function or the original string is returned.

## Parameters

### stringValue

`string`

The string to parse as JSON.

### fallback?

(`error`) => [`JsonValue`](TypeAlias.JsonValue.md)

An optional callback invoked
       when the parsing process fails, receiving the error as an argument.
       Should return a fallback value to replace the parsed result.

## Returns

[`JsonValue`](TypeAlias.JsonValue.md)

- The parsed value if successful. If parsing fails,
         returns the result of the fallback function if provided, or the
         original string value otherwise.
