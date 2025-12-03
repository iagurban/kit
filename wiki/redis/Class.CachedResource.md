# Class: CachedResource\<T\>

Defined in: [cached-resource.ts:14](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/cached-resource.ts#L14)

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

Defined in: [cached-resource.ts:114](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/cached-resource.ts#L114)

Cleans up the subscription.
This should be called from the parent service's `onApplicationShutdown`.

#### Returns

`Promise`\<`void`\>

***

### fetch() {#fetch}

```ts
fetch(force): Promise<T>;
```

Defined in: [cached-resource.ts:89](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/cached-resource.ts#L89)

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

Defined in: [cached-resource.ts:63](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/cached-resource.ts#L63)

Initializes the resource by fetching the initial data and subscribing to updates.
This should be called from the parent service's `onModuleInit`.

#### Returns

`Promise`\<`void`\>

***

### subscribe() {#subscribe}

```ts
subscribe(onUpdate): () => void;
```

Defined in: [cached-resource.ts:76](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/redis/cached-resource.ts#L76)

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
