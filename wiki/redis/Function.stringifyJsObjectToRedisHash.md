# Function: stringifyJsObjectToRedisHash()

```ts
function stringifyJsObjectToRedisHash(data): Record<string, string>;
```

Defined in: [redis-helpers.ts:87](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/redis/redis-helpers.ts#L87)

Prepares a JavaScript object for consistent storage in a Redis Hash.
All field values are individually JSON.stringified to preserve type information.

## Parameters

### data

`JsonObject`

The JavaScript object (JsonObject) to store.

## Returns

`Record`\<`string`, `string`\>

A Record<string, string> where all values are JSON strings.
