# Class: Powers

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:16](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/numbers/number-converter.ts#L16)

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

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:24](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/numbers/number-converter.ts#L24)

Creates a new Powers calculator.

#### Parameters

##### base

`bigint`

The base number to calculate powers of. Must be >= 2n.

##### initDigits

`number` = `20`

Optional. Number of initial powers to pre-calculate. Default is 20.

#### Returns

`Powers`

#### Throws

If base is less than 2n

## Properties

### base {#base}

```ts
readonly base: bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:25](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/numbers/number-converter.ts#L25)

The base number to calculate powers of. Must be >= 2n.

## Methods

### get() {#get}

```ts
get(pos): bigint;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-converter.ts:41](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/numbers/number-converter.ts#L41)

Gets the power of the base at the specified position.
Automatically calculates and caches any intermediate powers needed.

#### Parameters

##### pos

`number`

The power/exponent to calculate (0 returns 1n, 1 returns base, etc)

#### Returns

`bigint`

The calculated power as a bigint
