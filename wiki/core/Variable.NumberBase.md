# Variable: NumberBase

```ts
const NumberBase: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/number-base.ts:58](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/number-base.ts#L58)

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
