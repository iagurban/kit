# Function: uidGenerator()

```ts
function uidGenerator(): string;
```

Defined in: [IdeaProjects/kit/kit/src/core/uid-generator.ts:78](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/uid-generator.ts#L78)

Generates a compact, UUIDv4-like identifier using Base62 characters — shorter and prettier.

Purpose: serves the same role as UUIDv4 for primary keys and client-side IDs (e.g., mobx-keystone),
but is more compact and URL-safe. Not intended for security or secrecy — uniqueness only.

Format: `[timePart][randomPart]` → total length: 20 characters
- timePart: 4 Base62 digits representing `Date.now() % (62^4)`, left-padded with '0' (range: 0000..ZZZZ).
  It wraps roughly every 4.10 hours (14,776,336 ms). Within a cycle, lexicographic order follows time.
- randomPart: 16 Base62 chars produced by a crypto-secure generator (`fixedWidthRandomGenerator(16)`).

Total state space per millisecond bucket (random part): `62^16 ≈ 4.767e28` (~95 bits).
This yields an astronomically low collision probability even for very large same-millisecond bursts.

Comparison with UUIDv4:
- UUIDv4 carries ~122 random bits and is 36 chars (with hyphens). This ID is 20 chars with ~95 random bits
  per millisecond bucket — far shorter while still providing extremely strong practical uniqueness for IDs.

Examples (illustrative; actual values vary at runtime):
- If `Date.now() % (62^4) === 62` → `from10(62) = '10'` → timePart = `'0010'`.
- A full ID could look like: `'0010' + 'a9Z0Bc12QwErTy3U'` → `'0010a9Z0Bc12QwErTy3U'`.

## Returns

`string`

A compact, URL-safe Base62 identifier suitable for non-security primary keys.
