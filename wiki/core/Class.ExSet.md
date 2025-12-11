# Class: ExSet\<Value\>

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:12](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L12)

Extended Set implementation with additional set operations and utility methods.
Provides both standard Set interface and additional functionality for set operations.

## Type Parameters

### Value

`Value`

The type of elements in the set

## Implements

- `ReadonlySet`\<`Value`\>
- `Set`\<`Value`\>

## Constructors

### Constructor

```ts
new ExSet<Value>(values?): ExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:19](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L19)

Creates a new ExSet instance

#### Parameters

##### values?

`Iterable`\<`Value`, `any`, `any`\>

Optional iterable of initial values

#### Returns

`ExSet`\<`Value`\>

## Accessors

### \[toStringTag\] {#tostringtag}

#### Get Signature

```ts
get toStringTag: string;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:228](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L228)

##### Returns

`string`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:180](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L180)

##### Returns

`ReadonlyExSet`\<`Value`\>

A read-only view of this set

***

### size {#size}

#### Get Signature

```ts
get size(): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:74](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L74)

##### Returns

`number`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:223](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L223)

#### Returns

`SetIterator`\<`Value`\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:31](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L31)

Adds a value to the set

#### Parameters

##### value

`Value`

The value to add

#### Returns

`this`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:143](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L143)

Creates a new set containing elements that exist in both this set and another iterable (intersection)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to intersect with

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing common elements

***

### backup() {#backup}

```ts
backup(fn?): () => void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:212](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L212)

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

##### Returns

`void`

#### Mutates

***

### clear() {#clear}

```ts
clear(): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:40](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L40)

Removes all elements from the set

#### Returns

`void`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:50](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L50)

Removes a value from the set

#### Parameters

##### value

`Value`

The value to remove

#### Returns

`boolean`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:134](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L134)

Creates a new set containing elements from this set that are not in another iterable (difference)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to compare against

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing elements unique to this set

***

### entries() {#entries}

```ts
entries(): SetIterator<[Value, Value]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:233](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L233)

#### Returns

`SetIterator`\<\[`Value`, `Value`\]\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:58](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L58)

Executes a callback for each value in the set

#### Parameters

##### by

(`value`, `value2`, `self`) => `void`

Function to execute for each element

#### Returns

`void`

#### Implementation of

```ts
ReadonlySet.forEach
```

***

### freeze() {#freeze}

```ts
freeze(): ReadonlyExSet<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:188](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L188)

Freezes the set, preventing any further mutations.

#### Returns

`ReadonlyExSet`\<`Value`\>

A read-only version of this set that throws on mutation attempts.

***

### has() {#has}

```ts
has(key): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:69](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L69)

Checks if a value exists in the set

#### Parameters

##### key

`Value`

The value to check for

#### Returns

`boolean`

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:85](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L85)

Checks if this set has any elements in common with another iterable

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to check against

#### Returns

`boolean`

true if there are common elements, false otherwise

***

### join() {#join}

```ts
join(other): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:100](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L100)

Adds all elements from another iterable to this set

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable whose elements will be added

#### Returns

`this`

This set instance for chaining

#### Mutates

***

### keys() {#keys}

```ts
keys(): SetIterator<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:238](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L238)

#### Returns

`SetIterator`\<`Value`\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:125](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L125)

Creates a new set containing elements from both this set and another iterable (union)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to union with

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing all unique elements

***

### subtract() {#subtract}

```ts
subtract(other): this;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:113](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L113)

Removes all elements that exist in another iterable from this set

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable whose elements will be removed

#### Returns

`this`

This set instance for chaining

#### Mutates

***

### toArray() {#toarray}

```ts
toArray<NewValue>(by): NewValue[];
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:175](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L175)

Transforms set elements into an array using a mapping function

#### Type Parameters

##### NewValue

`NewValue`

#### Parameters

##### by

(`value`) => `NewValue`

Function to transform each element

#### Returns

`NewValue`[]

Array of transformed values

***

### values() {#values}

```ts
values(): SetIterator<Value>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:243](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L243)

#### Returns

`SetIterator`\<`Value`\>

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

Defined in: [IdeaProjects/kit/kit/src/core/collections/ex-set.ts:158](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/ex-set.ts#L158)

Creates a new set containing elements that exist in either this set or another iterable, but not both (symmetric difference)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to compare against

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing elements that are in either set but not both
