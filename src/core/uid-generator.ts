import { NumberBase } from './numbers/number-base';

const {
  b62: {
    /**
     * Convert a non-negative integer from base-10 to Base62 string.
     * Examples:
     * - from10(0) => '0'
     * - from10(61) => 'Z'
     * - from10(62) => '10'
     * - from10(14776335) => 'ZZZZ' // 62^4 - 1
     */
    from10,
    /**
     * Convert a Base62 string to a base-10 bigint.
     * Examples:
     * - to10('0') => 0n
     * - to10('Z') => 61n
     * - to10('10') => 62n
     * - to10('ZZZZ')=> 14776335n // 62^4 - 1
     */
    to10,
    /**
     * Create a Base62 string of a given length filled with the max digit ('Z').
     * Examples:
     * - mask(1) => 'Z'
     * - mask(4) => 'ZZZZ'
     * Use-case in this file: to10(mask(4)) = 62^4 - 1 to define a modulo range.
     */
    mask,
    /**
     * Build a fast generator that returns fixed-width random Base62 strings.
     * Example:
     * ```ts
     * const rnd8 = fixedWidthRandomGenerator(8);
     * rnd8(); // e.g. '0aZ9Bc1Q' (always 8 chars, characters in [0-9a-zA-Z])
     * ```
     */
    fixedWidthRandomGenerator,
  },
} = NumberBase;

const uidRandomGen = fixedWidthRandomGenerator(16);
const shortUidRandomGen = fixedWidthRandomGenerator(12);

const dateTail = (length: number) => {
  const uidDateMask = Number(to10(mask(length)));
  return () => from10(Date.now() % uidDateMask).padStart(length, '0');
};

const uidDateTail = dateTail(4);
const shortUidDateTail = dateTail(2);

/**
 * Generates a compact, UUIDv4-like identifier using Base62 characters — shorter and prettier.
 *
 * Purpose: serves the same role as UUIDv4 for primary keys and client-side IDs (e.g., mobx-keystone),
 * but is more compact and URL-safe. Not intended for security or secrecy — uniqueness only.
 *
 * Format: `[timePart][randomPart]` → total length: 20 characters
 * - timePart: 4 Base62 digits representing `Date.now() % (62^4)`, left-padded with '0' (range: 0000..ZZZZ).
 *   It wraps roughly every 4.10 hours (14,776,336 ms). Within a cycle, lexicographic order follows time.
 * - randomPart: 16 Base62 chars produced by a crypto-secure generator (`fixedWidthRandomGenerator(16)`).
 *
 * Total state space per millisecond bucket (random part): `62^16 ≈ 4.767e28` (~95 bits).
 * This yields an astronomically low collision probability even for very large same-millisecond bursts.
 *
 * Comparison with UUIDv4:
 * - UUIDv4 carries ~122 random bits and is 36 chars (with hyphens). This ID is 20 chars with ~95 random bits
 *   per millisecond bucket — far shorter while still providing extremely strong practical uniqueness for IDs.
 *
 * Examples (illustrative; actual values vary at runtime):
 * - If `Date.now() % (62^4) === 62` → `from10(62) = '10'` → timePart = `'0010'`.
 * - A full ID could look like: `'0010' + 'a9Z0Bc12QwErTy3U'` → `'0010a9Z0Bc12QwErTy3U'`.
 *
 * @returns {string} A compact, URL-safe Base62 identifier suitable for non-security primary keys.
 */
export const uidGenerator = (): string => `${uidDateTail()}${uidRandomGen()}`;

/**
 * Generates an even shorter Base62 identifier — handy for UI/local IDs.
 *
 * Format: `[timePart][randomPart]` → total length: 14 characters
 * - timePart: 2 Base62 digits representing `Date.now() % (62^2)` (00..ZZ), wraps about every 3.8 seconds.
 * - randomPart: 12 Base62 characters from a crypto-secure generator (`fixedWidthRandomGenerator(12)`).
 *
 * Intended use: very compact, human-friendly IDs where collisions are still extremely unlikely in practice
 * (thanks to the 12-char random tail) and global time ordering is not required. Not for secrets.
 *
 * Example:
 * - Suppose `Date.now() % (62^2) === 62` → timePart = `'10'` (already 2 chars).
 * - Full ID example: `'10' + 'a9Z0Bc12QwEr'` → `'10a9Z0Bc12QwEr'` (14 chars total).
 */
export const shortUidGenerator = (): string => `${shortUidDateTail()}${shortUidRandomGen()}`;
