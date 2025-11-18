# Function: makeMatchingTree()

```ts
function makeMatchingTree(samples): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/code-points-matching-tree.ts:22](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/utils/code-points-matching-tree.ts#L22)

Constructs a tree structure (matching tree) that maps a set of strings to
their respective Unicode code points for efficient prefix matching.

## Parameters

### samples

`Iterable`\<`string`\>

An iterable collection of strings to build the tree from.
Each string will be broken into its Unicode code points and stored in a structure
suitable for prefix matching.

## Returns

`object`

An object containing:
  - `tree`: The root of the constructed prefix-matching tree.
  - `match`: A function that takes an input string and a starting position
             and returns the longest matching substring found in the tree
             or `undefined` if no match exists.

### match()

```ts
match: (input, pos) => string | undefined;
```

#### Parameters

##### input

`string`

##### pos

`number`

#### Returns

`string` \| `undefined`

### tree

```ts
tree: CPsTree;
```
