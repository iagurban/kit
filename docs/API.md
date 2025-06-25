
<a name="readmemd"></a>

**@gurban/kit**

***

# gurban.kit

=======
My tools kit


<a name="classesexmapmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / ExMap

# Class: ExMap\<Key, Value\>

Defined in: packages/kit/src/collections/ex-map.ts:6

Extended Map implementation with additional utility methods and operations

## Type Parameters

### Key

`Key`

The type of keys in the map

### Value

`Value`

The type of values in the map

## Constructors

### Constructor

> **new ExMap**\<`Key`, `Value`\>(`pairs?`): `ExMap`\<`Key`, `Value`\>

Defined in: packages/kit/src/collections/ex-map.ts:13

Creates a new ExMap instance

#### Parameters

##### pairs?

`Iterable`\<\[`Key`, `Value`\], `any`, `any`\>

Optional iterable of key-value pairs to initialize the map

#### Returns

`ExMap`\<`Key`, `Value`\>

## Accessors

### \[toStringTag\]

#### Get Signature

> **get** **\[toStringTag\]**(): `string`

Defined in: packages/kit/src/collections/ex-map.ts:263

##### Returns

`string`

The string tag for this object

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: packages/kit/src/collections/ex-map.ts:79

##### Returns

`number`

The number of key-value pairs in the map

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<\[`Key`, `Value`\]\>

Defined in: packages/kit/src/collections/ex-map.ts:243

#### Returns

`IterableIterator`\<\[`Key`, `Value`\]\>

Iterator for [key, value] pairs

***

### assign()

> **assign**(`other`): `this`

Defined in: packages/kit/src/collections/ex-map.ts:185

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

### backup()

> **backup**(`fn?`): () => `void`

Defined in: packages/kit/src/collections/ex-map.ts:197

Creates a backup of the current map state and returns a restore function

#### Parameters

##### fn?

(`o`) => `ExMap`\<`Key`, `Value`\>

Optional transformation function to apply to the backup

#### Returns

Function that when called restores the map to its backed up state

> (): `void`

##### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: packages/kit/src/collections/ex-map.ts:23

Removes all elements from the map

#### Returns

`void`

#### Mutates

***

### delete()

> **delete**(`key`): `boolean`

Defined in: packages/kit/src/collections/ex-map.ts:33

Removes a key and its associated value from the map

#### Parameters

##### key

`Key`

The key to remove

#### Returns

`boolean`

true if the key existed and was removed, false otherwise

#### Mutates

***

### deleteKeys()

> **deleteKeys**(`keys`): `this`

Defined in: packages/kit/src/collections/ex-map.ts:172

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

### entries()

> **entries**(): `IterableIterator`\<\[`Key`, `Value`\]\>

Defined in: packages/kit/src/collections/ex-map.ts:248

#### Returns

`IterableIterator`\<\[`Key`, `Value`\]\>

Iterator for [key, value] pairs

***

### filter()

#### Call Signature

> **filter**\<`R`\>(`by`): `ExMap`\<`Key`, `R`\>

Defined in: packages/kit/src/collections/ex-map.ts:210

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

> **filter**(`by`): `ExMap`\<`Key`, `Value`\>

Defined in: packages/kit/src/collections/ex-map.ts:211

Creates a new map containing only entries that satisfy the predicate

##### Parameters

###### by

(`v`, `k`) => `boolean`

Predicate function to test entries

##### Returns

`ExMap`\<`Key`, `Value`\>

New map with filtered entries

***

### forEach()

> **forEach**(`by`): `void`

Defined in: packages/kit/src/collections/ex-map.ts:42

Executes a callback for each key-value pair in the map

#### Parameters

##### by

(`value`, `key`, `self`) => `void`

Function to execute for each element

#### Returns

`void`

***

### freeze()

> **freeze**(): `Omit`\<`ExMap`\<`Key`, `Value`\>, `"set"` \| `"delete"` \| `"clear"` \| `"deleteKeys"` \| `"update"` \| `"overwrite"` \| `"getOrCreate"`\>

Defined in: packages/kit/src/collections/ex-map.ts:220

Creates an immutable version of this map

#### Returns

`Omit`\<`ExMap`\<`Key`, `Value`\>, `"set"` \| `"delete"` \| `"clear"` \| `"deleteKeys"` \| `"update"` \| `"overwrite"` \| `"getOrCreate"`\>

Frozen map that throws on mutation attempts

***

### get()

> **get**(`key`): `undefined` \| `Value`

Defined in: packages/kit/src/collections/ex-map.ts:53

Retrieves the value associated with a key

#### Parameters

##### key

`Key`

The key to look up

#### Returns

`undefined` \| `Value`

The value associated with the key, or undefined if the key doesn't exist

***

### getOrCreate()

> **getOrCreate**(`key`, `create`, `onExisted?`): `Value`

Defined in: packages/kit/src/collections/ex-map.ts:118

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

### has()

> **has**(`key`): `boolean`

Defined in: packages/kit/src/collections/ex-map.ts:62

Checks if a key exists in the map

#### Parameters

##### key

`Key`

The key to check for

#### Returns

`boolean`

true if the key exists, false otherwise

***

### keys()

> **keys**(): `IterableIterator`\<`Key`\>

Defined in: packages/kit/src/collections/ex-map.ts:253

#### Returns

`IterableIterator`\<`Key`\>

Iterator for map keys

***

### mapEntries()

> **mapEntries**\<`NewValue`\>(`by`): `ExMap`\<`Key`, `NewValue`\>

Defined in: packages/kit/src/collections/ex-map.ts:144

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

### set()

> **set**(`key`, `value`): `this`

Defined in: packages/kit/src/collections/ex-map.ts:73

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

***

### toArray()

> **toArray**\<`NewValue`\>(`by`): `NewValue`[]

Defined in: packages/kit/src/collections/ex-map.ts:153

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

### update()

> **update**(`key`, `value`): `this`

Defined in: packages/kit/src/collections/ex-map.ts:135

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

### values()

> **values**(): `IterableIterator`\<`Value`\>

Defined in: packages/kit/src/collections/ex-map.ts:258

#### Returns

`IterableIterator`\<`Value`\>

Iterator for map values

***

### valuesToArray()

> **valuesToArray**\<`NewValue`\>(`by`): `NewValue`[]

Defined in: packages/kit/src/collections/ex-map.ts:162

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

### groupedBy()

> `static` **groupedBy**\<`Value`, `Key`\>(`input`, `by`): `ExMap`\<`Key`, `Value`[]\>

Defined in: packages/kit/src/collections/ex-map.ts:91

Groups array elements by a key function, collecting values with the same key into arrays

#### Type Parameters

##### Value

`Value`

##### Key

`Key`

#### Parameters

##### input

readonly `Value`[]

Array to group

##### by

(`value`) => `Key`

Function to derive the key for each element

#### Returns

`ExMap`\<`Key`, `Value`[]\>

Map of keys to arrays of values

***

### mappedBy()

> `static` **mappedBy**\<`Value`, `Key`\>(`input`, `by`): `ExMap`\<`Key`, `Value`\>

Defined in: packages/kit/src/collections/ex-map.ts:104

Creates a map from an array using a key function

#### Type Parameters

##### Value

`Value`

##### Key

`Key`

#### Parameters

##### input

readonly `Value`[]

Array to convert to a map

##### by

(`value`) => `Key`

Function to derive the key for each element

#### Returns

`ExMap`\<`Key`, `Value`\>

Map of derived keys to original values


<a name="classesexsetmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / ExSet

# Class: ExSet\<Value\>

Defined in: packages/kit/src/collections/ex-set.ts:12

Extended Set implementation with additional set operations and utility methods.
Provides both standard Set interface and additional functionality for set operations.

## Type Parameters

### Value

`Value`

The type of elements in the set

## Constructors

### Constructor

> **new ExSet**\<`Value`\>(`values?`): `ExSet`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:19

Creates a new ExSet instance

#### Parameters

##### values?

`Iterable`\<`Value`, `any`, `any`\>

Optional iterable of initial values

#### Returns

`ExSet`\<`Value`\>

## Accessors

### \[toStringTag\]

#### Get Signature

> **get** **\[toStringTag\]**(): `string`

Defined in: packages/kit/src/collections/ex-set.ts:229

##### Returns

`string`

The string tag for this object

***

### readonly

#### Get Signature

> **get** **readonly**(): `ReadonlyExSet`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:181

##### Returns

`ReadonlyExSet`\<`Value`\>

A read-only view of this set

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: packages/kit/src/collections/ex-set.ts:75

##### Returns

`number`

The number of elements in the set

## Methods

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:224

#### Returns

`IterableIterator`\<`Value`\>

An iterator over the values in the set

***

### add()

> **add**(`value`): `this`

Defined in: packages/kit/src/collections/ex-set.ts:31

Adds a value to the set

#### Parameters

##### value

`Value`

The value to add

#### Returns

`this`

This set instance for chaining

#### Mutates

***

### and()

> **and**(`other`): `ExSet`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:144

Creates a new set containing elements that exist in both this set and another iterable (intersection)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to intersect with

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing common elements

***

### backup()

> **backup**(`fn?`): () => `void`

Defined in: packages/kit/src/collections/ex-set.ts:213

Creates a backup of the current set state and returns a restore function

#### Parameters

##### fn?

(`o`) => `ExSet`\<`Value`\>

Optional transformation function to apply to the backup

#### Returns

Function that when called restores the set to its backed up state

> (): `void`

##### Returns

`void`

#### Mutates

***

### clear()

> **clear**(): `void`

Defined in: packages/kit/src/collections/ex-set.ts:40

Removes all elements from the set

#### Returns

`void`

#### Mutates

***

### delete()

> **delete**(`value`): `boolean`

Defined in: packages/kit/src/collections/ex-set.ts:50

Removes a value from the set

#### Parameters

##### value

`Value`

The value to remove

#### Returns

`boolean`

true if the value was in the set, false otherwise

#### Mutates

***

### diff()

> **diff**(`other`): `ExSet`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:135

Creates a new set containing elements from this set that are not in another iterable (difference)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to compare against

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing elements unique to this set

***

### entries()

> **entries**(): `IterableIterator`\<\[`Value`, `Value`\]\>

Defined in: packages/kit/src/collections/ex-set.ts:234

#### Returns

`IterableIterator`\<\[`Value`, `Value`\]\>

An iterator over [value, value] pairs for Set compatibility

***

### forEach()

> **forEach**(`by`): `void`

Defined in: packages/kit/src/collections/ex-set.ts:59

Executes a callback for each value in the set

#### Parameters

##### by

(`value`, `value2`, `self`) => `void`

Function to execute for each element

#### Returns

`void`

***

### freeze()

> **freeze**(): `ReadonlyExSet`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:189

Creates an immutable version of this set by freezing it and preventing mutations

#### Returns

`ReadonlyExSet`\<`Value`\>

A read-only version of this set that throws on mutation attempts

***

### has()

> **has**(`key`): `boolean`

Defined in: packages/kit/src/collections/ex-set.ts:70

Checks if a value exists in the set

#### Parameters

##### key

`Value`

The value to check for

#### Returns

`boolean`

true if the value exists, false otherwise

***

### intersects()

> **intersects**(`other`): `boolean`

Defined in: packages/kit/src/collections/ex-set.ts:86

Checks if this set has any elements in common with another iterable

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to check against

#### Returns

`boolean`

true if there are common elements, false otherwise

***

### join()

> **join**(`other`): `this`

Defined in: packages/kit/src/collections/ex-set.ts:101

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

### keys()

> **keys**(): `IterableIterator`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:239

#### Returns

`IterableIterator`\<`Value`\>

An iterator over the values in the set

***

### or()

> **or**(`other`): `ExSet`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:126

Creates a new set containing elements from both this set and another iterable (union)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to union with

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing all unique elements

***

### subtract()

> **subtract**(`other`): `this`

Defined in: packages/kit/src/collections/ex-set.ts:114

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

### toArray()

> **toArray**\<`NewValue`\>(`by`): `NewValue`[]

Defined in: packages/kit/src/collections/ex-set.ts:176

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

### values()

> **values**(): `IterableIterator`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:244

#### Returns

`IterableIterator`\<`Value`\>

An iterator over the values in the set

***

### xor()

> **xor**(`other`): `ExSet`\<`Value`\>

Defined in: packages/kit/src/collections/ex-set.ts:159

Creates a new set containing elements that exist in either this set or another iterable, but not both (symmetric difference)

#### Parameters

##### other

`Iterable`\<`Value`\>

Iterable to compare against

#### Returns

`ExSet`\<`Value`\>

A new ExSet containing elements that are in either set but not both


<a name="classesmanualsortingalphabetmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / ManualSortingAlphabet

# Class: ManualSortingAlphabet

Defined in: packages/kit/src/core/manual-sorting.ts:169

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

> **new ManualSortingAlphabet**(`options`): `ManualSortingAlphabet`

Defined in: packages/kit/src/core/manual-sorting.ts:228

Creates a new ManualSortingAlphabet instance.

#### Parameters

##### options

`ManualSortingAlphabetOptions`

Configuration options

#### Returns

`ManualSortingAlphabet`

## Properties

### presets

> `static` **presets**: `object`

Defined in: packages/kit/src/core/manual-sorting.ts:179

Common presets for ManualSortingAlphabet alphabet ranges.

These presets define fromCodePoint and toCodePoint values
that are optimized for different use cases.

All presets are compatible with UTF-8 PostgreSQL `text` columns
under standard collation (C or C.UTF-8), preserving binary sort order.

#### asciiFriendly

> `readonly` **asciiFriendly**: `object`

Human-readable preset using digits and Latin letters.
Includes '0'-'9', 'A'-'Z', 'a'-'z'

- ✅ ASCII-safe
- ✅ JS sort: works with < and localeCompare
- ✅ PostgreSQL binary order safe
- ⚠️ Can require frequent rebalance in long-term dense lists

##### asciiFriendly.fromCodePoint

> `readonly` **fromCodePoint**: `48` = `0x30`

##### asciiFriendly.toCodePoint

> `readonly` **toCodePoint**: `122` = `0x7a`

#### invisibleUnicode

> `readonly` **invisibleUnicode**: `object`

Invisible and rarely-used symbols from Unicode ranges.
Optimized for maximum spacing in systems where keys are not user-facing.

- ✅ High entropy, compact keys
- ✅ UTF-8 and PostgreSQL-safe
- ❌ Not human-friendly

##### invisibleUnicode.fromCodePoint

> `readonly` **fromCodePoint**: `8192` = `0x2000`

##### invisibleUnicode.toCodePoint

> `readonly` **toCodePoint**: `12287` = `0x2fff`

#### wideCJK

> `readonly` **wideCJK**: `object`

Very wide range using CJK unified ideographs.
Suitable for systems needing extreme insert density with minimal key growth.

- ✅ 6000+ chars of spacing
- ✅ JS/PostgreSQL binary order works
- ⚠️ Keys may appear unreadable or wide in editors

##### wideCJK.fromCodePoint

> `readonly` **fromCodePoint**: `12288` = `0x3000`

##### wideCJK.toCodePoint

> `readonly` **toCodePoint**: `40959` = `0x9fff`

## Methods

### extractUpdatedKeys()

> `protected` **extractUpdatedKeys**(`sorted`, `inserted`, `keyIndex`, `balancing`): `object`

Defined in: packages/kit/src/core/manual-sorting.ts:258

Applies updated values to original keys from the rebalance result.

#### Parameters

##### sorted

readonly `string`[]

##### inserted

readonly `string`[]

##### keyIndex

`number`

##### balancing

`Balancer`

#### Returns

`object`

##### newKeys

> **newKeys**: `string`[]

##### updated

> **updated**: `Map`\<`string`, `string`\>

***

### getFirstKey()

> **getFirstKey**(): `string`

Defined in: packages/kit/src/core/manual-sorting.ts:502

Returns the initial key to use if the list is empty.

#### Returns

`string`

***

### getMiddleCodePoint()

> `protected` **getMiddleCodePoint**(`a`, `b`): `number`

Defined in: packages/kit/src/core/manual-sorting.ts:248

Returns a middle code point between two valid code points.
Throws if either point is outside the alphabet range.

#### Parameters

##### a

`number`

##### b

`number`

#### Returns

`number`

***

### getMiddleKey()

> `protected` **getMiddleKey**(`a`, `b`): `string`

Defined in: packages/kit/src/core/manual-sorting.ts:288

Returns a string key that is lexicographically between a and b.
Uses code points to compute midpoint recursively.

#### Parameters

##### a

`string`

##### b

`string`

#### Returns

`string`

***

### getNewKeys()

> **getNewKeys**(`count`): `string`[]

Defined in: packages/kit/src/core/manual-sorting.ts:514

Generates a new array of unique keys based on the specified count.

#### Parameters

##### count

`number`

The number of keys to generate.

#### Returns

`string`[]

An array containing the newly generated keys.

***

### insertAfterIndex()

> `protected` **insertAfterIndex**(`sorted`, `keyIndex`, `count`): `object`

Defined in: packages/kit/src/core/manual-sorting.ts:421

Inserts one or more keys immediately after the given key in a sorted array.
If necessary space isn't available, automatically rebalances neighboring keys.

#### Parameters

##### sorted

readonly `string`[]

Array of existing keys in sorted order

##### keyIndex

`number`

Reference index after which to insert

##### count

`number`

Number of new keys to insert

#### Returns

`object`

Result containing new keys and any updated existing keys

##### newKeys

> **newKeys**: `string`[]

##### updated

> **updated**: `Map`\<`string`, `string`\>

#### Throws

If the reference key is not found in the sorted array

***

### insertBeforeIndex()

> `protected` **insertBeforeIndex**(`sorted`, `index`, `count`): `object`

Defined in: packages/kit/src/core/manual-sorting.ts:466

Inserts a specified number of items before a given index in a sorted array.

#### Parameters

##### sorted

readonly `string`[]

The sorted array of string elements where the insertion will occur.

##### index

`number`

The index before which the new items will be inserted.

##### count

`number`

The number of items to be inserted.

#### Returns

`object`

Returns an object containing two properties:
        - `newKeys`: An array of the newly inserted keys.
        - `updated`: A map of the updated keys and their new keys.

##### newKeys

> **newKeys**: `string`[]

##### updated

> **updated**: `Map`\<`string`, `string`\>

***

### isValidCodePoint()

> `protected` **isValidCodePoint**(`code`): `boolean`

Defined in: packages/kit/src/core/manual-sorting.ts:240

Checks if a code point is within the configured alphabet range.

#### Parameters

##### code

`number`

#### Returns

`boolean`

***

### tryInsertAtEnd()

> `protected` **tryInsertAtEnd**(`sorted`): `string`

Defined in: packages/kit/src/core/manual-sorting.ts:379

Appends a key at the end by extending the last key or adding a character.

#### Parameters

##### sorted

`string`[]

#### Returns

`string`

#### Throws

***

### tryInsertManyAtEnd()

> `protected` **tryInsertManyAtEnd**(`count`, `sorted`): `string`[]

Defined in: packages/kit/src/core/manual-sorting.ts:350

Inserts keys after the last element by growing length.

#### Parameters

##### count

`number`

##### sorted

`string`[]

#### Returns

`string`[]

***

### tryInsertManyAtStart()

> `protected` **tryInsertManyAtStart**(`count`, `sorted`): `string`[]

Defined in: packages/kit/src/core/manual-sorting.ts:362

Inserts keys before the first element by creating room.

#### Parameters

##### count

`number`

##### sorted

`string`[]

#### Returns

`string`[]


<a name="classesnumberconvertermd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / NumberConverter

# Class: NumberConverter

Defined in: packages/kit/src/numbers/number-converter.ts:74

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

> **new NumberConverter**(`parts`): `NumberConverter`

Defined in: packages/kit/src/numbers/number-converter.ts:81

Creates a number converter with the specified digit mappings.

#### Parameters

##### parts

readonly (`string` \| readonly \[`string`, `string`\])[]

Array of single characters or [start,end] character ranges defining the digits

#### Returns

`NumberConverter`

#### Throws

If there are duplicate characters in the mappings

## Properties

### fixedWidthRandomGenerator()

> `readonly` **fixedWidthRandomGenerator**: (`length`) => () => `string`

Defined in: packages/kit/src/numbers/number-converter.ts:209

Creates a function that generates fixed-width random numbers efficiently.

#### Parameters

##### length

`number`

Desired string length, must be positive integer

#### Returns

Function that generates random strings of specified length

> (): `string`

##### Returns

`string`

#### Throws

If length is not a positive integer

***

### from10()

> `readonly` **from10**: (`input`) => `string`

Defined in: packages/kit/src/numbers/number-converter.ts:133

Converts a decimal number to this number system.

#### Parameters

##### input

Decimal number as string, number or bigint

`string` | `number` | `bigint`

#### Returns

`string`

String representation in this number system

#### Throws

If input is floating point, negative, or base is 10

***

### mask()

> `readonly` **mask**: (`length`) => `string`

Defined in: packages/kit/src/numbers/number-converter.ts:181

Creates a string of specified length using the maximum digit value.

#### Parameters

##### length

`number`

Desired string length

#### Returns

`string`

String of specified length filled with max digit

***

### parts

> `readonly` **parts**: readonly (`string` \| readonly \[`string`, `string`\])[]

Defined in: packages/kit/src/numbers/number-converter.ts:81

Array of single characters or [start,end] character ranges defining the digits

***

### random()

> `readonly` **random**: (`length`) => `string`

Defined in: packages/kit/src/numbers/number-converter.ts:193

Generates a random number string of specified length.

#### Parameters

##### length

`number`

Desired string length, must be positive integer

#### Returns

`string`

Random string of specified length using system digits

#### Throws

If length is not a positive integer

***

### to10()

> `readonly` **to10**: (`n`) => `bigint`

Defined in: packages/kit/src/numbers/number-converter.ts:162

Converts a number from this system to decimal.

#### Parameters

##### n

`string`

String representation in this number system

#### Returns

`bigint`

Decimal value as bigint

#### Throws

If string contains invalid digits

## Accessors

### base

#### Get Signature

> **get** **base**(): `bigint`

Defined in: packages/kit/src/numbers/number-converter.ts:84

Gets the numeric base of this number system (total count of unique digits)

##### Returns

`bigint`

***

### byChar

#### Get Signature

> **get** **byChar**(): `Map`\<`number`, `bigint`\>

Defined in: packages/kit/src/numbers/number-converter.ts:117

Maps each digit's character code to its numeric value in the system

##### Returns

`Map`\<`number`, `bigint`\>

***

### digits

#### Get Signature

> **get** **digits**(): readonly `number`[]

Defined in: packages/kit/src/numbers/number-converter.ts:89

Gets array of character codes for all digits in order

##### Returns

readonly `number`[]

***

### maxSafeDigits

#### Get Signature

> **get** **maxSafeDigits**(): `number`

Defined in: packages/kit/src/numbers/number-converter.ts:122

Gets maximum number of digits that can safely represent MAX_SAFE_INTEGER

##### Returns

`number`

***

### powers

#### Get Signature

> **get** **powers**(): `Powers`

Defined in: packages/kit/src/numbers/number-converter.ts:112

Gets the Powers calculator for this number system's base

##### Returns

`Powers`


<a name="classesprogrammingerrormd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / ProgrammingError

# Class: ProgrammingError

Defined in: packages/kit/src/core/manual-sorting.ts:25

Indicates a programming error in the sorting algorithm implementation

## Extends

- `Error`

## Properties

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:162

The `Error.stackTraceLimit` property specifies the number of stack frames
collected by a stack trace (whether generated by `new Error().stack` or
`Error.captureStackTrace(obj)`).

The default value is `10` but may be set to any valid JavaScript number. Changes
will affect any stack trace captured _after_ the value has been changed.

If set to a non-number value, or set to a negative number, stack traces will
not capture any frames.

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/@types/node/globals.d.ts:146

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

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

***

### prepareStackTrace()

> `static` **prepareStackTrace**(`err`, `stackTraces`): `any`

Defined in: node\_modules/@types/node/globals.d.ts:150

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`


<a name="functionsanglebetweenmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / angleBetween

# Function: angleBetween()

> **angleBetween**(`x1`, `y1`, `x2`, `y2`): `number`

Defined in: packages/kit/src/core/geometry.ts:42

Угол (в радианах) от точки (x1,y1) до (x2,y2).

## Parameters

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

## Returns

`number`


<a name="functionsboundingboxmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / boundingBox

# Function: boundingBox()

> **boundingBox**(`points`): `object`

Defined in: packages/kit/src/core/geometry.ts:204

Получить ограничивающий прямоугольник (bounding box) для набора точек.

## Parameters

### points

\[`number`, `number`\][]

## Returns

`object`

### height

> **height**: `number`

### width

> **width**: `number`

### x

> **x**: `number`

### y

> **y**: `number`


<a name="functionscircleareamd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / circleArea

# Function: circleArea()

> **circleArea**(`r`): `number`

Defined in: packages/kit/src/core/geometry.ts:98

Площадь круга.

## Parameters

### r

`number`

## Returns

`number`


<a name="functionscirclecircumferencemd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / circleCircumference

# Function: circleCircumference()

> **circleCircumference**(`r`): `number`

Defined in: packages/kit/src/core/geometry.ts:103

Длина окружности (периметр круга).

## Parameters

### r

`number`

## Returns

`number`


<a name="functionsdegtoradmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / degToRad

# Function: degToRad()

> **degToRad**(`deg`): `number`

Defined in: packages/kit/src/core/geometry.ts:177

Приведение градусы ↔ радианы.

## Parameters

### deg

`number`

## Returns

`number`


<a name="functionsdisposersmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / disposers

# Function: disposers()

> **disposers**(`initializers`, `onInit?`): () => `void`

Defined in: packages/kit/src/core/disposers.ts:43

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

> (): `void`

### Returns

`void`

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


<a name="functionsdistancemd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / distance

# Function: distance()

> **distance**(`x1`, `y1`, `x2`, `y2`): `number`

Defined in: packages/kit/src/core/geometry.ts:16

Расстояние между двумя точками.

## Parameters

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

## Returns

`number`


<a name="functionsdistanceto00md"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / distanceTo00

# Function: distanceTo00()

> **distanceTo00**(`x`, `y`): `number`

Defined in: packages/kit/src/core/geometry.ts:6

Расстояние до (0;0)

## Parameters

### x

`number`

### y

`number`

## Returns

`number`


<a name="functionslerpmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / lerp

# Function: lerp()

> **lerp**(`a`, `b`, `t`): `number`

Defined in: packages/kit/src/core/geometry.ts:29

Линейная интерполяция между a и b на t ∈ [0,1].

## Parameters

### a

`number`

### b

`number`

### t

`number`

## Returns

`number`


<a name="functionslerppointmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / lerpPoint

# Function: lerpPoint()

> **lerpPoint**(`x1`, `y1`, `x2`, `y2`, `t`): \[`number`, `number`\]

Defined in: packages/kit/src/core/geometry.ts:34

Интерполяция между двумя точками.

## Parameters

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

### t

`number`

## Returns

\[`number`, `number`\]


<a name="functionsmidpointmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / midpoint

# Function: midpoint()

> **midpoint**(`x1`, `y1`, `x2`, `y2`): \[`number`, `number`\]

Defined in: packages/kit/src/core/geometry.ts:21

Средняя точка (midpoint) между двумя точками.

## Parameters

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

## Returns

\[`number`, `number`\]


<a name="functionspointincirclemd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / pointInCircle

# Function: pointInCircle()

> **pointInCircle**(`px`, `py`, `cx`, `cy`, `r`): `boolean`

Defined in: packages/kit/src/core/geometry.ts:117

Входит ли точка (px,py) в круг (cx,cy,r)?

## Parameters

### px

`number`

### py

`number`

### cx

`number`

### cy

`number`

### r

`number`

## Returns

`boolean`


<a name="functionspointinrectmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / pointInRect

# Function: pointInRect()

> **pointInRect**(`px`, `py`, `rx`, `ry`, `width`, `height`): `boolean`

Defined in: packages/kit/src/core/geometry.ts:76

Проверка, лежит ли точка (px,py) внутри прямоугольника.

## Parameters

### px

`number`

### py

`number`

### rx

`number`

### ry

`number`

### width

`number`

### height

`number`

## Returns

`boolean`


<a name="functionspointintrianglemd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / pointInTriangle

# Function: pointInTriangle()

> **pointInTriangle**(`px`, `py`, `x1`, `y1`, `x2`, `y2`, `x3`, `y3`): `boolean`

Defined in: packages/kit/src/core/geometry.ts:150

Проверка, лежит ли точка (px,py) внутри треугольника
(метод барицентрических координат).

## Parameters

### px

`number`

### py

`number`

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

### x3

`number`

### y3

`number`

## Returns

`boolean`


<a name="functionspointoncirclemd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / pointOnCircle

# Function: pointOnCircle()

> **pointOnCircle**(`cx`, `cy`, `r`, `angleRad`): \[`number`, `number`\]

Defined in: packages/kit/src/core/geometry.ts:109

Координаты точки на окружности:
angleRad — угол в радианах от точки (cx,cy).

## Parameters

### cx

`number`

### cy

`number`

### r

`number`

### angleRad

`number`

## Returns

\[`number`, `number`\]


<a name="functionsrectareamd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / rectArea

# Function: rectArea()

> **rectArea**(`width`, `height`): `number`

Defined in: packages/kit/src/core/geometry.ts:60

Площадь прямоугольника.

## Parameters

### width

`number`

### height

`number`

## Returns

`number`


<a name="functionsrectcentermd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / rectCenter

# Function: rectCenter()

> **rectCenter**(`x`, `y`, `width`, `height`): \[`number`, `number`\]

Defined in: packages/kit/src/core/geometry.ts:70

Центр прямоугольника { x, y, width, height }.

## Parameters

### x

`number`

### y

`number`

### width

`number`

### height

`number`

## Returns

\[`number`, `number`\]


<a name="functionsrectperimetermd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / rectPerimeter

# Function: rectPerimeter()

> **rectPerimeter**(`width`, `height`): `number`

Defined in: packages/kit/src/core/geometry.ts:65

Периметр прямоугольника.

## Parameters

### width

`number`

### height

`number`

## Returns

`number`


<a name="functionsrectsintersectmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / rectsIntersect

# Function: rectsIntersect()

> **rectsIntersect**(`r1x`, `r1y`, `w1`, `h1`, `r2x`, `r2y`, `w2`, `h2`): `boolean`

Defined in: packages/kit/src/core/geometry.ts:82

Пересекаются ли два прямоугольника?

## Parameters

### r1x

`number`

### r1y

`number`

### w1

`number`

### h1

`number`

### r2x

`number`

### r2y

`number`

### w2

`number`

### h2

`number`

## Returns

`boolean`


<a name="functionsrotatepointmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / rotatePoint

# Function: rotatePoint()

> **rotatePoint**(`x`, `y`, `cx`, `cy`, `rad`): \[`number`, `number`\]

Defined in: packages/kit/src/core/geometry.ts:47

Поворот точки (x,y) вокруг центра (cx,cy) на угол rad.

## Parameters

### x

`number`

### y

`number`

### cx

`number`

### cy

`number`

### rad

`number`

## Returns

\[`number`, `number`\]


<a name="functionsrotaterectmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / rotateRect

# Function: rotateRect()

> **rotateRect**(`x`, `y`, `width`, `height`, `cx`, `cy`, `angleRad`): \[`number`, `number`\][]

Defined in: packages/kit/src/core/geometry.ts:183

Поворот прямоугольника на угол: возвращает новые координаты его вершин.

## Parameters

### x

`number`

### y

`number`

### width

`number`

### height

`number`

### cx

`number`

### cy

`number`

### angleRad

`number`

## Returns

\[`number`, `number`\][]


<a name="functionstriangleareamd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / triangleArea

# Function: triangleArea()

> **triangleArea**(`x1`, `y1`, `x2`, `y2`, `x3`, `y3`): `number`

Defined in: packages/kit/src/core/geometry.ts:125

Площадь треугольника по координатам вершин (формула Штейнера).

## Parameters

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

### x3

`number`

### y3

`number`

## Returns

`number`


<a name="functionstrianglecentroidmd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / triangleCentroid

# Function: triangleCentroid()

> **triangleCentroid**(`x1`, `y1`, `x2`, `y2`, `x3`, `y3`): \[`number`, `number`\]

Defined in: packages/kit/src/core/geometry.ts:137

Центроид (точка пересечения медиан) треугольника.

## Parameters

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

### x3

`number`

### y3

`number`

## Returns

\[`number`, `number`\]


<a name="functionstriangleperimetermd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / trianglePerimeter

# Function: trianglePerimeter()

> **trianglePerimeter**(`x1`, `y1`, `x2`, `y2`, `x3`, `y3`): `number`

Defined in: packages/kit/src/core/geometry.ts:131

Периметр треугольника по длинам сторон.

## Parameters

### x1

`number`

### y1

`number`

### x2

`number`

### y2

`number`

### x3

`number`

### y3

`number`

## Returns

`number`


<a name="globalsmd"></a>

[**@gurban/kit**](#readmemd)

***

# @gurban/kit

## Classes

- [ExMap](#classesexmapmd)
- [ExSet](#classesexsetmd)
- [ManualSortingAlphabet](#classesmanualsortingalphabetmd)
- [NumberConverter](#classesnumberconvertermd)
- [ProgrammingError](#classesprogrammingerrormd)

## Variables

- [distance00to11](#variablesdistance00to11md)
- [NumberBase](#variablesnumberbasemd)

## Functions

- [angleBetween](#functionsanglebetweenmd)
- [boundingBox](#functionsboundingboxmd)
- [circleArea](#functionscircleareamd)
- [circleCircumference](#functionscirclecircumferencemd)
- [degToRad](#functionsdegtoradmd)
- [disposers](#functionsdisposersmd)
- [distance](#functionsdistancemd)
- [distanceTo00](#functionsdistanceto00md)
- [lerp](#functionslerpmd)
- [lerpPoint](#functionslerppointmd)
- [midpoint](#functionsmidpointmd)
- [pointInCircle](#functionspointincirclemd)
- [pointInRect](#functionspointinrectmd)
- [pointInTriangle](#functionspointintrianglemd)
- [pointOnCircle](#functionspointoncirclemd)
- [rectArea](#functionsrectareamd)
- [rectCenter](#functionsrectcentermd)
- [rectPerimeter](#functionsrectperimetermd)
- [rectsIntersect](#functionsrectsintersectmd)
- [rotatePoint](#functionsrotatepointmd)
- [rotateRect](#functionsrotaterectmd)
- [triangleArea](#functionstriangleareamd)
- [triangleCentroid](#functionstrianglecentroidmd)
- [trianglePerimeter](#functionstriangleperimetermd)


<a name="variablesnumberbasemd"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / NumberBase

# Variable: NumberBase

> `const` **NumberBase**: `object`

Defined in: packages/kit/src/numbers/number-base.ts:58

Provides number base conversion utilities with predefined bases and their corresponding digit sets.
Each base N is accessible through two equivalent ways:
- Array-like access: NumberBase[N]
- Property access: NumberBase.bN

Both access methods return the same NumberConverter instance for the given base.

## Type declaration

### 10

> **10**: [`NumberConverter`](#classesnumberconvertermd)

### 16

> **16**: [`NumberConverter`](#classesnumberconvertermd)

### 2

> **2**: [`NumberConverter`](#classesnumberconvertermd)

### 3

> **3**: [`NumberConverter`](#classesnumberconvertermd)

### 4

> **4**: [`NumberConverter`](#classesnumberconvertermd)

### 6

> **6**: [`NumberConverter`](#classesnumberconvertermd)

### 62

> **62**: [`NumberConverter`](#classesnumberconvertermd)

### 70

> **70**: [`NumberConverter`](#classesnumberconvertermd)

### 8

> **8**: [`NumberConverter`](#classesnumberconvertermd)

### 88

> **88**: [`NumberConverter`](#classesnumberconvertermd)

### b10

> **b10**: [`NumberConverter`](#classesnumberconvertermd)

### b16

> **b16**: [`NumberConverter`](#classesnumberconvertermd)

### b2

> **b2**: [`NumberConverter`](#classesnumberconvertermd)

### b3

> **b3**: [`NumberConverter`](#classesnumberconvertermd)

### b4

> **b4**: [`NumberConverter`](#classesnumberconvertermd)

### b6

> **b6**: [`NumberConverter`](#classesnumberconvertermd)

### b62

> **b62**: [`NumberConverter`](#classesnumberconvertermd)

### b70

> **b70**: [`NumberConverter`](#classesnumberconvertermd)

### b8

> **b8**: [`NumberConverter`](#classesnumberconvertermd)

### b88

> **b88**: [`NumberConverter`](#classesnumberconvertermd)

### splitDigits10()

> **splitDigits10**: (`n`) => `bigint`[]

#### Parameters

##### n

`bigint`

#### Returns

`bigint`[]

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


<a name="variablesdistance00to11md"></a>

[**@gurban/kit**](#readmemd)

***

[@gurban/kit](#globalsmd) / distance00to11

# Variable: distance00to11

> `const` **distance00to11**: `number`

Defined in: packages/kit/src/core/geometry.ts:11

Расстояние между (0;0) и (1;1) в тех же единицах (~1.4142).
