# Function: putJSONToRedisHash()

```ts
function putJSONToRedisHash(
   redis, 
   key, 
   object, 
options): Promise<void>;
```

Defined in: [redis-helpers.ts:107](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-helpers.ts#L107)

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
