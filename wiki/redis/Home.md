# @grbn/kit

## Classes

- [CachedResource](Class.CachedResource.md)
- [RedisPubsubSubscription](Class.RedisPubsubSubscription.md)

## Type Aliases

- [RedisHashOptions](TypeAlias.RedisHashOptions.md)

## Functions

- [getRedisHashToJSON](Function.getRedisHashToJSON.md)
- [putJSONToRedisHash](Function.putJSONToRedisHash.md)
- [stringifyJsObjectToRedisHash](Function.stringifyJsObjectToRedisHash.md)


# Class: CachedResource\<T\>

Defined in: [cached-resource.ts:14](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/cached-resource.ts#L14)

A class that manages a cached resource, providing the ability to fetch data,
subscribe to updates, and handle cleanup when the application shuts down.

Synchronous subscribing, asynchronous initialization. On update the client manages
his fetching approach - usually he just invalidates something to a call to the fetch()
be performed to get a new promise for data.

## Type Parameters

### T `T`

The type of the resource being managed.

## Methods

### destroy() {#destroy}

```ts
destroy(): Promise<void>;
```

Defined in: [cached-resource.ts:107](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/cached-resource.ts#L107)

Cleans up the subscription.
This should be called from the parent service's `onApplicationShutdown`.

#### Returns `Promise`\<`void`\>

***

### fetch() {#fetch}

```ts
fetch(force): Promise<T>;
```

Defined in: [cached-resource.ts:82](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/cached-resource.ts#L82)

Initiates a fetch operation for retrieving data, returning a cached result unless forced.

#### Parameters

##### force `boolean` = `false`

A flag to force fetching the data, bypassing the cache. Defaults to false.

#### Returns `Promise`\<`T`\>

A promise that resolves to the fetched data.

***

### initialize() {#initialize}

```ts
initialize(): Promise<void>;
```

Defined in: [cached-resource.ts:56](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/cached-resource.ts#L56)

Initializes the resource by fetching the initial data and subscribing to updates.
This should be called from the parent service's `onModuleInit`.

#### Returns `Promise`\<`void`\>

***

### subscribe() {#subscribe}

```ts
subscribe(onUpdate): () => void;
```

Defined in: [cached-resource.ts:69](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/cached-resource.ts#L69)

Subscribes a callback function to be invoked on updates.

#### Parameters

##### onUpdate

(`self`) => `void`

The callback function to execute when an update occurs.

#### Returns

A function to unsubscribe the callback.

```ts
(): void;
```

##### Returns `void`


# Class: RedisPubsubSubscription

Defined in: [redis-pubsub-subscription.ts:16](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-pubsub-subscription.ts#L16)

This class represents a Redis pub/sub subscription handler. It manages subscribing,
unsubscribing, and handling messages from a specific Redis channel. The class ensures
resilience by implementing automatic resubscription in case of connection issues.

## Constructors

### Constructor

```ts
new RedisPubsubSubscription(
   loggerBase, 
   subscriber, 
   channel, 
   handlers): RedisPubsubSubscription;
```

Defined in: [redis-pubsub-subscription.ts:33](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-pubsub-subscription.ts#L33)

Constructor for creating an instance of a subscription handler.

#### Parameters

##### loggerBase `ILogger`

A logger instance used for logging errors and events.

##### subscriber `IPubSubSubscriberService`

An instance of a pub/sub subscriber service.

##### channel `string`

The channel name to subscribe to for receiving messages.

##### handlers

Object containing callback functions for various subscription events.

###### onBuffer?

(`buffer`) => `void`

Callback invoked when a message is received as a buffer.

###### onError?

(`error`, `message`) => `void`

A callback to be executed when the Redis client successfully connects or reconnects.
Currently, the onError will be called only at the failed start of subscription, and with null message.

###### onMessage

(`message`) => `void`

Callback invoked when a message is received as a string.

###### onSubscribed?

() => `void`

Callback invoked when successfully subscribed to the channel.

#### Returns `RedisPubsubSubscription`

## Methods

### activate() {#activate}

```ts
activate(): Promise<void>;
```

Defined in: [redis-pubsub-subscription.ts:163](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-pubsub-subscription.ts#L163)

Activates the current instance by setting it to active and establishing necessary subscriptions.
Ensures the instance is not already active before proceeding. Upon activation, it sets up message
listeners and initiates an initial subscription attempt.

#### Returns `Promise`\<`void`\>

A promise that resolves once the activation logic has completed.

***

### deactivate() {#deactivate}

```ts
deactivate(): Promise<void>;
```

Defined in: [redis-pubsub-subscription.ts:180](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-pubsub-subscription.ts#L180)

Deactivates the current subscriber instance if it is active.
This method unsubscribes from the specified channel and cleans up resources.

#### Returns `Promise`\<`void`\>

A promise that resolves when the deactivation process is complete.


# Function: getRedisHashToJSON()

```ts
function getRedisHashToJSON(
   redis, 
   key, 
options): Promise<JsonObject | null>;
```

Defined in: [redis-helpers.ts:27](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-helpers.ts#L27)

Retrieves all fields of a Redis Hash, converts the string values back to their
native JavaScript types using JSON.parse(), and returns the resulting object.

This function assumes values were stored using JSON.stringify() to preserve types.

## Parameters

### redis `Redis`

The Redis client instance.

### key `string`

The Redis key of the Hash.

### options

[`RedisHashOptions`](TypeAlias.RedisHashOptions.md) = `{}`

Optional configuration, including a fallback function.

## Returns

`Promise`\<`JsonObject` \| `null`\>

A JavaScript object with typed values, or null if the hash is empty or not found.


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

### redis `Redis`

The Redis client instance.

### key `string`

The Redis key of the Hash to write to.

### object `JsonObject`

The JavaScript object (JsonObject) to store.

### options

Optional configuration, including TTL (in seconds).

#### ttl? `number`

## Returns

`Promise`\<`void`\>


# Function: stringifyJsObjectToRedisHash()

```ts
function stringifyJsObjectToRedisHash(data): Record<string, string>;
```

Defined in: [redis-helpers.ts:87](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-helpers.ts#L87)

Prepares a JavaScript object for consistent storage in a Redis Hash.
All field values are individually JSON.stringified to preserve type information.

## Parameters

### data `JsonObject`

The JavaScript object (JsonObject) to store.

## Returns

`Record`\<`string`, `string`\>

A Record<string, string> where all values are JSON strings.


# Type Alias: RedisHashOptions

```ts
type RedisHashOptions = object;
```

Defined in: [redis-helpers.ts:8](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-helpers.ts#L8)

Options for Redis Hash conversion.

## Properties

### fallback()? {#fallback}

```ts
optional fallback: (stringValue, field, error) => JsonValue;
```

Defined in: [redis-helpers.ts:13](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/redis/redis-helpers.ts#L13)

Optional function to handle string values that fail JSON.parse.
Accepts the problematic string value and must return a JsonValue.

#### Parameters

##### stringValue `string`

##### field `string`

##### error `unknown`

#### Returns `JsonValue`
