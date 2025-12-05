# @grbn/kit

## Classes

- [ObservableExMap](Class.ObservableExMap.md)
- [ObservableExSet](Class.ObservableExSet.md)
- [SnapshotSaver](Class.SnapshotSaver.md)

## Functions

- [observerWithForwardRef](Function.observerWithForwardRef.md)
- [useMobxRootStoreRegistration](Function.useMobxRootStoreRegistration.md)


# Class: ObservableExMap\<Key, Value\>

Defined in: [mobx/observable-ex-map.ts:24](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/mobx/observable-ex-map.ts#L24)

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

### Key `Key`

The type of keys maintained by this map.

### Value `Value`

The type of mapped values.

## Accessors

### \[toStringTag\] {#tostringtag}

#### Get Signature

```ts
get toStringTag: string;
```

Defined in: [core/collections/ex-map.ts:281](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L281)

##### Returns `string`

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

Defined in: [core/collections/ex-map.ts:78](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L78)

##### Returns `number`

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

Defined in: [core/collections/ex-map.ts:261](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L261)

#### Returns `MapIterator`\<\[`Key`, `Value`\]\>

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

Defined in: [core/collections/ex-map.ts:198](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L198)

Adds all entries from another iterable to this map

#### Parameters

##### other `Iterable`\<readonly \[`Key`, `Value`\]\>

Iterable of key-value pairs to add

#### Returns `this`

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

Defined in: [core/collections/ex-map.ts:210](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L210)

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

##### Returns `void`

#### Inherited from

```ts
ExMap.backup
```

***

### clear() {#clear}

```ts
clear(): void;
```

Defined in: [core/collections/ex-map.ts:23](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L23)

Removes all elements from the map

#### Returns `void`

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

Defined in: [core/collections/ex-map.ts:33](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L33)

Removes a key and its associated value from the map

#### Parameters

##### key `Key`

The key to remove

#### Returns `boolean`

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

Defined in: [core/collections/ex-map.ts:185](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L185)

Removes multiple keys from the map

#### Parameters

##### keys `Iterable`\<`Key`\>

Keys to remove

#### Returns `this`

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

Defined in: [core/collections/ex-map.ts:266](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L266)

#### Returns `MapIterator`\<\[`Key`, `Value`\]\>

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

Defined in: [core/collections/ex-map.ts:223](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L223)

Creates a new map containing only entries that satisfy the predicate

##### Type Parameters

###### R `R`

##### Parameters

###### by

(`v`, `k`) => `v is R`

Predicate function to test entries

##### Returns `ExMap`\<`Key`, `R`\>

New map with filtered entries

##### Inherited from

```ts
ExMap.filter
```

#### Call Signature

```ts
filter(by): ExMap<Key, Value>;
```

Defined in: [core/collections/ex-map.ts:229](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L229)

Creates a new map containing only entries that satisfy the predicate

##### Parameters

###### by

(`v`, `k`) => `boolean`

Predicate function to test entries

##### Returns `ExMap`\<`Key`, `Value`\>

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

Defined in: [core/collections/ex-map.ts:41](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L41)

Executes a callback for each key-value pair in the map

#### Parameters

##### by

(`value`, `key`, `self`) => `void`

Function to execute for each element

#### Returns `void`

#### Inherited from

```ts
ExMap.forEach
```

***

### freeze() {#freeze}

```ts
freeze(): Omit<ExMap<Key, Value>, "set" | "delete" | "clear" | "deleteKeys" | "update" | "getOrCreate">;
```

Defined in: [core/collections/ex-map.ts:238](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L238)

Freezes the map, preventing any further mutations.

#### Returns `Omit`\<`ExMap`\<`Key`, `Value`\>, `"set"` \| `"delete"` \| `"clear"` \| `"deleteKeys"` \| `"update"` \| `"getOrCreate"`\>

The same map instance, but with mutation methods removed from its type.

#### Inherited from

```ts
ExMap.freeze
```

***

### get() {#get}

```ts
get(key): Value | undefined;
```

Defined in: [core/collections/ex-map.ts:52](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L52)

Retrieves the value associated with a key

#### Parameters

##### key `Key`

The key to look up

#### Returns `Value` \| `undefined`

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

Defined in: [core/collections/ex-map.ts:131](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L131)

Gets a value from the map or creates it if it doesn't exist

#### Parameters

##### key `Key`

Key to look up or create

##### create

(`key`) => `Value`

Function to create new value if key doesn't exist

##### onExisted?

(`v`, `k`) => `void`

Optional callback when key already exists

#### Returns `Value`

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

Defined in: [core/collections/ex-map.ts:61](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L61)

Checks if a key exists in the map

#### Parameters

##### key `Key`

The key to check for

#### Returns `boolean`

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

Defined in: [core/collections/ex-map.ts:271](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L271)

#### Returns `MapIterator`\<`Key`\>

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

Defined in: [core/collections/ex-map.ts:157](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L157)

Creates a new map by transforming values while keeping the same keys

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`, `key`) => `NewValue`

Function to transform values

#### Returns `ExMap`\<`Key`, `NewValue`\>

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

Defined in: [core/collections/ex-map.ts:72](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L72)

Associates a key with a value in the map

#### Parameters

##### key `Key`

The key to set

##### value `Value`

The value to associate with the key

#### Returns `this`

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

Defined in: [core/collections/ex-map.ts:166](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L166)

Converts map entries to an array using a transform function

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`, `key`) => `NewValue`

Function to transform each key-value pair

#### Returns `NewValue`[]

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

Defined in: [core/collections/ex-map.ts:148](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L148)

Updates a value in the map based on its current value

#### Parameters

##### key `Key`

Key to update

##### value

(`old`, `key`) => `Value`

Function to compute new value from old value

#### Returns `this`

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

Defined in: [core/collections/ex-map.ts:276](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L276)

#### Returns `MapIterator`\<`Value`\>

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

Defined in: [core/collections/ex-map.ts:175](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L175)

Converts map values to an array using a transform function

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`) => `NewValue`

Function to transform each value

#### Returns `NewValue`[]

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

Defined in: [core/collections/ex-map.ts:90](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L90)

Groups array elements by a key function, collecting values with the same key into arrays

#### Type Parameters

##### Value `Value`

##### Key `Key`

#### Parameters

##### input `Iterable`\<`Value`\>

Array to group

##### by

(`value`) => `Key`

Function to derive the key for each element

#### Returns `ExMap`\<`Key`, `Value`[]\>

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

Defined in: [core/collections/ex-map.ts:113](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-map.ts#L113)

Creates a map from an array using a key function

#### Type Parameters

##### Value `Value`

##### Key `Key`

#### Parameters

##### input `Iterable`\<`Value`\>

Array to convert to a map

##### by

(`value`) => `Key`

Function to derive the key for each element

#### Returns `ExMap`\<`Key`, `Value`\>

Map of derived keys to original values

#### Inherited from

```ts
ExMap.mappedBy
```


# Class: ObservableExSet\<Value\>

Defined in: [mobx/observable-ex-set.ts:13](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/mobx/observable-ex-set.ts#L13)

A specialized Set-like collection class that extends `ExSet` and integrates observability
using a reactive programming model. This class is designed to track and react to changes
in the collection, enabling it to be used in environments where state reactivity is required.

## Extends

- `ExSet`\<`Value`\>

## Type Parameters

### Value `Value`

The type of elements stored in the set.

## Accessors

### \[toStringTag\] {#tostringtag}

#### Get Signature

```ts
get toStringTag: string;
```

Defined in: [core/collections/ex-set.ts:228](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L228)

##### Returns `string`

The string tag for this object

#### Inherited from

```ts
ExSet.[toStringTag]
```

***

### readonly {#readonly}

#### Get Signature

```ts
get readonly(): ReadonlyExSet<Value>;
```

Defined in: [core/collections/ex-set.ts:180](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L180)

##### Returns `ReadonlyExSet`\<`Value`\>

A read-only view of this set

#### Inherited from

```ts
ExSet.readonly
```

***

### size {#size}

#### Get Signature

```ts
get size(): number;
```

Defined in: [core/collections/ex-set.ts:74](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L74)

##### Returns `number`

The number of elements in the set

#### Inherited from

```ts
ExSet.size
```

## Methods

### \[iterator\]() {#iterator}

```ts
iterator: SetIterator<Value>;
```

Defined in: [core/collections/ex-set.ts:223](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L223)

#### Returns `SetIterator`\<`Value`\>

An iterator over the values in the set

#### Inherited from

```ts
ExSet.[iterator]
```

***

### add() {#add}

```ts
add(value): this;
```

Defined in: [core/collections/ex-set.ts:31](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L31)

Adds a value to the set

#### Parameters

##### value `Value`

The value to add

#### Returns `this`

This set instance for chaining

#### Mutates

#### Inherited from

```ts
ExSet.add
```

***

### and() {#and}

```ts
and(other): ExSet<Value>;
```

Defined in: [core/collections/ex-set.ts:143](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L143)

Creates a new set containing elements that exist in both this set and another iterable (intersection)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to intersect with

#### Returns `ExSet`\<`Value`\>

A new ExSet containing common elements

#### Inherited from

```ts
ExSet.and
```

***

### backup() {#backup}

```ts
backup(fn?): () => void;
```

Defined in: [core/collections/ex-set.ts:212](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L212)

Creates a backup of the current set state and returns a restore function

#### Parameters

##### fn?

(`o`) => `ExSet`\<`Value`\>

Optional transformation function to apply to the backup

#### Returns

Function that when called restores the set to its backed up state

```ts
(): void;
```

##### Returns `void`

#### Mutates

#### Inherited from

```ts
ExSet.backup
```

***

### clear() {#clear}

```ts
clear(): void;
```

Defined in: [core/collections/ex-set.ts:40](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L40)

Removes all elements from the set

#### Returns `void`

#### Mutates

#### Inherited from

```ts
ExSet.clear
```

***

### delete() {#delete}

```ts
delete(value): boolean;
```

Defined in: [core/collections/ex-set.ts:50](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L50)

Removes a value from the set

#### Parameters

##### value `Value`

The value to remove

#### Returns `boolean`

true if the value was in the set, false otherwise

#### Mutates

#### Inherited from

```ts
ExSet.delete
```

***

### diff() {#diff}

```ts
diff(other): ExSet<Value>;
```

Defined in: [core/collections/ex-set.ts:134](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L134)

Creates a new set containing elements from this set that are not in another iterable (difference)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to compare against

#### Returns `ExSet`\<`Value`\>

A new ExSet containing elements unique to this set

#### Inherited from

```ts
ExSet.diff
```

***

### entries() {#entries}

```ts
entries(): SetIterator<[Value, Value]>;
```

Defined in: [core/collections/ex-set.ts:233](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L233)

#### Returns `SetIterator`\<\[`Value`, `Value`\]\>

An iterator over [value, value] pairs for Set compatibility

#### Inherited from

```ts
ExSet.entries
```

***

### forEach() {#foreach}

```ts
forEach(by): void;
```

Defined in: [core/collections/ex-set.ts:58](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L58)

Executes a callback for each value in the set

#### Parameters

##### by

(`value`, `value2`, `self`) => `void`

Function to execute for each element

#### Returns `void`

#### Inherited from

```ts
ExSet.forEach
```

***

### freeze() {#freeze}

```ts
freeze(): ReadonlyExSet<Value>;
```

Defined in: [core/collections/ex-set.ts:188](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L188)

Freezes the set, preventing any further mutations.

#### Returns `ReadonlyExSet`\<`Value`\>

A read-only version of this set that throws on mutation attempts.

#### Inherited from

```ts
ExSet.freeze
```

***

### has() {#has}

```ts
has(key): boolean;
```

Defined in: [core/collections/ex-set.ts:69](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L69)

Checks if a value exists in the set

#### Parameters

##### key `Value`

The value to check for

#### Returns `boolean`

true if the value exists, false otherwise

#### Inherited from

```ts
ExSet.has
```

***

### intersects() {#intersects}

```ts
intersects(other): boolean;
```

Defined in: [core/collections/ex-set.ts:85](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L85)

Checks if this set has any elements in common with another iterable

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to check against

#### Returns `boolean`

true if there are common elements, false otherwise

#### Inherited from

```ts
ExSet.intersects
```

***

### join() {#join}

```ts
join(other): this;
```

Defined in: [core/collections/ex-set.ts:100](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L100)

Adds all elements from another iterable to this set

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable whose elements will be added

#### Returns `this`

This set instance for chaining

#### Mutates

#### Inherited from

```ts
ExSet.join
```

***

### keys() {#keys}

```ts
keys(): SetIterator<Value>;
```

Defined in: [core/collections/ex-set.ts:238](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L238)

#### Returns `SetIterator`\<`Value`\>

An iterator over the values in the set

#### Inherited from

```ts
ExSet.keys
```

***

### or() {#or}

```ts
or(other): ExSet<Value>;
```

Defined in: [core/collections/ex-set.ts:125](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L125)

Creates a new set containing elements from both this set and another iterable (union)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to union with

#### Returns `ExSet`\<`Value`\>

A new ExSet containing all unique elements

#### Inherited from

```ts
ExSet.or
```

***

### subtract() {#subtract}

```ts
subtract(other): this;
```

Defined in: [core/collections/ex-set.ts:113](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L113)

Removes all elements that exist in another iterable from this set

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable whose elements will be removed

#### Returns `this`

This set instance for chaining

#### Mutates

#### Inherited from

```ts
ExSet.subtract
```

***

### toArray() {#toarray}

```ts
toArray<NewValue>(by): NewValue[];
```

Defined in: [core/collections/ex-set.ts:175](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L175)

Transforms set elements into an array using a mapping function

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`) => `NewValue`

Function to transform each element

#### Returns `NewValue`[]

Array of transformed values

#### Inherited from

```ts
ExSet.toArray
```

***

### values() {#values}

```ts
values(): SetIterator<Value>;
```

Defined in: [core/collections/ex-set.ts:243](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L243)

#### Returns `SetIterator`\<`Value`\>

An iterator over the values in the set

#### Inherited from

```ts
ExSet.values
```

***

### xor() {#xor}

```ts
xor(other): ExSet<Value>;
```

Defined in: [core/collections/ex-set.ts:158](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/collections/ex-set.ts#L158)

Creates a new set containing elements that exist in either this set or another iterable, but not both (symmetric difference)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to compare against

#### Returns `ExSet`\<`Value`\>

A new ExSet containing elements that are in either set but not both

#### Inherited from

```ts
ExSet.xor
```


# Class: SnapshotSaver\<S\>

Defined in: [mobx/snapshot-saver.ts:13](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/mobx/snapshot-saver.ts#L13)

A utility class for saving snapshots with throttle control and error handling. The class ensures that snapshots
are saved in a controlled manner, with throttled save requests, handling successive save requests efficiently,
and retrying in case of failures.

## Type Parameters

### S `S`

The type of the snapshot data structure to be saved.

## Methods

### reaction() {#reaction}

```ts
reaction(node): IReactionDisposer;
```

Defined in: [mobx/snapshot-saver.ts:82](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/mobx/snapshot-saver.ts#L82)

Creates a reaction that observes changes in the snapshot of the given node
and performs an action when changes are detected.

#### Parameters

##### node `S`

The observable node to watch for changes.

#### Returns `IReactionDisposer`

Returns a disposer function to stop the reaction.

***

### save() {#save}

```ts
save(snapshot): void;
```

Defined in: [mobx/snapshot-saver.ts:30](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/mobx/snapshot-saver.ts#L30)

Saves a snapshot. Ensures that multiple save requests are throttled and managed to avoid race conditions
and excessive save operations. If a save is already in progress, the method queues the latest snapshot to be saved after the current one completes.

#### Parameters

##### snapshot `SnapshotInOf`\<`S`\>

The snapshot data to be saved.

#### Returns `void`


# Function: observerWithForwardRef()

```ts
function observerWithForwardRef<P, T>(render): FunctionComponent<PropsWithoutRef<P> & RefAttributes<T>>;
```

Defined in: [mobx/observer-with-forward-ref.ts:26](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/mobx/observer-with-forward-ref.ts#L26)

Enhances a given component with both observer and forwardRef functionality.

This function wraps a React component, allowing it to observe and react to
changes in MobX observables while also supporting React's `forwardRef` mechanism.
It combines the functionalities of `observer` from MobX React and
`forwardRef` from React.

## Type Parameters

### P `P`

The props type of the wrapped component.

### T `T`

The type of the forwarded ref.

## Parameters

### render `ForwardRefRenderFunction`\<`T`, `PropsWithoutRef`\<`P`\>\>

The render function defining the
component logic, taking props and a ref as arguments.

## Returns

`FunctionComponent`\<`PropsWithoutRef`\<`P`\> & `RefAttributes`\<`T`\>\>

A new component that observes MobX state and
handles forwarded refs.


# Function: useMobxRootStoreRegistration()

```ts
function useMobxRootStoreRegistration(store): void;
```

Defined in: [mobx/use-mobx-root-store-registration.ts:12](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/mobx/use-mobx-root-store-registration.ts#L12)

A custom hook for managing the registration of a MobX root store.

This hook registers a provided store as the MobX root store on mount and unregisters it on unmount.
It re-registers the store whenever the `store` dependency changes.

## Parameters

### store

The MobX root store to be registered or unregistered.

`object` | `undefined`

## Returns

`void`
