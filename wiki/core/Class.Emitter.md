# Class: Emitter\<T\>

Defined in: [IdeaProjects/kit/kit/src/core/emitter.ts:19](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/emitter.ts#L19)

A generic Emitter class that implements an event emitter pattern.
This class allows adding event listeners for specific events, emitting events, and managing listeners.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, readonly `unknown`[]\>

A record type where keys represent event names, and values are tuple types describing
           the arguments expected by listeners for that event.

## Methods

### emit() {#emit}

```ts
emit<E>(e, ...data): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/emitter.ts:105](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/emitter.ts#L105)

Emits an event of the specified type, passing along any additional data to the registered listeners.
It invokes both persistent and one-time listeners for the given event.
If any listener throws an error during execution, those errors are collected and thrown as a group.

#### Type Parameters

##### E

`E` *extends* `string` \| `number` \| `symbol`

A specific event name, constrained to the keys of the event map T.

#### Parameters

##### e

`E`

The name of the event to emit.

##### data

...`ListenerArgs`\<`T`\[`E`\]\>

The additional arguments to pass to the listeners of the specified event.

#### Returns

`void`

#### Throws

If any of the listeners throw an error, those errors are collected and thrown together as a single error instance.

***

### off() {#off}

```ts
off<E>(e, listener): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/emitter.ts:87](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/emitter.ts#L87)

Removes the specified event listener for the given event from both persistent
and one-time listener collections. This method ensures that the listener is
no longer invoked when the specified event is emitted.

#### Type Parameters

##### E

`E` *extends* `string` \| `number` \| `symbol`

The type of event key within the event map.

#### Parameters

##### e

`E`

The event key for which the listener should be removed.

##### listener

`Listener`\<`T`\[`E`\]\>

The listener function to remove.

#### Returns

`void`

***

### on() {#on}

```ts
on<E>(e, listener): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/emitter.ts:61](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/emitter.ts#L61)

Registers an event listener for a specified event type and returns a function to remove the listener.

#### Type Parameters

##### E

`E` *extends* `string` \| `number` \| `symbol`

The type of the event key.

#### Parameters

##### e

`E`

The event type to listen for.

##### listener

`Listener`\<`T`\[`E`\]\>

The callback function to invoke when the event is emitted.

#### Returns

A function that, when executed, removes the registered event listener.

```ts
(): void;
```

##### Returns

`void`

***

### once() {#once}

```ts
once<E>(e, listener): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/emitter.ts:75](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/emitter.ts#L75)

Registers a one-time event listener for a specific event type. The listener will be automatically
removed after its first invocation. Returns a function to manually remove the listener before it
is triggered.

#### Type Parameters

##### E

`E` *extends* `string` \| `number` \| `symbol`

The name of the specific event to listen to.

#### Parameters

##### e

`E`

The event name to register the listener for.

##### listener

`Listener`\<`T`\[`E`\]\>

The listener function to execute when the event is triggered.

#### Returns

A function to manually remove this listener.

```ts
(): void;
```

##### Returns

`void`
