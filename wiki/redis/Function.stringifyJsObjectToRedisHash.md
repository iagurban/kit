# Function: stringifyJsObjectToRedisHash()

```ts
function stringifyJsObjectToRedisHash(data): Record<string, string>;
```

Defined in: [redis-helpers.ts:105](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/redis/redis-helpers.ts#L105)

Prepares a JavaScript object for consistent storage in a Redis Hash.
All field values are individually JSON.stringified to preserve type information.

## Parameters

### data

`JsonObject`

The JavaScript object (JsonObject) to store.

## Returns

`Record`\<`string`, `string`\>

A Record<string, string> where all values are JSON strings.
