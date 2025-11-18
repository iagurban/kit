# Class: ManualSortingAlphabet

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:147](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L147)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:206](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L206)

Creates a new ManualSortingAlphabet instance.

#### Parameters

##### options

`ManualSortingAlphabetOptions`

Configuration options

#### Returns

`ManualSortingAlphabet`

## Properties

### presets {#presets}

```ts
static presets: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:157](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L157)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:236](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L236)

Applies updated values to original keys from the rebalance result.

#### Parameters

##### sorted

readonly `string`[]

##### inserted

readonly `string`[]

##### keyIndex

`number`

##### balancing

[`Balancer`](Class.Balancer.md)

#### Returns

`object`

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:480](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L480)

Returns the initial key to use if the list is empty.

#### Returns

`string`

***

### getMiddleCodePoint() {#getmiddlecodepoint}

```ts
protected getMiddleCodePoint(a, b): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:226](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L226)

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

### getMiddleKey() {#getmiddlekey}

```ts
protected getMiddleKey(a, b): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:266](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L266)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:492](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L492)

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
   count): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:399](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L399)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:444](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L444)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:218](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L218)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:357](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L357)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:328](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L328)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:340](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/manual-sorting.ts#L340)

Inserts keys before the first element by creating room.

#### Parameters

##### count

`number`

##### sorted

`string`[]

#### Returns

`string`[]
