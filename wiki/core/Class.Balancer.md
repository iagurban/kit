# Class: Balancer

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:16](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/manual-sorting.ts#L16)

Represents a balancing window around a specific index in a sorted array.
Used internally by ManualSortingAlphabet to progressively include neighbors for rebalancing.

**Side effect**: Mutates `actualSorted` and `actualIndex` when rebalance() is called.

## Methods

### getNextWindow() {#getnextwindow}

```ts
getNextWindow(): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:49](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/manual-sorting.ts#L49)

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

Defined in: [IdeaProjects/kit/kit/src/core/manual-sorting.ts:78](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/manual-sorting.ts#L78)

Expands the balancing window and removes affected items from actualSorted.

#### Returns

`void`
