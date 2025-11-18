# Class: CachedResource\<T\>

Defined in: [cached-resource.ts:14](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/redis/cached-resource.ts#L14)

A class that manages a cached resource, providing the ability to fetch data,
subscribe to updates, and handle cleanup when the application shuts down.

Synchronous subscribing, asynchronous initialization. On update the client manages
his fetching approach - usually he just invalidates something to a call to the fetch()
be performed to get a new promise for data.

## Type Parameters

### T

`T`

The type of the resource being managed.

## Methods

### destroy() {#destroy}

```ts
destroy(): Promise<void>;
```

Defined in: [cached-resource.ts:107](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/redis/cached-resource.ts#L107)

Cleans up the subscription.
This should be called from the parent service's `onApplicationShutdown`.

#### Returns

`Promise`\<`void`\>

***

### fetch() {#fetch}

```ts
fetch(force): Promise<T>;
```

Defined in: [cached-resource.ts:82](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/redis/cached-resource.ts#L82)

Initiates a fetch operation for retrieving data, returning a cached result unless forced.

#### Parameters

##### force

`boolean` = `false`

A flag to force fetching the data, bypassing the cache. Defaults to false.

#### Returns

`Promise`\<`T`\>

A promise that resolves to the fetched data.

***

### initialize() {#initialize}

```ts
initialize(): Promise<void>;
```

Defined in: [cached-resource.ts:56](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/redis/cached-resource.ts#L56)

Initializes the resource by fetching the initial data and subscribing to updates.
This should be called from the parent service's `onModuleInit`.

#### Returns

`Promise`\<`void`\>

***

### subscribe() {#subscribe}

```ts
subscribe(onUpdate): () => void;
```

Defined in: [cached-resource.ts:69](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/redis/cached-resource.ts#L69)

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

##### Returns

`void`
