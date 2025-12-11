# Function: stringifyJsObjectToRedisHash()

```ts
function stringifyJsObjectToRedisHash(data): Record<string, string>;
```

Defined in: [redis-helpers.ts:105](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/redis/redis-helpers.ts#L105)

Prepares a JavaScript object for consistent storage in a Redis Hash.
All field values are individually JSON.stringified to preserve type information.

## Parameters

### data

`JsonObject`

The JavaScript object (JsonObject) to store.

## Returns

`Record`\<`string`, `string`\>

A Record<string, string> where all values are JSON strings.
