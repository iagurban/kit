# Variable: stringConstants

```ts
const stringConstants: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/string-const.ts:40](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/string-const.ts#L40)

An object containing string constants used throughout the application.

Properties:
- `emptySymbol`: Represents a string constant for an empty symbol.
- `nbsp`: Represents a string constant for a non-breaking space.
- `jnsp`: Represents a string constant for a Japanese non-breaking space.

## Type Declaration

### emptySymbol {#emptysymbol}

```ts
emptySymbol: "∅";
```

A constant variable representing the symbol for an empty set.

This symbol is used to denote the concept of "nothing" or "no elements"
in various mathematical, programming, or symbolic contexts.

Value: '∅'

### jnsp {#jnsp}

```ts
jnsp: "⁠";
```

A constant variable `jnsp` representing the Unicode character 'WORD JOINER' (U+2060).
It is used to indicate a position where line breaks or spacing are not allowed.
This character is typically invisible and meant to enforce text formatting constraints.

### nbsp {#nbsp}

```ts
nbsp: " ";
```

Represents a non-breaking space character (Unicode: U+00A0).
This is a constant and immutable string, used to enforce space that prevents
line breaks at its position in text processing or rendering.
