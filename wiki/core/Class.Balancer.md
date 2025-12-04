# Class: Balancer

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:19](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/manual-sorting.ts#L19)

Represents a balancing window around a specific index in a sorted array.
Used internally by ManualSortingAlphabet to progressively include neighbors for rebalancing.

**Side effect**: Mutates `actualSorted` and `actualIndex` when rebalance() is called.

## Methods

### getNextWindow() {#getnextwindow}

```ts
getNextWindow(): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:52](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/manual-sorting.ts#L52)

Calculates the next window size based on the extension strategy.
Throws if window cannot grow further or growth is invalid.

#### Returns

`object`

##### leftRebalanced

```ts
leftRebalanced: number;
```

##### rightRebalanced

```ts
rightRebalanced: number;
```

***

### rebalance() {#rebalance}

```ts
rebalance(): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:81](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/manual-sorting.ts#L81)

Expands the balancing window and removes affected items from actualSorted.

#### Returns

`void`
