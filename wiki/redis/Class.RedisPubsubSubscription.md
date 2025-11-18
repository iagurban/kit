# Class: RedisPubsubSubscription

Defined in: [redis-pubsub-subscription.ts:16](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/redis/redis-pubsub-subscription.ts#L16)

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

Defined in: [redis-pubsub-subscription.ts:33](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/redis/redis-pubsub-subscription.ts#L33)

Constructor for creating an instance of a subscription handler.

#### Parameters

##### loggerBase

`ILogger`

A logger instance used for logging errors and events.

##### subscriber

`IPubSubSubscriberService`

An instance of a pub/sub subscriber service.

##### channel

`string`

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

#### Returns

`RedisPubsubSubscription`

## Methods

### activate() {#activate}

```ts
activate(): Promise<void>;
```

Defined in: [redis-pubsub-subscription.ts:163](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/redis/redis-pubsub-subscription.ts#L163)

Activates the current instance by setting it to active and establishing necessary subscriptions.
Ensures the instance is not already active before proceeding. Upon activation, it sets up message
listeners and initiates an initial subscription attempt.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the activation logic has completed.

***

### deactivate() {#deactivate}

```ts
deactivate(): Promise<void>;
```

Defined in: [redis-pubsub-subscription.ts:180](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/redis/redis-pubsub-subscription.ts#L180)

Deactivates the current subscriber instance if it is active.
This method unsubscribes from the specified channel and cleans up resources.

#### Returns

`Promise`\<`void`\>

A promise that resolves when the deactivation process is complete.
