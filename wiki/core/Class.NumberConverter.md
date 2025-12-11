# Class: NumberConverter

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:82](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L82)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:89](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L89)

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

### fixedWidthRandomGenerator() {#fixedwidthrandomgenerator}

```ts
readonly fixedWidthRandomGenerator: (length) => () => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:235](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L235)

Creates a function that generates fixed-width random numbers efficiently.

#### Parameters

##### length

`number`

Desired string length, must be positive integer

#### Returns

Function that generates random strings of specified length

```ts
(): string;
```

##### Returns

`string`

#### Throws

If length is not a positive integer

***

### from10() {#from10}

```ts
readonly from10: (input) => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:159](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L159)

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

### mask() {#mask}

```ts
readonly mask: (length) => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:207](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L207)

Creates a string of specified length using the maximum digit value.

#### Parameters

##### length

`number`

Desired string length

#### Returns

`string`

String of specified length filled with max digit

***

### parts {#parts}

```ts
readonly parts: readonly (string | readonly [string, string])[];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:89](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L89)

Array of single characters or [start,end] character ranges defining the digits

***

### random() {#random}

```ts
readonly random: (length) => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:219](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L219)

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

### to10() {#to10}

```ts
readonly to10: (n) => bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:188](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L188)

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

### base {#base}

#### Get Signature

```ts
get base(): bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:92](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L92)

Gets the numeric base of this number system (total count of unique digits)

##### Returns

`bigint`

***

### byChar {#bychar}

#### Get Signature

```ts
get byChar(): Map<number, bigint>;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:138](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L138)

Maps each digit's character code to its numeric value in the system

##### Returns

`Map`\<`number`, `bigint`\>

***

### digits {#digits}

#### Get Signature

```ts
get digits(): number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:98](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L98)

Gets array of character codes for all digits in order

##### Returns

`number`[]

***

### maxSafeExponent {#maxsafeexponent}

#### Get Signature

```ts
get maxSafeExponent(): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:148](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L148)

Gets maximum number of digits that can safely represent MAX_SAFE_INTEGER (always >= 2)

##### Returns

`number`

***

### powers {#powers}

#### Get Signature

```ts
get powers(): Powers;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:132](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-converter.ts#L132)

Gets the Powers calculator for this number system's base

##### Returns

[`Powers`](Class.Powers.md)
