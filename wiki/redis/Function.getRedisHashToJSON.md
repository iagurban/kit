# Function: getRedisHashToJSON()

```ts
function getRedisHashToJSON(
   redis, 
   key, 
options): Promise<JsonObject | null>;
```

Defined in: [redis-helpers.ts:27](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/redis/redis-helpers.ts#L27)

Retrieves all fields of a Redis Hash, converts the string values back to their
native JavaScript types using JSON.parse(), and returns the resulting object.

This function assumes values were stored using JSON.stringify() to preserve types.

## Parameters

### redis

`Redis`

The Redis client instance.

### key

`string`

The Redis key of the Hash.

### options

[`RedisHashOptions`](TypeAlias.RedisHashOptions.md) = `{}`

Optional configuration, including a fallback function.

## Returns

`Promise`\<`JsonObject` \| `null`\>

A JavaScript object with typed values, or null if the hash is empty or not found.
