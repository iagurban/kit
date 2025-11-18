# Function: convertToRoman()

```ts
function convertToRoman(num): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/roman.ts:44](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/numbers/roman.ts#L44)

Converts a decimal number to its Roman numeral representation.
Uses standard Roman numeral notation including subtractive combinations (e.g., IV for 4, IX for 9).

## Parameters

### num

`number`

A positive integer to convert to Roman numerals

## Returns

`string`

The Roman numeral representation as a string

## Example

```typescript
convertToRoman(4)    // returns "IV"
convertToRoman(9)    // returns "IX"
convertToRoman(49)   // returns "XLIX"
convertToRoman(999)  // returns "CMXCIX"
convertToRoman(2024) // returns "MMXXIV"
```

## Remarks

- The function uses greedy algorithm to construct the Roman numeral
- Starts from the largest possible symbol and works down to smaller ones
- Optimized to skip unnecessary iterations using startIndex calculation
