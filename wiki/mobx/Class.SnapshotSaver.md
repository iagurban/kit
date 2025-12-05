# Class: SnapshotSaver\<S\>

Defined in: [mobx/snapshot-saver.ts:13](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/mobx/snapshot-saver.ts#L13)

A utility class for saving snapshots with throttle control and error handling. The class ensures that snapshots
are saved in a controlled manner, with throttled save requests, handling successive save requests efficiently,
and retrying in case of failures.

## Type Parameters

### S

`S`

The type of the snapshot data structure to be saved.

## Methods

### reaction() {#reaction}

```ts
reaction(node): IReactionDisposer;
```

Defined in: [mobx/snapshot-saver.ts:82](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/mobx/snapshot-saver.ts#L82)

Creates a reaction that observes changes in the snapshot of the given node
and performs an action when changes are detected.

#### Parameters

##### node

`S`

The observable node to watch for changes.

#### Returns

`IReactionDisposer`

Returns a disposer function to stop the reaction.

***

### save() {#save}

```ts
save(snapshot): void;
```

Defined in: [mobx/snapshot-saver.ts:30](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/mobx/snapshot-saver.ts#L30)

Saves a snapshot. Ensures that multiple save requests are throttled and managed to avoid race conditions
and excessive save operations. If a save is already in progress, the method queues the latest snapshot to be saved after the current one completes.

#### Parameters

##### snapshot

`SnapshotInOf`\<`S`\>

The snapshot data to be saved.

#### Returns

`void`
