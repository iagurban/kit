# @grbn/kit

## Classes

- [ExMap](Class.ExMap.md)
- [ExSet](Class.ExSet.md)
- [ManualSortingAlphabet](Class.ManualSortingAlphabet.md)
- [NumberConverter](Class.NumberConverter.md)
- [Powers](Class.Powers.md)
- [ProgrammingError](Class.ProgrammingError.md)
- [PromiseController](Class.PromiseController.md)

## Type Aliases

- [Checker](TypeAlias.Checker.md)
- [Checkers](TypeAlias.Checkers.md)

## Variables

- [distance00to11](Variable.distance00to11.md)
- [NumberBase](Variable.NumberBase.md)

## Functions

- [angleBetween](Function.angleBetween.md)
- [binaryStringSearch](Function.binaryStringSearch.md)
- [boundingBox](Function.boundingBox.md)
- [catching](Function.catching.md)
- [catchingAsync](Function.catchingAsync.md)
- [checked](Function.checked.md)
- [circleArea](Function.circleArea.md)
- [circleCircumference](Function.circleCircumference.md)
- [clamp](Function.clamp.md)
- [createIoCContainer](Function.createIoCContainer.md)
- [debouncedCollectingAsync](Function.debouncedCollectingAsync.md)
- [degToRad](Function.degToRad.md)
- [denyRecursion](Function.denyRecursion.md)
- [disposers](Function.disposers.md)
- [distance](Function.distance.md)
- [distanceTo00](Function.distanceTo00.md)
- [fromEntries](Function.fromEntries.md)
- [groupedBy](Function.groupedBy.md)
- [isArrayOf](Function.isArrayOf.md)
- [isDefined](Function.isDefined.md)
- [isInstanceOf](Function.isInstanceOf.md)
- [isInteger](Function.isInteger.md)
- [isNotNull](Function.isNotNull.md)
- [isNotUndefined](Function.isNotUndefined.md)
- [isNull](Function.isNull.md)
- [isNullish](Function.isNullish.md)
- [isNumber](Function.isNumber.md)
- [isPlainObject](Function.isPlainObject.md)
- [isROArray](Function.isROArray.md)
- [isSomeObject](Function.isSomeObject.md)
- [isSomeOf](Function.isSomeOf.md)
- [isString](Function.isString.md)
- [isTruthy](Function.isTruthy.md)
- [isTuple](Function.isTuple.md)
- [isTuples](Function.isTuples.md)
- [isUndefined](Function.isUndefined.md)
- [lerp](Function.lerp.md)
- [lerpPoint](Function.lerpPoint.md)
- [mapEntries](Function.mapEntries.md)
- [mapOwnEntries](Function.mapOwnEntries.md)
- [mappedBy](Function.mappedBy.md)
- [midpoint](Function.midpoint.md)
- [multiRecurringDenier](Function.multiRecurringDenier.md)
- [notNull](Function.notNull.md)
- [once](Function.once.md)
- [pointInCircle](Function.pointInCircle.md)
- [pointInRect](Function.pointInRect.md)
- [pointInTriangle](Function.pointInTriangle.md)
- [pointOnCircle](Function.pointOnCircle.md)
- [rectArea](Function.rectArea.md)
- [rectCenter](Function.rectCenter.md)
- [rectPerimeter](Function.rectPerimeter.md)
- [rectsIntersect](Function.rectsIntersect.md)
- [retrying](Function.retrying.md)
- [rotatePoint](Function.rotatePoint.md)
- [rotateRect](Function.rotateRect.md)
- [scale](Function.scale.md)
- [scale\_unsafe](Function.scale_unsafe.md)
- [scaleFrom01](Function.scaleFrom01.md)
- [scaleTo01](Function.scaleTo01.md)
- [scaleTo01\_unsafe](Function.scaleTo01_unsafe.md)
- [setValueProperty](Function.setValueProperty.md)
- [snap](Function.snap.md)
- [throwing](Function.throwing.md)
- [triangleArea](Function.triangleArea.md)
- [triangleCentroid](Function.triangleCentroid.md)
- [trianglePerimeter](Function.trianglePerimeter.md)
- [validator](Function.validator.md)
- [validator0](Function.validator0.md)
- [warnCatch](Function.warnCatch.md)


# Class: ExMap\<Key, Value\>

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:6](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L6)

Extended Map implementation with additional utility methods and operations

## Type Parameters

### Key `Key`

The type of keys in the map

### Value `Value`

The type of values in the map

## Implements

- `ReadonlyMap`\<`Key`, `Value`\>
- `Map`\<`Key`, `Value`\>

## Constructors

### Constructor

```ts
new ExMap<Key, Value>(pairs?): ExMap<Key, Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:13](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L13)

Creates a new ExMap instance

#### Parameters

##### pairs? `Iterable`\<\[`Key`, `Value`\], `any`, `any`\>

Optional iterable of key-value pairs to initialize the map

#### Returns `ExMap`\<`Key`, `Value`\>

## Accessors

### \[toStringTag\] {#tostringtag}

#### Get Signature

```ts
get toStringTag: string;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:277](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L277)

##### Returns `string`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:79](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L79)

##### Returns `number`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:257](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L257)

#### Returns `MapIterator`\<\[`Key`, `Value`\]\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:199](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L199)

Adds all entries from another iterable to this map

#### Parameters

##### other `Iterable`\<readonly \[`Key`, `Value`\]\>

Iterable of key-value pairs to add

#### Returns `this`

This map instance for chaining

#### Mutates

***

### backup() {#backup}

```ts
backup(fn?): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:211](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L211)

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

***

### clear() {#clear}

```ts
clear(): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:23](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L23)

Removes all elements from the map

#### Returns `void`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:33](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L33)

Removes a key and its associated value from the map

#### Parameters

##### key `Key`

The key to remove

#### Returns `boolean`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:186](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L186)

Removes multiple keys from the map

#### Parameters

##### keys `Iterable`\<`Key`\>

Keys to remove

#### Returns `this`

This map instance for chaining

#### Mutates

***

### entries() {#entries}

```ts
entries(): MapIterator<[Key, Value]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:262](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L262)

#### Returns `MapIterator`\<\[`Key`, `Value`\]\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:224](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L224)

Creates a new map containing only entries that satisfy the predicate

##### Type Parameters

###### R `R`

##### Parameters

###### by

(`v`, `k`) => `v is R`

Predicate function to test entries

##### Returns `ExMap`\<`Key`, `R`\>

New map with filtered entries

#### Call Signature

```ts
filter(by): ExMap<Key, Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:225](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L225)

Creates a new map containing only entries that satisfy the predicate

##### Parameters

###### by

(`v`, `k`) => `boolean`

Predicate function to test entries

##### Returns `ExMap`\<`Key`, `Value`\>

New map with filtered entries

***

### forEach() {#foreach}

```ts
forEach(by): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:42](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L42)

Executes a callback for each key-value pair in the map

#### Parameters

##### by

(`value`, `key`, `self`) => `void`

Function to execute for each element

#### Returns `void`

#### Implementation of

```ts
ReadonlyMap.forEach
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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:234](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L234)

Creates an immutable version of this map

#### Returns `Omit`\<`ExMap`\<`Key`, `Value`\>, 
  \| `"set"`
  \| `"delete"`
  \| `"clear"`
  \| `"deleteKeys"`
  \| `"update"`
  \| `"overwrite"`
  \| `"getOrCreate"`\>

Frozen map that throws on mutation attempts

***

### get() {#get}

```ts
get(key): Value | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:53](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L53)

Retrieves the value associated with a key

#### Parameters

##### key `Key`

The key to look up

#### Returns `Value` \| `undefined`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:132](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L132)

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

***

### has() {#has}

```ts
has(key): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:62](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L62)

Checks if a key exists in the map

#### Parameters

##### key `Key`

The key to check for

#### Returns `boolean`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:267](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L267)

#### Returns `MapIterator`\<`Key`\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:158](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L158)

Creates a new map by transforming values while keeping the same keys

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`, `key`) => `NewValue`

Function to transform values

#### Returns `ExMap`\<`Key`, `NewValue`\>

New map with transformed values

***

### set() {#set}

```ts
set(key, value): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:73](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L73)

Associates a key with a value in the map

#### Parameters

##### key `Key`

The key to set

##### value `Value`

The value to associate with the key

#### Returns `this`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:167](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L167)

Converts map entries to an array using a transform function

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`, `key`) => `NewValue`

Function to transform each key-value pair

#### Returns `NewValue`[]

Array of transformed values

***

### update() {#update}

```ts
update(key, value): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:149](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L149)

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

***

### values() {#values}

```ts
values(): MapIterator<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:272](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L272)

#### Returns `MapIterator`\<`Value`\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:176](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L176)

Converts map values to an array using a transform function

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`) => `NewValue`

Function to transform each value

#### Returns `NewValue`[]

Array of transformed values

***

### groupedBy() {#groupedby}

```ts
static groupedBy<Value, Key>(input, by): ExMap<Key, Value[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:91](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L91)

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

***

### mappedBy() {#mappedby}

```ts
static mappedBy<Value, Key>(input, by): ExMap<Key, Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-map.ts:114](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-map.ts#L114)

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


# Class: ExSet\<Value\>

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:12](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L12)

Extended Set implementation with additional set operations and utility methods.
Provides both standard Set interface and additional functionality for set operations.

## Type Parameters

### Value `Value`

The type of elements in the set

## Implements

- `ReadonlySet`\<`Value`\>
- `Set`\<`Value`\>

## Constructors

### Constructor

```ts
new ExSet<Value>(values?): ExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:19](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L19)

Creates a new ExSet instance

#### Parameters

##### values? `Iterable`\<`Value`, `any`, `any`\>

Optional iterable of initial values

#### Returns `ExSet`\<`Value`\>

## Accessors

### \[toStringTag\] {#tostringtag}

#### Get Signature

```ts
get toStringTag: string;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:229](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L229)

##### Returns `string`

The string tag for this object

#### Implementation of

```ts
Set.[toStringTag]
```

***

### readonly {#readonly}

#### Get Signature

```ts
get readonly(): ReadonlyExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:181](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L181)

##### Returns `ReadonlyExSet`\<`Value`\>

A read-only view of this set

***

### size {#size}

#### Get Signature

```ts
get size(): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:75](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L75)

##### Returns `number`

The number of elements in the set

#### Implementation of

```ts
ReadonlySet.size
```

## Methods

### \[iterator\]() {#iterator}

```ts
iterator: SetIterator<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:224](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L224)

#### Returns `SetIterator`\<`Value`\>

An iterator over the values in the set

#### Implementation of

```ts
ReadonlySet.[iterator]
```

***

### add() {#add}

```ts
add(value): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:31](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L31)

Adds a value to the set

#### Parameters

##### value `Value`

The value to add

#### Returns `this`

This set instance for chaining

#### Mutates

#### Implementation of

```ts
Set.add
```

***

### and() {#and}

```ts
and(other): ExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:144](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L144)

Creates a new set containing elements that exist in both this set and another iterable (intersection)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to intersect with

#### Returns `ExSet`\<`Value`\>

A new ExSet containing common elements

***

### backup() {#backup}

```ts
backup(fn?): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:213](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L213)

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

***

### clear() {#clear}

```ts
clear(): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:40](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L40)

Removes all elements from the set

#### Returns `void`

#### Mutates

#### Implementation of

```ts
Set.clear
```

***

### delete() {#delete}

```ts
delete(value): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:50](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L50)

Removes a value from the set

#### Parameters

##### value `Value`

The value to remove

#### Returns `boolean`

true if the value was in the set, false otherwise

#### Mutates

#### Implementation of

```ts
Set.delete
```

***

### diff() {#diff}

```ts
diff(other): ExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:135](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L135)

Creates a new set containing elements from this set that are not in another iterable (difference)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to compare against

#### Returns `ExSet`\<`Value`\>

A new ExSet containing elements unique to this set

***

### entries() {#entries}

```ts
entries(): SetIterator<[Value, Value]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:234](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L234)

#### Returns `SetIterator`\<\[`Value`, `Value`\]\>

An iterator over [value, value] pairs for Set compatibility

#### Implementation of

```ts
ReadonlySet.entries
```

***

### forEach() {#foreach}

```ts
forEach(by): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:59](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L59)

Executes a callback for each value in the set

#### Parameters

##### by

(`value`, `value2`, `self`) => `void`

Function to execute for each element

#### Returns `void`

#### Implementation of

```ts
ReadonlySet.forEach
```

***

### freeze() {#freeze}

```ts
freeze(): ReadonlyExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:189](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L189)

Creates an immutable version of this set by freezing it and preventing mutations

#### Returns `ReadonlyExSet`\<`Value`\>

A read-only version of this set that throws on mutation attempts

***

### has() {#has}

```ts
has(key): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:70](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L70)

Checks if a value exists in the set

#### Parameters

##### key `Value`

The value to check for

#### Returns `boolean`

true if the value exists, false otherwise

#### Implementation of

```ts
ReadonlySet.has
```

***

### intersects() {#intersects}

```ts
intersects(other): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:86](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L86)

Checks if this set has any elements in common with another iterable

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to check against

#### Returns `boolean`

true if there are common elements, false otherwise

***

### join() {#join}

```ts
join(other): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:101](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L101)

Adds all elements from another iterable to this set

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable whose elements will be added

#### Returns `this`

This set instance for chaining

#### Mutates

***

### keys() {#keys}

```ts
keys(): SetIterator<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:239](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L239)

#### Returns `SetIterator`\<`Value`\>

An iterator over the values in the set

#### Implementation of

```ts
ReadonlySet.keys
```

***

### or() {#or}

```ts
or(other): ExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:126](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L126)

Creates a new set containing elements from both this set and another iterable (union)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to union with

#### Returns `ExSet`\<`Value`\>

A new ExSet containing all unique elements

***

### subtract() {#subtract}

```ts
subtract(other): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:114](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L114)

Removes all elements that exist in another iterable from this set

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable whose elements will be removed

#### Returns `this`

This set instance for chaining

#### Mutates

***

### toArray() {#toarray}

```ts
toArray<NewValue>(by): NewValue[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:176](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L176)

Transforms set elements into an array using a mapping function

#### Type Parameters

##### NewValue `NewValue`

#### Parameters

##### by

(`value`) => `NewValue`

Function to transform each element

#### Returns `NewValue`[]

Array of transformed values

***

### values() {#values}

```ts
values(): SetIterator<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:244](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L244)

#### Returns `SetIterator`\<`Value`\>

An iterator over the values in the set

#### Implementation of

```ts
ReadonlySet.values
```

***

### xor() {#xor}

```ts
xor(other): ExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:159](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/collections/ex-set.ts#L159)

Creates a new set containing elements that exist in either this set or another iterable, but not both (symmetric difference)

#### Parameters

##### other `Iterable`\<`Value`\>

Iterable to compare against

#### Returns `ExSet`\<`Value`\>

A new ExSet containing elements that are in either set but not both


# Class: ManualSortingAlphabet

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:146](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L146)

Manages lexicographic keys for manually sorted lists, enabling dynamic insertions between items.

This class generates unique string keys that maintain lexicographic ordering, allowing for:
- Inserting new items between existing ones
- Handling dense insertions through automatic rebalancing
- Managing a configurable alphabet range for key generation

## Example

```typescript
const alphabet = new ManualSortingAlphabet(65, 90); // A-Z range
const firstKey = alphabet.getFirstKey(); // Returns middle character
const result = alphabet.insertAfter(['B', 'D'], 'B', 2); // Insert 2 keys after 'B'

// Basic usage - inserting between existing keys
const alphabet = new ManualSortingAlphabet(65, 90);
const { newKeys } = alphabet.insertAfter(['B', 'D'], 'B', 1);
// newKeys might contain ['C']

// Handling rebalancing
const { newKeys, updated } = alphabet.insertAfter(['B', 'C'], 'B', 2);
// updated might contain new values for 'C' to make room

// Custom window extension strategy
const alphabet = new ManualSortingAlphabet(65, 90, {
  extendWindow: (b) => ({ left: 2, right: 2 })
});
```

## Throws

If fromCodePoint or toCodePoint are invalid

## Constructors

### Constructor

```ts
new ManualSortingAlphabet(options): ManualSortingAlphabet;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:205](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L205)

Creates a new ManualSortingAlphabet instance.

#### Parameters

##### options `ManualSortingAlphabetOptions`

Configuration options

#### Returns `ManualSortingAlphabet`

## Properties

### presets {#presets}

```ts
static presets: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:156](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L156)

Common presets for ManualSortingAlphabet alphabet ranges.

These presets define fromCodePoint and toCodePoint values
that are optimized for different use cases.

All presets are compatible with UTF-8 PostgreSQL `text` columns
under standard collation (C or C.UTF-8), preserving binary sort order.

#### asciiFriendly

```ts
readonly asciiFriendly: object;
```

Human-readable preset using digits and Latin letters.
Includes '0'-'9', 'A'-'Z', 'a'-'z'

- ✅ ASCII-safe
- ✅ JS sort: works with < and localeCompare
- ✅ PostgreSQL binary order safe
- ⚠️ Can require frequent rebalance in long-term dense lists

##### asciiFriendly.fromCodePoint

```ts
readonly fromCodePoint: 48 = 0x30;
```

##### asciiFriendly.toCodePoint

```ts
readonly toCodePoint: 122 = 0x7a;
```

#### invisibleUnicode

```ts
readonly invisibleUnicode: object;
```

Invisible and rarely-used symbols from Unicode ranges.
Optimized for maximum spacing in systems where keys are not user-facing.

- ✅ High entropy, compact keys
- ✅ UTF-8 and PostgreSQL-safe
- ❌ Not human-friendly

##### invisibleUnicode.fromCodePoint

```ts
readonly fromCodePoint: 8192 = 0x2000;
```

##### invisibleUnicode.toCodePoint

```ts
readonly toCodePoint: 12287 = 0x2fff;
```

#### wideCJK

```ts
readonly wideCJK: object;
```

Very wide range using CJK unified ideographs.
Suitable for systems needing extreme insert density with minimal key growth.

- ✅ 6000+ chars of spacing
- ✅ JS/PostgreSQL binary order works
- ⚠️ Keys may appear unreadable or wide in editors

##### wideCJK.fromCodePoint

```ts
readonly fromCodePoint: 12288 = 0x3000;
```

##### wideCJK.toCodePoint

```ts
readonly toCodePoint: 40959 = 0x9fff;
```

## Methods

### extractUpdatedKeys() {#extractupdatedkeys}

```ts
protected extractUpdatedKeys(
   sorted, 
   inserted, 
   keyIndex, 
   balancing): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:235](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L235)

Applies updated values to original keys from the rebalance result.

#### Parameters

##### sorted

readonly `string`[]

##### inserted

readonly `string`[]

##### keyIndex `number`

##### balancing `Balancer`

#### Returns `object`

##### newKeys

```ts
newKeys: string[];
```

##### updated

```ts
updated: Map<string, string>;
```

***

### getFirstKey() {#getfirstkey}

```ts
getFirstKey(): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:479](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L479)

Returns the initial key to use if the list is empty.

#### Returns `string`

***

### getMiddleCodePoint() {#getmiddlecodepoint}

```ts
protected getMiddleCodePoint(a, b): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:225](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L225)

Returns a middle code point between two valid code points.
Throws if either point is outside the alphabet range.

#### Parameters

##### a `number`

##### b `number`

#### Returns `number`

***

### getMiddleKey() {#getmiddlekey}

```ts
protected getMiddleKey(a, b): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:265](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L265)

Returns a string key that is lexicographically between a and b.
Uses code points to compute midpoint recursively.

#### Parameters

##### a `string`

##### b `string`

#### Returns `string`

***

### getNewKeys() {#getnewkeys}

```ts
getNewKeys(count): string[];
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:491](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L491)

Generates a new array of unique keys based on the specified count.

#### Parameters

##### count `number`

The number of keys to generate.

#### Returns `string`[]

An array containing the newly generated keys.

***

### insertAfterIndex() {#insertafterindex}

```ts
protected insertAfterIndex(
   sorted, 
   keyIndex, 
   count): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:398](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L398)

Inserts one or more keys immediately after the given key in a sorted array.
If necessary space isn't available, automatically rebalances neighboring keys.

#### Parameters

##### sorted

readonly `string`[]

Array of existing keys in sorted order

##### keyIndex `number`

Reference index after which to insert

##### count `number`

Number of new keys to insert

#### Returns `object`

Result containing new keys and any updated existing keys

##### newKeys

```ts
newKeys: string[];
```

##### updated

```ts
updated: Map<string, string>;
```

#### Throws

If the reference key is not found in the sorted array

***

### insertBeforeIndex() {#insertbeforeindex}

```ts
protected insertBeforeIndex(
   sorted, 
   index, 
   count): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:443](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L443)

Inserts a specified number of items before a given index in a sorted array.

#### Parameters

##### sorted

readonly `string`[]

The sorted array of string elements where the insertion will occur.

##### index `number`

The index before which the new items will be inserted.

##### count `number`

The number of items to be inserted.

#### Returns `object`

Returns an object containing two properties:
        - `newKeys`: An array of the newly inserted keys.
        - `updated`: A map of the updated keys and their new keys.

##### newKeys

```ts
newKeys: string[];
```

##### updated

```ts
updated: Map<string, string>;
```

***

### isValidCodePoint() {#isvalidcodepoint}

```ts
protected isValidCodePoint(code): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:217](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L217)

Checks if a code point is within the configured alphabet range.

#### Parameters

##### code `number`

#### Returns `boolean`

***

### tryInsertAtEnd() {#tryinsertatend}

```ts
protected tryInsertAtEnd(sorted): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:356](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L356)

Appends a key at the end by extending the last key or adding a character.

#### Parameters

##### sorted `string`[]

#### Returns `string`

#### Throws

***

### tryInsertManyAtEnd() {#tryinsertmanyatend}

```ts
protected tryInsertManyAtEnd(count, sorted): string[];
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:327](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L327)

Inserts keys after the last element by growing length.

#### Parameters

##### count `number`

##### sorted `string`[]

#### Returns `string`[]

***

### tryInsertManyAtStart() {#tryinsertmanyatstart}

```ts
protected tryInsertManyAtStart(count, sorted): string[];
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:339](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/manual-sorting.ts#L339)

Inserts keys before the first element by creating room.

#### Parameters

##### count `number`

##### sorted `string`[]

#### Returns `string`[]


# Class: NumberConverter

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:74](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L74)

Converts numbers between decimal and a custom number system with configurable digit symbols.
Supports random number generation and fixed-width formatting in the custom system.

## Example

```typescript
// Create base-36 converter (0-9, a-z)
const base36 = new NumberConverter([
  ['0', '9'], // Digits
  ['a', 'z']  // Letters
]);

// Convert from decimal
console.log(base36.from10(12345)); // "9ix"

// Convert to decimal
console.log(base36.to10('xyz')); // 44027n

// Generate random number
console.log(base36.random(5)); // Random 5-char string
```

## Constructors

### Constructor

```ts
new NumberConverter(parts): NumberConverter;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:81](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L81)

Creates a number converter with the specified digit mappings.

#### Parameters

##### parts

readonly (`string` \| readonly \[`string`, `string`\])[]

Array of single characters or [start,end] character ranges defining the digits

#### Returns `NumberConverter`

#### Throws

If there are duplicate characters in the mappings

## Properties

### fixedWidthRandomGenerator() {#fixedwidthrandomgenerator}

```ts
readonly fixedWidthRandomGenerator: (length) => () => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:209](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L209)

Creates a function that generates fixed-width random numbers efficiently.

#### Parameters

##### length `number`

Desired string length, must be positive integer

#### Returns

Function that generates random strings of specified length

```ts
(): string;
```

##### Returns `string`

#### Throws

If length is not a positive integer

***

### from10() {#from10}

```ts
readonly from10: (input) => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:133](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L133)

Converts a decimal number to this number system.

#### Parameters

##### input

Decimal number as string, number or bigint

`string` | `number` | `bigint`

#### Returns `string`

String representation in this number system

#### Throws

If input is floating point, negative, or base is 10

***

### mask() {#mask}

```ts
readonly mask: (length) => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:181](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L181)

Creates a string of specified length using the maximum digit value.

#### Parameters

##### length `number`

Desired string length

#### Returns `string`

String of specified length filled with max digit

***

### parts {#parts}

```ts
readonly parts: readonly (string | readonly [string, string])[];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:81](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L81)

Array of single characters or [start,end] character ranges defining the digits

***

### random() {#random}

```ts
readonly random: (length) => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:193](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L193)

Generates a random number string of specified length.

#### Parameters

##### length `number`

Desired string length, must be positive integer

#### Returns `string`

Random string of specified length using system digits

#### Throws

If length is not a positive integer

***

### to10() {#to10}

```ts
readonly to10: (n) => bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:162](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L162)

Converts a number from this system to decimal.

#### Parameters

##### n `string`

String representation in this number system

#### Returns `bigint`

Decimal value as bigint

#### Throws

If string contains invalid digits

## Accessors

### base {#base}

#### Get Signature

```ts
get base(): bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:84](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L84)

Gets the numeric base of this number system (total count of unique digits)

##### Returns `bigint`

***

### byChar {#bychar}

#### Get Signature

```ts
get byChar(): Map<number, bigint>;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:117](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L117)

Maps each digit's character code to its numeric value in the system

##### Returns `Map`\<`number`, `bigint`\>

***

### digits {#digits}

#### Get Signature

```ts
get digits(): readonly number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:89](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L89)

Gets array of character codes for all digits in order

##### Returns

readonly `number`[]

***

### maxSafeDigits {#maxsafedigits}

#### Get Signature

```ts
get maxSafeDigits(): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:122](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L122)

Gets maximum number of digits that can safely represent MAX_SAFE_INTEGER

##### Returns `number`

***

### powers {#powers}

#### Get Signature

```ts
get powers(): Powers;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:112](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L112)

Gets the Powers calculator for this number system's base

##### Returns

[`Powers`](Class.Powers.md)


# Class: Powers

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:16](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L16)

Utility class for efficiently computing and caching powers of a given base number.

## Example

```typescript
// Create powers calculator for base 16n (hexadecimal)
const hexPowers = new Powers(16n);

// Get 16^3
const power3 = hexPowers.get(3); // Returns 4096n

// Get 16^5 - automatically computes and caches intermediate powers
const power5 = hexPowers.get(5); // Returns 1048576n
```

## Constructors

### Constructor

```ts
new Powers(base, initDigits): Powers;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:24](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L24)

Creates a new Powers calculator.

#### Parameters

##### base `bigint`

The base number to calculate powers of. Must be >= 2n.

##### initDigits `number` = `20`

Optional. Number of initial powers to pre-calculate. Default is 20.

#### Returns `Powers`

#### Throws

If base is less than 2n

## Properties

### base {#base}

```ts
readonly base: bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:25](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L25)

The base number to calculate powers of. Must be >= 2n.

## Methods

### get() {#get}

```ts
get(pos): bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:41](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-converter.ts#L41)

Gets the power of the base at the specified position.
Automatically calculates and caches any intermediate powers needed.

#### Parameters

##### pos `number`

The power/exponent to calculate (0 returns 1n, 1 returns base, etc)

#### Returns `bigint`

The calculated power as a bigint


# Class: ProgrammingError

Defined in: [IdeaProjects/kit/kit/src/core/errors/programming-error.ts:4](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/errors/programming-error.ts#L4)

Indicates a programming error (unrecoverable; need to be fixed by code change)

## Extends

- `Error`

## Properties

### stackTraceLimit {#stacktracelimit}

```ts
static stackTraceLimit: number;
```

Defined in: .yarn/berry/cache/@types-node-npm-24.10.1-d514f50dfd-10c0.zip/node\_modules/@types/node/globals.d.ts:68

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

#### Inherited from

```ts
Error.stackTraceLimit
```

## Methods

### captureStackTrace() {#capturestacktrace}

```ts
static captureStackTrace(targetObject, constructorOpt?): void;
```

Defined in: .yarn/berry/cache/@types-node-npm-24.10.1-d514f50dfd-10c0.zip/node\_modules/@types/node/globals.d.ts:52

Creates a `.stack` property on `targetObject`, which when accessed returns
a string representing the location in the code at which
`Error.captureStackTrace()` was called.

```js
const myObject = {};
Error.captureStackTrace(myObject);
myObject.stack;  // Similar to `new Error().stack`
```

The first line of the trace will be prefixed with
`${myObject.name}: ${myObject.message}`.

The optional `constructorOpt` argument accepts a function. If given, all frames
above `constructorOpt`, including `constructorOpt`, will be omitted from the
generated stack trace.

The `constructorOpt` argument is useful for hiding implementation
details of error generation from the user. For instance:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  // Create an error without stack trace to avoid calculating the stack trace twice.
  const { stackTraceLimit } = Error;
  Error.stackTraceLimit = 0;
  const error = new Error();
  Error.stackTraceLimit = stackTraceLimit;

  // Capture the stack trace above function b
  Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace
  throw error;
}

a();
```

#### Parameters

##### targetObject `object`

##### constructorOpt? `Function`

#### Returns `void`

#### Inherited from

```ts
Error.captureStackTrace
```

***

### prepareStackTrace() {#preparestacktrace}

```ts
static prepareStackTrace(err, stackTraces): any;
```

Defined in: .yarn/berry/cache/@types-node-npm-24.10.1-d514f50dfd-10c0.zip/node\_modules/@types/node/globals.d.ts:56

#### Parameters

##### err `Error`

##### stackTraces `CallSite`[]

#### Returns `any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

```ts
Error.prepareStackTrace
```


# Class: PromiseController

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:8](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L8)

A class that provides a mechanism to handle the abortion of asynchronous operations.
It maintains a set of listeners that can be notified when an abortion occurs.

## Accessors

### aborted {#aborted}

#### Get Signature

```ts
get aborted(): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:18](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L18)

Retrieves the current aborted state.

##### Returns `boolean`

The value of the aborted state.

## Methods

### abort() {#abort}

```ts
abort(reason): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:28](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L28)

Aborts the current operation and notifies all registered abort handlers.

#### Parameters

##### reason `string`

The reason for aborting the operation.

#### Returns `void`

- Does not return a value. Throws an error if any abort handlers throw exceptions.

***

### off() {#off}

```ts
off(fn, all?): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:64](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L64)

Removes a function from the list of abort handlers. If `all` is true, it removes all instances of the given function; otherwise, it decrements its count.

#### Parameters

##### fn

(`reason`) => `void`

The function to remove from the list of abort handlers. It receives a reason string when called.

##### all? `boolean` = `false`

If true, removes all occurrences of the function from the abort handlers. Defaults to false, removing only one occurrence.

#### Returns `void`

This method does not return a value.

***

### on() {#on}

```ts
on(fn): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/promise-controller.ts:53](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/promise-controller.ts#L53)

Registers a callback function to be executed when a specific event occurs.

#### Parameters

##### fn

(`reason`) => `void`

A callback function that receives a string parameter representing the reason for the event.

#### Returns `void`


# Function: angleBetween()

```ts
function angleBetween(
   x1, 
   y1, 
   x2, 
   y2): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:42](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L42)

Угол (в радианах) от точки (x1,y1) до (x2,y2).

## Parameters

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

## Returns

`number`


# Function: binaryStringSearch()

```ts
function binaryStringSearch(sorted, key): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/string-util.ts:88](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/utils/string-util.ts#L88)

Binary search to find a key in sorted array

TODO replace usage with lodash's binarySearch

## Parameters

### sorted

readonly `string`[]

### key `string`

## Returns

`number`


# Function: boundingBox()

```ts
function boundingBox(points): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:199](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L199)

Получить ограничивающий прямоугольник (bounding box) для набора точек.

## Parameters

### points

\[`number`, `number`\][]

## Returns

`object`

### height

```ts
height: number;
```

### width

```ts
width: number;
```

### x

```ts
x: number;
```

### y

```ts
y: number;
```


# Function: catching()

Executes a function and, if an exception is thrown, executes a fallback function.

## Template

## Param

The function to execute. If it runs without throwing, its result is returned.

## Param

The fallback function to execute if the first function throws an exception.

## Call Signature

```ts
function catching<T, C>(fn, onCatch): T | C;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:1](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/flow/catching.ts#L1)

### Type Parameters

#### T `T`

#### C `C`

### Parameters

#### fn

() => `T`

#### onCatch

() => `C`

### Returns `T` \| `C`

## Call Signature

```ts
function catching<T>(fn, onCatch): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:2](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/flow/catching.ts#L2)

### Type Parameters

#### T `T`

### Parameters

#### fn

() => `T`

#### onCatch

() => `T`

### Returns `T`


# Function: catchingAsync()

Executes an asynchronous function and provides a mechanism to handle any errors that may occur during its execution.

## Template

## Param

An asynchronous function that will be executed.

## Param

A function that gets invoked with the caught error if `fn` throws or rejects. This function can return a value or a Promise.

## Call Signature

```ts
function catchingAsync<T, C>(fn, onCatch): Promise<T | C>;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:20](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/flow/catching.ts#L20)

### Type Parameters

#### T `T`

#### C `C`

### Parameters

#### fn

() => `Promise`\<`T`\>

#### onCatch

(`e`) => `C` \| `Promise`\<`C`\>

### Returns `Promise`\<`T` \| `C`\>

## Call Signature

```ts
function catchingAsync<T>(fn, onCatch): Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:24](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/flow/catching.ts#L24)

### Type Parameters

#### T `T`

### Parameters

#### fn

() => `Promise`\<`T`\>

#### onCatch

(`e`) => `T` \| `Promise`\<`T`\>

### Returns `Promise`\<`T`\>


# Function: checked()

Evaluates a value against a given check function and throws an error if the check fails.

## Param

The value to be validated.

## Param

A function that performs a validation check on the value. Should return a truthy value if validation passes.

## Param

A function that generates an error message or error object to be thrown if validation fails.

## Throws

Throws an error if the check function returns a falsy value.

## Call Signature

```ts
function checked<T, R>(
   v, 
   check, 
   message): R;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:309](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L309)

### Type Parameters

#### T `T`

#### R `R`

### Parameters

#### v `T`

#### check

(`v`) => `v is R`

#### message

(`v`) => `string` \| `Error`

### Returns `R`

## Call Signature

```ts
function checked<T>(
   v, 
   check, 
   message): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:310](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L310)

### Type Parameters

#### T `T`

### Parameters

#### v `T`

#### check

(`v`) => `unknown`

#### message

(`v`) => `string` \| `Error`

### Returns `T`


# Function: circleArea()

```ts
function circleArea(r): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:98](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L98)

Площадь круга.

## Parameters

### r `number`

## Returns

`number`


# Function: circleCircumference()

```ts
function circleCircumference(r): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:103](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L103)

Длина окружности (периметр круга).

## Parameters

### r `number`

## Returns

`number`


# Function: clamp()

```ts
function clamp(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:121](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L121)

Restricts a number to be within a specified range.

The `clamp` function ensures that a given number `v` lies within the bounds
defined by `min` and `max`. If `v` is less than `min`, the function returns
`min`. If `v` is greater than `max`, the function returns `max`.
Otherwise, it returns `v`.

Throws an error if `min` is greater than `max`.

## Parameters

### v `number`

The number to be clamped.

### min `number`

The lower boundary of the range.

### max `number`

The upper boundary of the range.

## Returns

`number`

The clamped value, restricted to the inclusive range [min, max].

## Throws

If `min` is greater than `max`.


# Function: createIoCContainer()

```ts
function createIoCContainer<T>(schema): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/ioc.ts:31](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/ioc.ts#L31)

A factory function to create an Inversion of Control (IoC) container.

This IoC container allows for managing dependencies by dynamically instantiating services
and ensuring proper resolution of their dependencies. Services can be defined as part
of the input schema, and their implementations can be registered into the container.

The container prevents redefinition of service implementations after they have been
instantiated and immediately throws an error in cases of cyclic dependencies or
accessing unregistered services.

## Type Parameters

### T `T` *extends* `Record`\<`string`, `unknown`\>

The type definition of the IoC container, representing services and their types.

## Parameters

### schema

\{ \[K in string \| number \| symbol\]: null \}

A schema object defining the service keys the container will manage.
Each key is set to `null` to establish the potential for registering an implementation.

## Returns

`object`

An object containing:
- `container`: The IoC container instance that provides resolved implementations of the services.
- `implementations`: A proxy object allowing for the registration of service implementations.

### container

```ts
container: T;
```

### implementations

```ts
implementations: { [K in string | number | symbol]: (container: T) => T[K] };
```

## Throws

If a service implementation is accessed without being registered.

## Throws

If an implementation of a service is set after the service has been instantiated.

## Throws

If a cyclic dependency is detected when resolving a service.


# Function: debouncedCollectingAsync()

```ts
function debouncedCollectingAsync<Args, T, R>(
   delay, 
   collect, 
   fn): (...args) => Promise<T> & object;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/debounced-collecting-async.ts:19](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/debounced-collecting-async.ts#L19)

Creates a function that combines debouncing logic with asynchronous callback execution.
The function allows for multiple calls within a specified delay to be grouped and processed together,
ensuring that the provided asynchronous function is executed only after the delay has elapsed.

## Type Parameters

### Args `Args` *extends* readonly `unknown`[]

The type of arguments that the debounced function accepts.

### T `T`

The type of the value returned by the provided asynchronous function.

### R `R`

The type used to collect and accumulate arguments within the delay period.

## Parameters

### delay `number`

The debounce delay in milliseconds; during this time, additional calls are collected.

### collect

(`o`, ...`args`) => `R`

A function to process and accumulate arguments over multiple calls. It receives the current accumulation and the new arguments, and returns the updated value.

### fn

(`o`) => `Promise`\<`T`\>

The asynchronous function to execute once the debounce delay elapses, using the accumulated arguments.

## Returns

(...`args`) => `Promise`\<`T`\> & `object`

A debounced function that processes arguments with the provided collect method and executes the asynchronous function after the delay.
Includes a `cancel` method to cancel pending executions.


# Function: degToRad()

```ts
function degToRad(deg): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:172](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L172)

Приведение градусы ↔ радианы.

## Parameters

### deg `number`

## Returns

`number`


# Function: denyRecursion()

```ts
function denyRecursion<T>(action, err): (...args) => BusyGuardResult<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/functions/deny-recursion.ts:19](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/functions/deny-recursion.ts#L19)

Prevents recursive execution of a given function by ensuring that the function cannot be called again
while it is already running. If an attempt is made to call the function recursively, an error will be thrown.

## Type Parameters

### T `T` *extends* `AnyAnyFunction`

The type of the function to guard against recursion.

## Parameters

### action `T`

The function to guard. This function will only be executed if it is not already in progress.

### err

The error to throw if a recursive call is attempted.
A static string or a callback function that generates an error or error message based on the arguments of the function.

`string` | (...`args`) => `string` \| `Error`

## Returns

A wrapped version of the original function that enforces
a "no recursion" rule. If the original function returns a promise, the guard ensures that recursion is only allowed
after the promise resolves.

```ts
(...args): BusyGuardResult<T>;
```

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns `BusyGuardResult`\<`T`\>

## Throws

If a recursive invocation of the function is attempted, the provided error is thrown.


# Function: disposers()

```ts
function disposers(initializers, onInit?): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/disposers.ts:43](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/disposers.ts#L43)

Creates a composite disposer function that manages multiple disposable resources.
Particularly useful for managing MobX reactions and store cleanup in a unified way.

## Parameters

### initializers

readonly (`ObjectDisposable` \| `FunctionDisposable`)[]

An array of disposable resources that can be either:
  - Functions that perform cleanup when called (FunctionDisposable)
  - Objects with init/destroy methods (ObjectDisposable)
The function automatically calls init() for object-style disposables during setup.

### onInit?

() => `void`

Optional callback function to be executed after all initializers are set up

## Returns

A cleanup function that when called:
  - Executes all collected disposers in the order they were added
  - Collects any errors that occur during disposal
  - If any errors occurred, throws an Errors instance containing all collected errors

```ts
(): void;
```

### Returns `void`

## Example

```typescript
const cleanup = disposers([
  // Function-style disposable
  reaction(() => ..., () => ...)),
  autorun(() => ...),

  // Object-style disposable - e.g. some store with .init() and .destroy() methods
  {
    init: () => { // setup logic },
    destroy: () => { // cleanup logic }
  }
]);

// Later, cleanup all resources (or return it to somebody, who will clean up)
cleanup();
```

## Throws

If any disposers throw during cleanup, all errors are collected
                 and thrown as a single Errors instance


# Function: distance()

```ts
function distance(
   x1, 
   y1, 
   x2, 
   y2): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:16](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L16)

Расстояние между двумя точками.

## Parameters

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

## Returns

`number`


# Function: distanceTo00()

```ts
function distanceTo00(x, y): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:6](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L6)

Расстояние до (0;0)

## Parameters

### x `number`

### y `number`

## Returns

`number`


# Function: fromEntries()

```ts
function fromEntries<T, V>(pairs): Record<T, V>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/object-utils.ts:100](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/utils/object-utils.ts#L100)

Converts an array of key-value pairs into an object.

## Type Parameters

### T `T` *extends* `string` \| `number` \| `symbol`

The type of the keys in the resulting object. Must extend string, number, or symbol.

### V `V`

The type of the values in the resulting object.

## Parameters

### pairs

readonly readonly \[`T`, `V`\][]

An array of key-value pairs where each element is a tuple containing a key and a value.

## Returns

`Record`\<`T`, `V`\>

An object constructed from the provided key-value pairs.


# Function: groupedBy()

```ts
function groupedBy<T, K>(o, by): Record<K, T[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/object-utils.ts:32](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/utils/object-utils.ts#L32)

Groups the elements of an array based on the result of a callback function.

## Type Parameters

### T `T`

The type of the elements in the input array.

### K `K` *extends* `string` \| `number` \| `symbol`

The type of the keys returned by the callback function.

## Parameters

### o

readonly `T`[]

The input array to be grouped.

### by

(`t`) => `K`

A callback function that takes an element of the array and returns a key
to group by.

## Returns

`Record`\<`K`, `T`[]\>

An object where the keys are the results of the callback function, and
the values are arrays of elements from the input array that correspond to each key.


# Function: isArrayOf()

```ts
function isArrayOf<K>(isK): Checker<K[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:173](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L173)

A utility function that checks if a given value is an array
whose elements satisfy a specific type guard function.

## Type Parameters

### K `K`

The type of elements in the array.

## Parameters

### isK

[`Checker`](TypeAlias.Checker.md)\<`K`\>

A type guard function to validate individual elements of the array.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`K`[]\>

A function that takes in a value and
determines if it is an array of elements satisfying the `isK` type guard.


# Function: isDefined()

```ts
function isDefined<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:24](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L24)

Checks if a given value is neither `undefined` nor `null`.

## Type Parameters

### T `T`

## Parameters

### o

The value to check.

`T` | `null` | `undefined`

## Returns

`o is T`

Returns `true` if the value is defined (not `undefined` or `null`), otherwise `false`.


# Function: isInstanceOf()

```ts
function isInstanceOf<C>(...classes): Checker<C>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:194](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L194)

A utility function to check if a given object is an instance of one or more specified classes.

## Type Parameters

### C `C`

The type representing the class or classes to check against.

## Parameters

### classes

...`ClassConstructor`\<`C`\>[]

A list of class constructors to check the object instance against.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`C`\>

A type guard function that takes an object and determines if it is an instance of any of the provided classes.


# Function: isInteger()

```ts
function isInteger(o): o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:124](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L124)

Determines whether the provided value is an integer.

This function checks if the input is a number and verifies
that it has no fractional component by comparing the value
to its truncated version.

## Parameters

### o `unknown`

The value to be checked.

## Returns

`o is number`

Returns true if the value is a number and an integer, false otherwise.


# Function: isNotNull()

```ts
function isNotNull<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:45](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L45)

A type guard function that determines if a given value is not null.

## Type Parameters

### T `T`

The type of the input value.

## Parameters

### o

The value to be checked.

`T` | `null`

## Returns

`o is T`

Returns true if the value is not null; otherwise, returns false.


# Function: isNotUndefined()

```ts
function isNotUndefined<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:36](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L36)

A type guard function that checks whether a given value is not `undefined`.

This function takes in a variable of type `T | undefined` and returns a boolean value indicating
whether the variable is of type `T`.

## Type Parameters

### T `T`

The type of the input value being evaluated.

## Parameters

### o

The value to be checked.

`T` | `undefined`

## Returns

`o is T`

A boolean value indicating whether the value is not `undefined`.


# Function: isNull()

```ts
function isNull(o): o is null;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:81](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L81)

Checks if the given value is strictly null.

This function is a type predicate that determines whether the input value
is of type `null`. It returns `true` only if the provided value is strictly
equal to `null`; otherwise, it returns `false`.

## Parameters

### o `unknown`

The value to check.

## Returns

`o is null`

A boolean indicating whether the input value is null.


# Function: isNullish()

```ts
function isNullish(o): o is null | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:92](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L92)

Determines whether the given value is null or undefined.

This utility function checks if a value is either strictly `null` or `undefined`
and returns a boolean result. It utilizes loose equality to handle both cases.

## Parameters

### o `unknown`

The value to be checked.

## Returns

o is null \| undefined

- `true` if the value is null or undefined, otherwise `false`.


# Function: isNumber()

```ts
function isNumber(o): o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:112](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L112)

Checks if the provided value is of type number.

This function determines whether the given input is a JavaScript number.
It performs a strict type check and returns true if the input is a number,
otherwise it returns false.

## Parameters

### o `unknown`

The value to be checked.

## Returns

`o is number`

- True if the input is a number, otherwise false.


# Function: isPlainObject()

```ts
function isPlainObject<T, R>(o): o is T & Record<string, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:137](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L137)

Checks if a given value is a plain object.

A value is considered a plain object if it is not null, has an object type,
and its prototype is exactly the default `Object.prototype`.

## Type Parameters

### T `T`

The type of the input value.

### R `R`

The inferred type of the value's properties.

## Parameters

### o `T`

The value to check.

## Returns

`o is T & Record<string, R>`

`true` if the value is a plain object, otherwise `false`.


# Function: isROArray()

```ts
function isROArray<A>(a): a is readonly A[];
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:161](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L161)

Determines if the provided value is a read-only array.

## Type Parameters

### A `A`

## Parameters

### a `unknown`

The value to be checked.

## Returns

`a is readonly A[]`

True if the value is a read-only array; otherwise, false.


# Function: isSomeObject()

```ts
function isSomeObject<T, R>(o): o is T & Record<string, R>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:151](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L151)

Checks if the provided value is an object and not null, while also ensuring
it is not an array. This function performs a type guard that verifies the
value is an object with string keys and values of a specific type.

## Type Parameters

### T `T`

The original type of the input value.

### R `R`

The type of the object property values.

## Parameters

### o `T`

The value to check.

## Returns

`o is T & Record<string, R>`

- Returns true if the value is an object
and meets the specified constraints, otherwise false.


# Function: isSomeOf()

```ts
function isSomeOf<Vs>(...checkers): Checker<Vs[number]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:224](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L224)

A utility function that checks whether a given value satisfies at least one of the provided type-checking functions.

## Type Parameters

### Vs `Vs` *extends* readonly `unknown`[]

## Parameters

### checkers

...[`Checkers`](TypeAlias.Checkers.md)\<`Vs`\>

A rest parameter consisting of an array of type-checking functions.
Each function should take a value of an unknown type and validate if it matches a specific type or condition.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`Vs`\[`number`\]\>

A function that takes an unknown value and returns `true` if the value satisfies
at least one of the provided type-checking functions, or `false` otherwise.


# Function: isString()

```ts
function isString(o): o is string;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:100](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L100)

A type guard function to check if the given input is of type string.

## Parameters

### o `unknown`

The value to be checked.

## Returns

`o is string`

Returns true if the input is a string, otherwise false.


# Function: isTruthy()

```ts
function isTruthy<T>(o): o is T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:58](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L58)

Determines whether a value is truthy, filtering out falsy values such as
`undefined`, `null`, `false`, `0`, and empty strings (`''`).

This is a TypeScript type guard function that narrows the type of the given
value to exclude falsy values.

## Type Parameters

### T `T`

The original type of the input value.

## Parameters

### o

The value to be evaluated.

`false` | `""` | `0` | `T` | `null` | `undefined`

## Returns

`o is T`

Returns `true` if the value is truthy, otherwise `false`.


# Function: isTuple()

```ts
function isTuple<Vs>(...items): Checker<Vs>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:244](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L244)

A utility function used to determine whether a given value is a tuple of a specific structure.

This function accepts an array of type checkers and validates if the provided value is a tuple
matching the specified type structure. Each element in the tuple is validated against its corresponding type checker.

## Type Parameters

### Vs `Vs` *extends* readonly `unknown`[]

## Parameters

### items

...[`Checkers`](TypeAlias.Checkers.md)\<`Vs`\>

An array of type-checking functions, one for each element in the tuple.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`Vs`\>

- A function that takes a value `o` and checks if it matches the tuple defined by the specified type checkers.


# Function: isTuples()

```ts
function isTuples<Vs>(...items): Checker<Vs[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:268](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L268)

Determines if a given array adheres strictly to a tuple structure based on provided type checkers.

The function checks if the input array matches the expected type structure as defined
by an array of type checkers. Each element of the array must conform to the corresponding
type checker in the same position.

## Type Parameters

### Vs `Vs` *extends* readonly `unknown`[]

## Parameters

### items

...[`Checkers`](TypeAlias.Checkers.md)\<`Vs`\>

A list of type checkers corresponding to each element of the expected tuple.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`Vs`[]\>

Returns `true` if the array matches the tuple structure, otherwise `false`.


# Function: isUndefined()

```ts
function isUndefined(o): o is undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:69](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L69)

A type guard function to determine if a given value is undefined.

This function checks if the provided value is strictly equal to `undefined`.
It can be used to refine the type of a variable to `undefined` in TypeScript.

## Parameters

### o `unknown`

The value to check.

## Returns

`o is undefined`

True if the value is `undefined`, otherwise false.


# Function: lerp()

```ts
function lerp(
   a, 
   b, 
   t): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:29](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L29)

Линейная интерполяция между a и b на t ∈ [0,1].

## Parameters

### a `number`

### b `number`

### t `number`

## Returns

`number`


# Function: lerpPoint()

```ts
function lerpPoint(
   x1, 
   y1, 
   x2, 
   y2, 
   t): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:34](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L34)

Интерполяция между двумя точками.

## Parameters

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

### t `number`

## Returns

\[`number`, `number`\]


# Function: mapEntries()

```ts
function mapEntries<K, V, R, D>(o, fn): Record<K, D>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/object-utils.ts:54](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/utils/object-utils.ts#L54)

Transforms the entries of an object by applying a mapping function to its values and keys.

## Type Parameters

### K `K` *extends* `string`

The type of the keys in the input object. Must extend `string`.

### V `V`

The type of the values in the input object.

### R `R` *extends* `Record`\<`K`, `V`\>

The type of the input object. Must be a record where the key is of type `K` and the value is of type `V`.

### D `D`

The type of the values in the output object.

## Parameters

### o `R`

The input object whose entries will be transformed.

### fn

(`v`, `k`) => `D`

A function that takes a value of type `V` and a key of type `K`, and returns a transformed value of type `D`.

## Returns

`Record`\<`K`, `D`\>

A new object with the same keys as the input object, but with transformed values of type `D`.


# Function: mapOwnEntries()

```ts
function mapOwnEntries<R, D>(o, fn): Record<keyof R, D>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/object-utils.ts:78](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/utils/object-utils.ts#L78)

Iterates over the own enumerable string-keyed properties of an object and
applies a transformation function to each key-value pair, returning a new
object with the transformed values.

## Type Parameters

### R `R` *extends* `Record`\<`string`, `unknown`\>

An object with string keys and values of any type.

### D `D`

The type of the resulting transformed values.

## Parameters

### o `R`

The object whose own enumerable properties are to be iterated over.

### fn

(`v`, `k`) => `D`

The function to apply to each property.
The function receives the value and key of each property as arguments.

## Returns

`Record`\<keyof `R`, `D`\>

A new object with the same keys as the input
object, but transformed values based on the provided function.


# Function: mappedBy()

```ts
function mappedBy<T, K>(o, by): Record<K, T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/object-utils.ts:10](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/utils/object-utils.ts#L10)

Maps an array of objects to an object where keys are derived from a specified property or computation.

## Type Parameters

### T `T`

The type of elements in the input array.

### K `K` *extends* `string` \| `number` \| `symbol`

The type of the keys, which extends string, number, or symbol.

## Parameters

### o

readonly `T`[]

The input array to be mapped.

### by

(`t`) => `K`

A function that determines the key for each element in the array.

## Returns

`Record`\<`K`, `T`\>

An object where each key corresponds to the result of the `by` function applied to an element in the array, and the value is the corresponding element.


# Function: midpoint()

```ts
function midpoint(
   x1, 
   y1, 
   x2, 
   y2): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:21](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L21)

Средняя точка (midpoint) между двумя точками.

## Parameters

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

## Returns

\[`number`, `number`\]


# Function: multiRecurringDenier()

```ts
function multiRecurringDenier<Fn, K>(
   fn, 
   key, 
error): (...args) => ReturnType<Fn>;
```

Defined in: [IdeaProjects/kit/kit/src/core/functions/deny-recursion.ts:82](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/functions/deny-recursion.ts#L82)

A higher-order function that wraps a given function to prevent
multiple concurrent invocations with the same key. This utility
ensures that only a single operation is in progress for a given
key at a time, rejecting new invocations for that key until the
current operation completes.

## Type Parameters

### Fn `Fn` *extends* `AnyAnyFunction`

The type of the function to be wrapped.

### K `K`

The type of the key derived from the function arguments.

## Parameters

### fn `Fn`

The original function to be wrapped. This function
    will be called with the supplied arguments when no other
    in-progress call with the same key is detected.

### key

(...`args`) => `K`

A function that derives
    a unique key from the arguments supplied to the wrapped function.
    This key will be used to track in-progress and completed calls.

### error

(...`args`) => `string` \| `Error`

A function
    that generates an error message or an error object when an attempt
    is made to call the wrapped function concurrently with the same key.
    The error message or object will be used in the rejection.

## Returns

A new function
    that wraps the given function. When called, this function calculates
    the key for the invocation, monitors concurrent executions for the
    same key, and prevents redundant invocations. If a conflict occurs,
    an error is thrown with the provided error message or object.

```ts
(...args): ReturnType<Fn>;
```

### Parameters

#### args

...`Parameters`\<`Fn`\>

### Returns `ReturnType`\<`Fn`\>

## Throws

Throws an error generated by the `error` parameter if
    a duplicate concurrent invocation is detected for a particular key.


# Function: notNull()

```ts
function notNull<T>(o, message?): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/not-null.ts:15](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/flow/not-null.ts#L15)

Ensures that the provided value is not null or undefined. If the value is null or undefined,
an error is thrown based on the specified message or error-generating function.

## Type Parameters

### T `T`

## Parameters

### o

The value to check for null or undefined.

`T` | `null` | `undefined`

### message?

An error message string, or
       a function returning either a custom error or an error message string.

`string` | () => `string` \| `Error`

## Returns

`T`

The non-null, non-undefined value.

## Throws

If the value is null or undefined, and a string is provided as the message.

## Throws

If the value is null or undefined and a function generating an Error is provided.


# Function: once()

## Call Signature

```ts
function once<T, O, K>(
   target, 
   key, 
d): TypedPropertyDescriptor<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/once.ts:60](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/once.ts#L60)

Memoizes a getter: replaces it with its computed value upon first access.

Decorator usage: apply to a getter to turn it into a lazy property.
After the first `get`, the descriptor is replaced with a concrete value using
[setValueProperty](Function.setValueProperty.md), so subsequent accesses return the cached value without
invoking the original getter again.

Example (decorator):
```ts
class Example {
  @once
  get expensive() {
    return heavyComputation();
  }
}
```

Notes:
- Must be used on getters only; using on a setter or a non-getter throws an error.
- The resulting property is non-writable, enumerable, and configurable.

### Type Parameters

#### T `T`

The inferred return type of the getter.

#### O `O`

The type of the instance that owns the property.

#### K `K` *extends* `string` \| `number` \| `symbol`

The key of the property on `O`.

### Parameters

#### target `O`

The prototype or instance the decorator is applied to (provided by TS decorator system).

#### key `K`

The property name being decorated.

#### d `TypedPropertyDescriptor`\<`T`\>

The typed property descriptor provided by the decorator system.

### Returns `TypedPropertyDescriptor`\<`T`\>

A new getter-only descriptor that memoizes its first computed value.

## Call Signature

```ts
function once<T, O, K>(
   target, 
   key, 
   replace, 
   value): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/once.ts:90](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/once.ts#L90)

Sets a property to a concrete value in a form suitable for use inside a getter body.

Function usage: when called with `true` as the third argument, it directly defines
the value on the instance (using [setValueProperty](Function.setValueProperty.md)) and returns it. This is
especially handy for manual lazy initialization inside a getter without using a
decorator.

Example (function form inside getter):
```ts
get a() {
  return once(this, 'a', true, 123 + 456 + 789);
}
```

### Type Parameters

#### T `T`

Type of the value being set.

#### O `O`

Type of the target object.

#### K `K` *extends* `string` \| `number` \| `symbol`

The key of the property on `O`.

### Parameters

#### target `O`

The object on which to set the property.

#### key `K`

Property name to set.

#### replace `true`

Literal `true` to select the function form of `once`.

#### value `T`

The value to assign to the property.

### Returns `T`

The value that was assigned to the property.


# Function: pointInCircle()

```ts
function pointInCircle(
   px, 
   py, 
   cx, 
   cy, 
   r): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:117](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L117)

Входит ли точка (px,py) в круг (cx,cy,r)?

## Parameters

### px `number`

### py `number`

### cx `number`

### cy `number`

### r `number`

## Returns

`boolean`


# Function: pointInRect()

```ts
function pointInRect(
   px, 
   py, 
   rx, 
   ry, 
   width, 
   height): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:76](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L76)

Проверка, лежит ли точка (px,py) внутри прямоугольника.

## Parameters

### px `number`

### py `number`

### rx `number`

### ry `number`

### width `number`

### height `number`

## Returns

`boolean`


# Function: pointInTriangle()

```ts
function pointInTriangle(
   px, 
   py, 
   x1, 
   y1, 
   x2, 
   y2, 
   x3, 
   y3): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:150](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L150)

Проверка, лежит ли точка (px,py) внутри треугольника
(метод барицентрических координат).

## Parameters

### px `number`

### py `number`

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

### x3 `number`

### y3 `number`

## Returns

`boolean`


# Function: pointOnCircle()

```ts
function pointOnCircle(
   cx, 
   cy, 
   r, 
   angleRad): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:109](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L109)

Координаты точки на окружности:
angleRad — угол в радианах от точки (cx,cy).

## Parameters

### cx `number`

### cy `number`

### r `number`

### angleRad `number`

## Returns

\[`number`, `number`\]


# Function: rectArea()

```ts
function rectArea(width, height): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:60](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L60)

Площадь прямоугольника.

## Parameters

### width `number`

### height `number`

## Returns

`number`


# Function: rectCenter()

```ts
function rectCenter(
   x, 
   y, 
   width, 
   height): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:70](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L70)

Центр прямоугольника { x, y, width, height }.

## Parameters

### x `number`

### y `number`

### width `number`

### height `number`

## Returns

\[`number`, `number`\]


# Function: rectPerimeter()

```ts
function rectPerimeter(width, height): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:65](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L65)

Периметр прямоугольника.

## Parameters

### width `number`

### height `number`

## Returns

`number`


# Function: rectsIntersect()

```ts
function rectsIntersect(
   r1x, 
   r1y, 
   w1, 
   h1, 
   r2x, 
   r2y, 
   w2, 
   h2): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:82](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L82)

Пересекаются ли два прямоугольника?

## Parameters

### r1x `number`

### r1y `number`

### w1 `number`

### h1 `number`

### r2x `number`

### r2y `number`

### w2 `number`

### h2 `number`

## Returns

`boolean`


# Function: retrying()

```ts
function retrying<T>(shouldRetry, fn): Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/retrying.ts:16](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/retrying.ts#L16)

Выполняет асинхронную функцию fn, повторяя ее в случае сбоя
в соответствии с логикой, определенной в shouldRetry.

## Type Parameters

### T `T`

## Parameters

### shouldRetry `ShouldRetryFn`

Функция, определяющая, нужно ли повторять попытку.

### fn

(`attempt`) => `Promise`\<`T`\>

Асинхронная функция для выполнения.

## Returns

`Promise`\<`T`\>


# Function: rotatePoint()

```ts
function rotatePoint(
   x, 
   y, 
   cx, 
   cy, 
   rad): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:47](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L47)

Поворот точки (x,y) вокруг центра (cx,cy) на угол rad.

## Parameters

### x `number`

### y `number`

### cx `number`

### cy `number`

### rad `number`

## Returns

\[`number`, `number`\]


# Function: rotateRect()

```ts
function rotateRect(
   x, 
   y, 
   width, 
   height, 
   cx, 
   cy, 
   angleRad): [number, number][];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:178](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L178)

Поворот прямоугольника на угол: возвращает новые координаты его вершин.

## Parameters

### x `number`

### y `number`

### width `number`

### height `number`

### cx `number`

### cy `number`

### angleRad `number`

## Returns

\[`number`, `number`\][]


# Function: scale()

```ts
function scale(
   v, 
   fromMin, 
   fromMax, 
   toMin, 
   toMax): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:102](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L102)

Scales a numeric value from one range to another.

This function takes a value and re-maps it from a source range
([fromMin, fromMax]) to a target range ([toMin, toMax]).

The source range is defined with the parameters `fromMin` and `fromMax`.
The target range is defined with the parameters `toMin` and `toMax`.

If the value lies outside the source range, the scaling is performed
as if the source range were extended, without clamping the final result.

## Parameters

### v `number`

The value to be scaled.

### fromMin `number`

The minimum of the source range.

### fromMax `number`

The maximum of the source range.

### toMin `number`

The minimum of the target range.

### toMax `number`

The maximum of the target range.

## Returns

`number`

The value scaled to the target range.


# Function: scaleFrom01()

```ts
function scaleFrom01(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:26](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L26)

Scales a value from a normalized range [0, 1] to a specified range [min, max].

## Parameters

### v `number`

The value to be scaled, assumed to be in the range [0, 1].

### min `number`

The lower bound of the target range.

### max `number`

The upper bound of the target range.

## Returns

`number`

The scaled value in the range [min, max].


# Function: scaleTo01()

```ts
function scaleTo01(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:53](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L53)

Scales a given value to a normalized range [0, 1] based on the specified minimum and maximum range values.

Throws an error if the maximum and minimum values are equal, as the result would be NaN in this scenario.

## Parameters

### v `number`

The value to scale.

### min `number`

The minimum value of the original range.

### max `number`

The maximum value of the original range.

## Returns

`number`

The scaled value within the range [0, 1].

## Throws

If max is equal to min.


# Function: scaleTo01\_unsafe()

```ts
function scaleTo01_unsafe(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:40](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L40)

Scales a given value to a normalized range between 0 and 1.

This function is used to map a value `v` from an input range defined by `min`
and `max` to a proportional position within the range [0, 1]. It assumes
that `min` is not equal to `max` and does not perform validation on the inputs.

## Parameters

### v `number`

The value to be scaled.

### min `number`

The lower bound of the input range.

### max `number`

The upper bound of the input range.

## Returns

`number`

The normalized value within the range [0, 1].


# Function: scale\_unsafe()

```ts
function scale_unsafe(
   v, 
   fromMin, 
   fromMax, 
   toMin, 
   toMax): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:75](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L75)

Scales a given number `v` from one range to another without enforcing boundary checks.

This function converts the input value from an initial range [fromMin, fromMax]
into a normalized range [0, 1], and then scales it to the target range [toMin, toMax].
It does not guarantee the input `v` is within the range [fromMin, fromMax], hence
may produce results beyond the target range boundaries if the input is outside the source range.

## Parameters

### v `number`

The value to be scaled from the source range to the target range.

### fromMin `number`

The minimum value of the source range.

### fromMax `number`

The maximum value of the source range.

### toMin `number`

The minimum value of the target range.

### toMax `number`

The maximum value of the target range.

## Returns

`number`

The scaled value in the target range.


# Function: setValueProperty()

```ts
function setValueProperty<T, K, O>(
   target, 
   key, 
   value): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/once.ts:20](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/once.ts#L20)

Defines a value property on the given target with stable attributes and returns the value.

The property is defined with the following descriptors:
- `writable: false` — the value cannot be reassigned
- `enumerable: true` — the property appears during enumeration
- `configurable: true` — the property can be reconfigured or deleted later

This helper is primarily used by [once](Function.once.md) to replace a getter with its computed value
after the first access (lazy initialization / memoization).

## Type Parameters

### T `T`

Type of the value being assigned.

### K `K` *extends* `string` \| `number` \| `symbol`

Key of the property on the target object.

### O `O`

Type of the target object.

## Parameters

### target `O`

The object on which to define the property.

### key `K`

The property name to define on the target.

### value `T`

The value to set for the property.

## Returns

`T`

The same `value` that was provided.


# Function: snap()

```ts
function snap(
   x, 
   step, 
   mode?): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:15](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/utils.ts#L15)

Adjusts a given number to the nearest multiple of a specified step size.
The adjustment can be controlled using an optional rounding mode.

## Parameters

### x `number`

The number to be adjusted.

### step `number`

The step size to which the number will be snapped.

### mode?

Optional rounding mode to apply; defaults to 'round' if not provided.
Valid values are:
  - 'ceil': Rounds up to the nearest step.
  - 'floor': Rounds down to the nearest step.
  - 'round': Rounds to the nearest step based on standard rounding rules.

`"ceil"` | `"floor"` | `"round"`

## Returns

`number`

The adjusted value, snapped to the nearest multiple of the step size.


# Function: throwing()

```ts
function throwing<T>(e): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/throwing.ts:11](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/flow/throwing.ts#L11)

A generic utility function that throws an exception provided by the given function.
Handy for throwing in ternary operators.

## Type Parameters

### T `T` = `undefined`

The expected return type of the function, defaults to `undefined`.
              This is effectively the type of the value that would have been returned if the function did not throw.

## Parameters

### e

() => `unknown`

A function that produces the error or exception to be thrown.

## Returns

`T`

This function does not return a value as it always throws.

## Throws

The error or exception returned by the provided function `e`.


# Function: triangleArea()

```ts
function triangleArea(
   x1, 
   y1, 
   x2, 
   y2, 
   x3, 
   y3): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:125](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L125)

Площадь треугольника по координатам вершин (формула Штейнера).

## Parameters

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

### x3 `number`

### y3 `number`

## Returns

`number`


# Function: triangleCentroid()

```ts
function triangleCentroid(
   x1, 
   y1, 
   x2, 
   y2, 
   x3, 
   y3): [number, number];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:137](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L137)

Центроид (точка пересечения медиан) треугольника.

## Parameters

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

### x3 `number`

### y3 `number`

## Returns

\[`number`, `number`\]


# Function: trianglePerimeter()

```ts
function trianglePerimeter(
   x1, 
   y1, 
   x2, 
   y2, 
   x3, 
   y3): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:131](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L131)

Периметр треугольника по длинам сторон.

## Parameters

### x1 `number`

### y1 `number`

### x2 `number`

### y2 `number`

### x3 `number`

### y3 `number`

## Returns

`number`


# Function: validator()

```ts
function validator<K>(isK): <R>(o, fn) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:283](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L283)

A higher-order function that validates an input against a specified checker function
and applies a transformation function if the validation is successful.

## Type Parameters

### K `K`

The type to validate the input against.

## Parameters

### isK

[`Checker`](TypeAlias.Checker.md)\<`K`\>

A function used to verify if the input matches the specified type or criteria. The `isK.type` property is used to describe the type in error messages.

## Returns

A function that takes an input value to validate and a transformation function to apply if the input is valid.

```ts
<R>(o, fn): R;
```

### Type Parameters

#### R `R`

### Parameters

#### o `unknown`

#### fn

(`o`) => `R`

### Returns `R`

## Throws

Throws an error if the input validation fails, including the expected type (if available) and the actual input value.


# Function: validator0()

```ts
function validator0<K>(isK): (o) => K;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:301](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L301)

A higher-order function that creates a validator for performing runtime type checks on an input.
The validator applies the provided type checker and throws an error if the type check fails.

## Type Parameters

### K `K`

The type to be checked.

## Parameters

### isK

[`Checker`](TypeAlias.Checker.md)\<`K`\>

A type checker function that determines whether the input matches the expected type.

## Returns

A validation function that validates the input and either returns the validated value or throws an error.

```ts
(o): K;
```

### Parameters

#### o `unknown`

### Returns `K`

## Throws

If the input does not pass the provided type check.


# Function: warnCatch()

```ts
function warnCatch(fn): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:51](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/flow/catching.ts#L51)

Executes a provided function and catches any thrown errors, logging them as warnings.

## Parameters

### fn

() => `unknown`

A function to be executed. It may throw an error.

## Returns

`void`

This function does not return a value.


# Type Alias: Checker\<T\>

```ts
type Checker<T> = (o) => o is T & object;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:15](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L15)

A type definition for a utility function that determines whether a given value
matches a specific type T. The `Checker` type is both a function and an object.

The function aspect takes an input of any type (`unknown`) and returns a boolean
indicating whether the input is of type T.

The object aspect includes an optional `type` property, which can be a string
representing the name or identifier of the type being checked.

## Type Declaration

### type?

```ts
optional type: string;
```

## Type Parameters

### T `T`

The type that the checker function validates against.


# Type Alias: Checkers\<Vs\>

```ts
type Checkers<Vs> = { [K in keyof Vs]: (o: unknown) => o is Vs[K] };
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:213](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L213)

A utility type that represents a collection of type-checking functions.
Each function in the collection determines whether a given value matches
its associated type in the input tuple provided as a generic parameter.

## Type Parameters

### Vs `Vs` *extends* readonly `unknown`[]

A tuple of types that define the type-checking functions.
Each function in the resulting object corresponds to a type in the tuple,
verifying if a value conforms to that specific type.


# Variable: NumberBase

```ts
const NumberBase: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-base.ts:58](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/number-base.ts#L58)

Provides number base conversion utilities with predefined bases and their corresponding digit sets.
Each base N is accessible through two equivalent ways:
- Array-like access: NumberBase[N]
- Property access: NumberBase.bN

Both access methods return the same NumberConverter instance for the given base.

## Type Declaration

### 10 {#10}

```ts
10: NumberConverter;
```

### 16 {#16}

```ts
16: NumberConverter;
```

### 2 {#2}

```ts
2: NumberConverter;
```

### 3 {#3}

```ts
3: NumberConverter;
```

### 4 {#4}

```ts
4: NumberConverter;
```

### 6 {#6}

```ts
6: NumberConverter;
```

### 62 {#62}

```ts
62: NumberConverter;
```

### 70 {#70}

```ts
70: NumberConverter;
```

### 8 {#8}

```ts
8: NumberConverter;
```

### 88 {#88}

```ts
88: NumberConverter;
```

### b10 {#b10}

```ts
b10: NumberConverter;
```

### b16 {#b16}

```ts
b16: NumberConverter;
```

### b2 {#b2}

```ts
b2: NumberConverter;
```

### b3 {#b3}

```ts
b3: NumberConverter;
```

### b4 {#b4}

```ts
b4: NumberConverter;
```

### b6 {#b6}

```ts
b6: NumberConverter;
```

### b62 {#b62}

```ts
b62: NumberConverter;
```

### b70 {#b70}

```ts
b70: NumberConverter;
```

### b8 {#b8}

```ts
b8: NumberConverter;
```

### b88 {#b88}

```ts
b88: NumberConverter;
```

### splitDigits10() {#splitdigits10}

```ts
splitDigits10: (n) => bigint[];
```

#### Parameters

##### n `bigint`

#### Returns `bigint`[]

## Examples

```typescript
// These are equivalent:
NumberBase[16].toString(255)  // "ff"
NumberBase.b16.toString(255)  // "ff"

// Converting between bases
const hex = NumberBase.b16.toString(255);    // "ff"
const dec = NumberBase.b16.fromString("ff"); // 255n
```

```typescript
NumberBase.splitDigits10(1234n) // Returns [1n, 2n, 3n, 4n]
```

## Param

The number to split into digits

## Returns

Array of decimal digits in big-endian order (most significant digit first)


# Variable: distance00to11

```ts
const distance00to11: number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/geometry.ts:11](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/numbers/geometry.ts#L11)

Расстояние между (0;0) и (1;1) в тех же единицах (~1.4142).
