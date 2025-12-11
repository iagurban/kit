# Function: getRedisHashToValuesByFields()

```ts
function getRedisHashToValuesByFields(
   redis, 
   key, 
   fields, 
options): Promise<JsonValue[]>;
```

Defined in: [redis-helpers.ts:53](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/redis/redis-helpers.ts#L53)

Retrieves the values of specified fields of a Redis Hash, converts the string values back to their
native JavaScript types using JSON.parse(), and returns the resulting array of values.

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

`Promise`\<`JsonValue`[]\>

An array of JavaScript values with typed values.
