# Function: putJSONToRedisHash()

```ts
function putJSONToRedisHash(
   redis, 
   key, 
   object, 
options): Promise<void>;
```

Defined in: [redis-helpers.ts:110](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/redis-helpers.ts#L110)

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
