# Function: getRedisHashToJSONByFields()

```ts
function getRedisHashToJSONByFields(
   redis, 
   key, 
   fields, 
options): Promise<JsonObject | null>;
```

Defined in: [redis-helpers.ts:79](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/redis/redis-helpers.ts#L79)

Retrieves the specified fields of a Redis Hash, converts the string values back to their
native JavaScript types using JSON.parse(), and returns the resulting object.

## Parameters

### redis

`Redis`

The Redis client instance.

### key

`string`

The Redis key of the Hash.

### fields

readonly `string`[]

The fields to retrieve.

### options

[`RedisHashOptions`](TypeAlias.RedisHashOptions.md) = `{}`

Optional configuration, including a fallback function.

## Returns

`Promise`\<`JsonObject` \| `null`\>

A JavaScript object with typed values, or null if the hash is empty or not found.
