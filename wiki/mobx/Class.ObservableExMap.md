# Class: ObservableExMap\<Key, Value\>

Defined in: [mobx/observable-ex-map.ts:24](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/mobx/observable-ex-map.ts#L24)

The `ObservableExMap` class extends the functionality of the `ExMap` class
by incorporating MobX observability. This makes it possible to use reactive
programming techniques with the map structure, allowing the state to be
observed and its changes to trigger reactions.

## Remarks

This class makes its internal map observable using MobX's `makeObservable`.
This allows consumers to listen for changes (addition, removal, updates)
in the map and react to those changes automatically.

## Param

An optional set of key-value pairs
to initialize the map.

## Extends

- `ExMap`\<`Key`, `Value`\>

## Type Parameters

### Key

`Key`

The type of keys maintained by this map.

### Value

`Value`

The type of mapped values.

## Accessors

### \[toStringTag\] {#tostringtag}

#### Get Signature

```ts
get toStringTag: string;
```

Defined in: [core/collections/ex-map.ts:277](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L277)

##### Returns

`string`

The string tag for this object

#### Inherited from

```ts
ExMap.[toStringTag]
```

***

### size {#size}

#### Get Signature

```ts
get size(): number;
```

Defined in: [core/collections/ex-map.ts:79](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L79)

##### Returns

`number`

The number of key-value pairs in the map

#### Inherited from

```ts
ExMap.size
```

## Methods

### \[iterator\]() {#iterator}

```ts
iterator: MapIterator<[Key, Value]>;
```

Defined in: [core/collections/ex-map.ts:257](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L257)

#### Returns

`MapIterator`\<\[`Key`, `Value`\]\>

Iterator for [key, value] pairs

#### Inherited from

```ts
ExMap.[iterator]
```

***

### assign() {#assign}

```ts
assign(other): this;
```

Defined in: [core/collections/ex-map.ts:199](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L199)

Adds all entries from another iterable to this map

#### Parameters

##### other

`Iterable`\<readonly \[`Key`, `Value`\]\>

Iterable of key-value pairs to add

#### Returns

`this`

This map instance for chaining

#### Mutates

#### Inherited from

```ts
ExMap.assign
```

***

### backup() {#backup}

```ts
backup(fn?): () => void;
```

Defined in: [core/collections/ex-map.ts:211](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L211)

Creates a backup of the current map state and returns a restore function

#### Parameters

##### fn?

(`o`) => `ExMap`\<`Key`, `Value`\>

Optional transformation function to apply to the backup

#### Returns

Function that when called restores the map to its backed up state

```ts
(): void;
```

##### Returns

`void`

#### Inherited from

```ts
ExMap.backup
```

***

### clear() {#clear}

```ts
clear(): void;
```

Defined in: [core/collections/ex-map.ts:23](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L23)

Removes all elements from the map

#### Returns

`void`

#### Mutates

#### Inherited from

```ts
ExMap.clear
```

***

### delete() {#delete}

```ts
delete(key): boolean;
```

Defined in: [core/collections/ex-map.ts:33](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L33)

Removes a key and its associated value from the map

#### Parameters

##### key

`Key`

The key to remove

#### Returns

`boolean`

true if the key existed and was removed, false otherwise

#### Mutates

#### Inherited from

```ts
ExMap.delete
```

***

### deleteKeys() {#deletekeys}

```ts
deleteKeys(keys): this;
```

Defined in: [core/collections/ex-map.ts:186](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L186)

Removes multiple keys from the map

#### Parameters

##### keys

`Iterable`\<`Key`\>

Keys to remove

#### Returns

`this`

This map instance for chaining

#### Mutates

#### Inherited from

```ts
ExMap.deleteKeys
```

***

### entries() {#entries}

```ts
entries(): MapIterator<[Key, Value]>;
```

Defined in: [core/collections/ex-map.ts:262](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L262)

#### Returns

`MapIterator`\<\[`Key`, `Value`\]\>

Iterator for [key, value] pairs

#### Inherited from

```ts
ExMap.entries
```

***

### filter() {#filter}

#### Call Signature

```ts
filter<R>(by): ExMap<Key, R>;
```

Defined in: [core/collections/ex-map.ts:224](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L224)

Creates a new map containing only entries that satisfy the predicate

##### Type Parameters

###### R

`R`

##### Parameters

###### by

(`v`, `k`) => `v is R`

Predicate function to test entries

##### Returns

`ExMap`\<`Key`, `R`\>

New map with filtered entries

##### Inherited from

```ts
ExMap.filter
```

#### Call Signature

```ts
filter(by): ExMap<Key, Value>;
```

Defined in: [core/collections/ex-map.ts:225](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L225)

Creates a new map containing only entries that satisfy the predicate

##### Parameters

###### by

(`v`, `k`) => `boolean`

Predicate function to test entries

##### Returns

`ExMap`\<`Key`, `Value`\>

New map with filtered entries

##### Inherited from

```ts
ExMap.filter
```

***

### forEach() {#foreach}

```ts
forEach(by): void;
```

Defined in: [core/collections/ex-map.ts:42](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L42)

Executes a callback for each key-value pair in the map

#### Parameters

##### by

(`value`, `key`, `self`) => `void`

Function to execute for each element

#### Returns

`void`

#### Inherited from

```ts
ExMap.forEach
```

***

### freeze() {#freeze}

```ts
freeze(): Omit<ExMap<Key, Value>, 
  | "set"
  | "delete"
  | "clear"
  | "deleteKeys"
  | "update"
  | "overwrite"
| "getOrCreate">;
```

Defined in: [core/collections/ex-map.ts:234](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L234)

Creates an immutable version of this map

#### Returns

`Omit`\<`ExMap`\<`Key`, `Value`\>, 
  \| `"set"`
  \| `"delete"`
  \| `"clear"`
  \| `"deleteKeys"`
  \| `"update"`
  \| `"overwrite"`
  \| `"getOrCreate"`\>

Frozen map that throws on mutation attempts

#### Inherited from

```ts
ExMap.freeze
```

***

### get() {#get}

```ts
get(key): Value | undefined;
```

Defined in: [core/collections/ex-map.ts:53](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L53)

Retrieves the value associated with a key

#### Parameters

##### key

`Key`

The key to look up

#### Returns

`Value` \| `undefined`

The value associated with the key, or undefined if the key doesn't exist

#### Inherited from

```ts
ExMap.get
```

***

### getOrCreate() {#getorcreate}

```ts
getOrCreate(
   key, 
   create, 
   onExisted?): Value;
```

Defined in: [core/collections/ex-map.ts:132](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L132)

Gets a value from the map or creates it if it doesn't exist

#### Parameters

##### key

`Key`

Key to look up or create

##### create

(`key`) => `Value`

Function to create new value if key doesn't exist

##### onExisted?

(`v`, `k`) => `void`

Optional callback when key already exists

#### Returns

`Value`

Existing or newly created value

#### Mutates

when key doesn't exist

#### Inherited from

```ts
ExMap.getOrCreate
```

***

### has() {#has}

```ts
has(key): boolean;
```

Defined in: [core/collections/ex-map.ts:62](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L62)

Checks if a key exists in the map

#### Parameters

##### key

`Key`

The key to check for

#### Returns

`boolean`

true if the key exists, false otherwise

#### Inherited from

```ts
ExMap.has
```

***

### keys() {#keys}

```ts
keys(): MapIterator<Key>;
```

Defined in: [core/collections/ex-map.ts:267](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L267)

#### Returns

`MapIterator`\<`Key`\>

Iterator for map keys

#### Inherited from

```ts
ExMap.keys
```

***

### mapEntries() {#mapentries}

```ts
mapEntries<NewValue>(by): ExMap<Key, NewValue>;
```

Defined in: [core/collections/ex-map.ts:158](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L158)

Creates a new map by transforming values while keeping the same keys

#### Type Parameters

##### NewValue

`NewValue`

#### Parameters

##### by

(`value`, `key`) => `NewValue`

Function to transform values

#### Returns

`ExMap`\<`Key`, `NewValue`\>

New map with transformed values

#### Inherited from

```ts
ExMap.mapEntries
```

***

### set() {#set}

```ts
set(key, value): this;
```

Defined in: [core/collections/ex-map.ts:73](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L73)

Associates a key with a value in the map

#### Parameters

##### key

`Key`

The key to set

##### value

`Value`

The value to associate with the key

#### Returns

`this`

This map instance for chaining

#### Mutates

#### Inherited from

```ts
ExMap.set
```

***

### toArray() {#toarray}

```ts
toArray<NewValue>(by): NewValue[];
```

Defined in: [core/collections/ex-map.ts:167](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L167)

Converts map entries to an array using a transform function

#### Type Parameters

##### NewValue

`NewValue`

#### Parameters

##### by

(`value`, `key`) => `NewValue`

Function to transform each key-value pair

#### Returns

`NewValue`[]

Array of transformed values

#### Inherited from

```ts
ExMap.toArray
```

***

### update() {#update}

```ts
update(key, value): this;
```

Defined in: [core/collections/ex-map.ts:149](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L149)

Updates a value in the map based on its current value

#### Parameters

##### key

`Key`

Key to update

##### value

(`old`, `key`) => `Value`

Function to compute new value from old value

#### Returns

`this`

This map instance for chaining

#### Mutates

#### Inherited from

```ts
ExMap.update
```

***

### values() {#values}

```ts
values(): MapIterator<Value>;
```

Defined in: [core/collections/ex-map.ts:272](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L272)

#### Returns

`MapIterator`\<`Value`\>

Iterator for map values

#### Inherited from

```ts
ExMap.values
```

***

### valuesToArray() {#valuestoarray}

```ts
valuesToArray<NewValue>(by): NewValue[];
```

Defined in: [core/collections/ex-map.ts:176](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L176)

Converts map values to an array using a transform function

#### Type Parameters

##### NewValue

`NewValue`

#### Parameters

##### by

(`value`) => `NewValue`

Function to transform each value

#### Returns

`NewValue`[]

Array of transformed values

#### Inherited from

```ts
ExMap.valuesToArray
```

***

### groupedBy() {#groupedby}

```ts
static groupedBy<Value, Key>(input, by): ExMap<Key, Value[]>;
```

Defined in: [core/collections/ex-map.ts:91](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L91)

Groups array elements by a key function, collecting values with the same key into arrays

#### Type Parameters

##### Value

`Value`

##### Key

`Key`

#### Parameters

##### input

`Iterable`\<`Value`\>

Array to group

##### by

(`value`) => `Key`

Function to derive the key for each element

#### Returns

`ExMap`\<`Key`, `Value`[]\>

Map of keys to arrays of values

#### Inherited from

```ts
ExMap.groupedBy
```

***

### mappedBy() {#mappedby}

```ts
static mappedBy<Value, Key>(input, by): ExMap<Key, Value>;
```

Defined in: [core/collections/ex-map.ts:114](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/collections/ex-map.ts#L114)

Creates a map from an array using a key function

#### Type Parameters

##### Value

`Value`

##### Key

`Key`

#### Parameters

##### input

`Iterable`\<`Value`\>

Array to convert to a map

##### by

(`value`) => `Key`

Function to derive the key for each element

#### Returns

`ExMap`\<`Key`, `Value`\>

Map of derived keys to original values

#### Inherited from

```ts
ExMap.mappedBy
```
