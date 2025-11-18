/**
 * A constant representing the namespace URI for Scalable Vector Graphics (SVG).
 * This is used to create and manipulate SVG elements in the DOM.
 *
 * @constant {string}
 */
export const svgNS = 'http://www.w3.org/2000/svg' as const;

/**
 * A constant variable representing the symbol for an empty set.
 *
 * This symbol is used to denote the concept of "nothing" or "no elements"
 * in various mathematical, programming, or symbolic contexts.
 *
 * Value: '∅'
 */
export const emptySymbol = '∅' as const;

/**
 * Represents a non-breaking space character (Unicode: U+00A0).
 * This is a constant and immutable string, used to enforce space that prevents
 * line breaks at its position in text processing or rendering.
 */
export const nbsp = '\u00A0' as const;
/**
 * A constant variable `jnsp` representing the Unicode character 'WORD JOINER' (U+2060).
 * It is used to indicate a position where line breaks or spacing are not allowed.
 * This character is typically invisible and meant to enforce text formatting constraints.
 */
export const jnsp = '\u2060' as const;

/**
 * An object containing string constants used throughout the application.
 *
 * Properties:
 * - `emptySymbol`: Represents a string constant for an empty symbol.
 * - `nbsp`: Represents a string constant for a non-breaking space.
 * - `jnsp`: Represents a string constant for a Japanese non-breaking space.
 */
export const stringConstants = { emptySymbol, nbsp, jnsp };
