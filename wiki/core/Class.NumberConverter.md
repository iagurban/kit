# Class: NumberConverter

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:76](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L76)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:83](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L83)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:211](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L211)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:135](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L135)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:183](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L183)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:83](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L83)

Array of single characters or [start,end] character ranges defining the digits

***

### random() {#random}

```ts
readonly random: (length) => string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:195](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L195)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:164](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L164)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:86](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L86)

Gets the numeric base of this number system (total count of unique digits)

##### Returns

`bigint`

***

### byChar {#bychar}

#### Get Signature

```ts
get byChar(): Map<number, bigint>;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:119](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L119)

Maps each digit's character code to its numeric value in the system

##### Returns

`Map`\<`number`, `bigint`\>

***

### digits {#digits}

#### Get Signature

```ts
get digits(): readonly number[];
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:91](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L91)

Gets array of character codes for all digits in order

##### Returns

readonly `number`[]

***

### maxSafeDigits {#maxsafedigits}

#### Get Signature

```ts
get maxSafeDigits(): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:124](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L124)

Gets maximum number of digits that can safely represent MAX_SAFE_INTEGER

##### Returns

`number`

***

### powers {#powers}

#### Get Signature

```ts
get powers(): Powers;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:114](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/numbers/number-converter.ts#L114)

Gets the Powers calculator for this number system's base

##### Returns

`Powers`
