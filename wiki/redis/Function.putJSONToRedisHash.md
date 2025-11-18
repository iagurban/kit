# Function: putJSONToRedisHash()

```ts
function putJSONToRedisHash(
   redis, 
   key, 
   object, 
options): Promise<void>;
```

Defined in: [redis-helpers.ts:107](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/redis/redis-helpers.ts#L107)

Stores a JavaScript object into a Redis Hash key, atomically setting the fields
and an optional Time-To-Live (TTL) using a pipeline.

## Parameters

### redis

`Redis`

The Redis client instance.

### key

`string`

The Redis key of the Hash to write to.

### object

`JsonObject`

The JavaScript object (JsonObject) to store.

### options

Optional configuration, including TTL (in seconds).

#### ttl?

`number`

## Returns

`Promise`\<`void`\>
