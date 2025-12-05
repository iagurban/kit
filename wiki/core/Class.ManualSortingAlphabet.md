# Class: ManualSortingAlphabet

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:153](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L153)

Manages lexicographic keys for manually sorted lists, enabling dynamic insertions between items.

This class generates unique string keys that maintain lexicographic ordering, allowing for:
- Inserting new items between existing ones
- Handling dense insertions through automatic rebalancing
- Managing a configurable alphabet range for key generation

## Example

```typescript
const alphabet = new ManualSortingAlphabet({ converter: NumberBase.b62 }); // A-Z, a-z, 0-9
const firstKey = alphabet.getFirstKey(); // Returns middle character
const result = alphabet.insertAfter(['B', 'D'], 'B', 2); // Insert 2 keys after 'B'

// Basic usage - inserting between existing keys
const alphabet = new ManualSortingAlphabet({ converter: NumberBase.b62 });
const { inserted } = alphabet.insertAfter(['B', 'D'], 'B', 1);
// inserted might contain ['C']

// Handling rebalancing
const { inserted, updated } = alphabet.insertAfter(['B', 'C'], 'B', 2);
// updated might contain new values for 'C' to make room

// Custom window extension strategy
const alphabet = new ManualSortingAlphabet({
  converter: NumberBase.b62,
  extendWindow: (b) => ({ left: 2, right: 2 })
});
```

## Constructors

### Constructor

```ts
new ManualSortingAlphabet(options): ManualSortingAlphabet;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:201](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L201)

Creates a new ManualSortingAlphabet instance.

#### Parameters

##### options

`ManualSortingAlphabetOptions`

Configuration options

#### Returns

`ManualSortingAlphabet`

## Properties

### options {#options}

```ts
readonly options: ManualSortingAlphabetOptions;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:201](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L201)

Configuration options

***

### presets {#presets}

```ts
static presets: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:163](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L163)

Common presets for ManualSortingAlphabet alphabet ranges.

These presets define fromCodePoint and toCodePoint values
that are optimized for different use cases.

All presets are compatible with UTF-8 PostgreSQL `text` columns
under standard collation (C or C.UTF-8), preserving binary sort order.

#### asciiFriendly

```ts
readonly asciiFriendly: NumberConverter = NumberBase.b62;
```

Human-readable preset using digits and Latin letters.
Includes '0'-'9', 'A'-'Z', 'a'-'z'

- ✅ ASCII-safe
- ✅ JS sort: works with < and localeCompare
- ✅ PostgreSQL binary order safe
- ⚠️ Can require frequent rebalance in long-term dense lists

#### invisibleUnicode

```ts
readonly invisibleUnicode: NumberConverter;
```

Invisible and rarely-used symbols from Unicode ranges.
Optimized for maximum spacing in systems where keys are not user-facing.

- ✅ High entropy, compact keys
- ✅ UTF-8 and PostgreSQL-safe
- ❌ Not human-friendly

#### wideCJK

```ts
readonly wideCJK: NumberConverter;
```

Very wide range using CJK unified ideographs.
Suitable for systems needing extreme insert density with minimal key growth.

- ✅ 6000+ chars of spacing
- ✅ JS/PostgreSQL binary order works
- ⚠️ Keys may appear unreadable or wide in editors

## Methods

### extractUpdatedKeys() {#extractupdatedkeys}

```ts
protected extractUpdatedKeys(
   sorted, 
   inserted, 
   keyIndex, 
   __namedParameters): Changes;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:238](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L238)

Applies updated values to original keys from the rebalance result.

#### Parameters

##### sorted

readonly `string`[]

##### inserted

readonly `string`[]

##### keyIndex

`number`

##### \_\_namedParameters

###### leftRebalanced

`number`

###### rightRebalanced

`number`

#### Returns

`Changes`

***

### getFirstKey() {#getfirstkey}

```ts
getFirstKey(): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:519](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L519)

Returns the initial key to use if the list is empty.

#### Returns

`string`

***

### getMiddleCodePoint() {#getmiddlecodepoint}

```ts
protected getMiddleCodePoint(a, b): number | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:217](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L217)

Returns a middle code point between two valid code points.
The first code point can be undefined (supposed value === 0).
Can return undefined if no point can be calculated (when a=undefined and b=digits[0]).

Throws if either point is outside the alphabet range.

#### Parameters

##### a

`number` | `undefined`

##### b

`number`

#### Returns

`number` \| `undefined`

***

### getMiddleKey() {#getmiddlekey}

```ts
protected getMiddleKey(a, b): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:266](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L266)

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

### getNewKeys() {#getnewkeys}

```ts
getNewKeys(count): string[];
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:530](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L530)

Generates a new array of unique keys based on the specified count.

#### Parameters

##### count

`number`

The number of keys to generate.

#### Returns

`string`[]

An array containing the newly generated keys.

***

### insertAfterIndex() {#insertafterindex}

```ts
protected insertAfterIndex(
   sorted, 
   keyIndex, 
   count): Changes;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:429](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L429)

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

`Changes`

Result containing new keys and any updated existing keys

#### Throws

If the reference key is not found in the sorted array

***

### insertBeforeIndex() {#insertbeforeindex}

```ts
protected insertBeforeIndex(
   sorted, 
   index, 
   count): Changes;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:470](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L470)

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

`Changes`

Returns an object containing two properties:
        - `inserted`: An array of the newly inserted keys.
        - `updated`: A map of the updated keys and their new keys.

***

### isValidCodePoint() {#isvalidcodepoint}

```ts
protected isValidCodePoint(code): boolean;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:206](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L206)

Checks if a code point is within the configured alphabet range.

#### Parameters

##### code

`number`

#### Returns

`boolean`

***

### tryInsertAtEnd() {#tryinsertatend}

```ts
protected tryInsertAtEnd(sorted): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:390](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L390)

Appends a key at the end by extending the last key or adding a character.

#### Parameters

##### sorted

`string`[]

#### Returns

`string`

#### Throws

***

### tryInsertManyAtEnd() {#tryinsertmanyatend}

```ts
protected tryInsertManyAtEnd(count, sorted): string[];
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:361](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L361)

Inserts keys after the last element by growing length.

#### Parameters

##### count

`number`

##### sorted

`string`[]

#### Returns

`string`[]

***

### tryInsertManyAtStart() {#tryinsertmanyatstart}

```ts
protected tryInsertManyAtStart(count, sorted): string[];
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:373](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/manual-sorting.ts#L373)

Inserts keys before the first element by creating room.

#### Parameters

##### count

`number`

##### sorted

`string`[]

#### Returns

`string`[]
