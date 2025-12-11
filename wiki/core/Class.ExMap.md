# Class: ExMap\<Key, Value\>

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:6](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L6)

Extended Map implementation with additional utility methods and operations

## Type Parameters

### Key

`Key`

The type of keys in the map

### Value

`Value`

The type of values in the map

## Implements

- `ReadonlyMap`\<`Key`, `Value`\>
- `Map`\<`Key`, `Value`\>

## Constructors

### Constructor

```ts
new ExMap<Key, Value>(pairs?): ExMap<Key, Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:13](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L13)

Creates a new ExMap instance

#### Parameters

##### pairs?

`Iterable`\<\[`Key`, `Value`\], `any`, `any`\>

Optional iterable of key-value pairs to initialize the map

#### Returns

`ExMap`\<`Key`, `Value`\>

## Accessors

### \[toStringTag\] {#tostringtag}

#### Get Signature

```ts
get toStringTag: string;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:281](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L281)

##### Returns

`string`

The string tag for this object

#### Implementation of

```ts
Map.[toStringTag]
```

***

### size {#size}

#### Get Signature

```ts
get size(): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:78](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L78)

##### Returns

`number`

The number of key-value pairs in the map

#### Implementation of

```ts
ReadonlyMap.size
```

## Methods

### \[iterator\]() {#iterator}

```ts
iterator: MapIterator<[Key, Value]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:261](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L261)

#### Returns

`MapIterator`\<\[`Key`, `Value`\]\>

Iterator for [key, value] pairs

#### Implementation of

```ts
ReadonlyMap.[iterator]
```

***

### assign() {#assign}

```ts
assign(other): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:198](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L198)

Adds all entries from another iterable to this map

#### Parameters

##### other

`Iterable`\<readonly \[`Key`, `Value`\]\>

Iterable of key-value pairs to add

#### Returns

`this`

This map instance for chaining

#### Mutates

***

### backup() {#backup}

```ts
backup(fn?): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:210](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L210)

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

***

### clear() {#clear}

```ts
clear(): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:23](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L23)

Removes all elements from the map

#### Returns

`void`

#### Mutates

#### Implementation of

```ts
Map.clear
```

***

### delete() {#delete}

```ts
delete(key): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:33](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L33)

Removes a key and its associated value from the map

#### Parameters

##### key

`Key`

The key to remove

#### Returns

`boolean`

true if the key existed and was removed, false otherwise

#### Mutates

#### Implementation of

```ts
Map.delete
```

***

### deleteKeys() {#deletekeys}

```ts
deleteKeys(keys): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:185](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L185)

Removes multiple keys from the map

#### Parameters

##### keys

`Iterable`\<`Key`\>

Keys to remove

#### Returns

`this`

This map instance for chaining

#### Mutates

***

### entries() {#entries}

```ts
entries(): MapIterator<[Key, Value]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:266](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L266)

#### Returns

`MapIterator`\<\[`Key`, `Value`\]\>

Iterator for [key, value] pairs

#### Implementation of

```ts
ReadonlyMap.entries
```

***

### filter() {#filter}

#### Call Signature

```ts
filter<R>(by): ExMap<Key, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:223](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L223)

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

#### Call Signature

```ts
filter(by): ExMap<Key, Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:229](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L229)

Creates a new map containing only entries that satisfy the predicate

##### Parameters

###### by

(`v`, `k`) => `boolean`

Predicate function to test entries

##### Returns

`ExMap`\<`Key`, `Value`\>

New map with filtered entries

***

### forEach() {#foreach}

```ts
forEach(by): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:41](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L41)

Executes a callback for each key-value pair in the map

#### Parameters

##### by

(`value`, `key`, `self`) => `void`

Function to execute for each element

#### Returns

`void`

#### Implementation of

```ts
ReadonlyMap.forEach
```

***

### freeze() {#freeze}

```ts
freeze(): Omit<ExMap<Key, Value>, "set" | "delete" | "clear" | "deleteKeys" | "update" | "getOrCreate">;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:238](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L238)

Freezes the map, preventing any further mutations.

#### Returns

`Omit`\<`ExMap`\<`Key`, `Value`\>, `"set"` \| `"delete"` \| `"clear"` \| `"deleteKeys"` \| `"update"` \| `"getOrCreate"`\>

The same map instance, but with mutation methods removed from its type.

***

### get() {#get}

```ts
get(key): Value | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:52](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L52)

Retrieves the value associated with a key

#### Parameters

##### key

`Key`

The key to look up

#### Returns

`Value` \| `undefined`

The value associated with the key, or undefined if the key doesn't exist

#### Implementation of

```ts
ReadonlyMap.get
```

***

### getOrCreate() {#getorcreate}

```ts
getOrCreate(
   key, 
   create, 
   onExisted?): Value;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:131](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L131)

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

***

### has() {#has}

```ts
has(key): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:61](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L61)

Checks if a key exists in the map

#### Parameters

##### key

`Key`

The key to check for

#### Returns

`boolean`

true if the key exists, false otherwise

#### Implementation of

```ts
ReadonlyMap.has
```

***

### keys() {#keys}

```ts
keys(): MapIterator<Key>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:271](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L271)

#### Returns

`MapIterator`\<`Key`\>

Iterator for map keys

#### Implementation of

```ts
ReadonlyMap.keys
```

***

### mapEntries() {#mapentries}

```ts
mapEntries<NewValue>(by): ExMap<Key, NewValue>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:157](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L157)

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

***

### set() {#set}

```ts
set(key, value): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:72](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L72)

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

#### Implementation of

```ts
Map.set
```

***

### toArray() {#toarray}

```ts
toArray<NewValue>(by): NewValue[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:166](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L166)

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

***

### update() {#update}

```ts
update(key, value): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:148](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L148)

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

***

### values() {#values}

```ts
values(): MapIterator<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:276](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L276)

#### Returns

`MapIterator`\<`Value`\>

Iterator for map values

#### Implementation of

```ts
ReadonlyMap.values
```

***

### valuesToArray() {#valuestoarray}

```ts
valuesToArray<NewValue>(by): NewValue[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:175](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L175)

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

***

### groupedBy() {#groupedby}

```ts
static groupedBy<Value, Key>(input, by): ExMap<Key, Value[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:90](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L90)

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

***

### mappedBy() {#mappedby}

```ts
static mappedBy<Value, Key>(input, by): ExMap<Key, Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:113](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-map.ts#L113)

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
