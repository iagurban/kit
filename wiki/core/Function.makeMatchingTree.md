# Function: makeMatchingTree()

```ts
function makeMatchingTree(samples): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/code-points-matching-tree.ts:22](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/code-points-matching-tree.ts#L22)

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
