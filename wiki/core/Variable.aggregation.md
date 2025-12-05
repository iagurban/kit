# Variable: aggregation

```ts
const aggregation: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/aggregation.ts:61](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/numbers/aggregation.ts#L61)

Aggregation methods for statistical calculations.
This object provides various utility functions to calculate descriptive
statistics, such as measures of central tendency, dispersion, and distribution
characteristics for numerical data sets.

## Type Declaration

### avg() {#avg}

```ts
avg: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### count() {#count}

```ts
count: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### geoMean() {#geomean}

```ts
geoMean: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### harmMean() {#harmmean}

```ts
harmMean: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### max() {#max}

```ts
max: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### med() {#med}

```ts
med: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### min() {#min}

```ts
min: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### mode() {#mode}

```ts
mode: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### mul() {#mul}

```ts
mul: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### p90() {#p90}

```ts
p90: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### percentile() {#percentile}

```ts
percentile: (p) => (nn) => number;
```

#### Parameters

##### p

`number`

#### Returns

```ts
(nn): number;
```

##### Parameters

###### nn

readonly `number`[]

##### Returns

`number`

### range() {#range}

```ts
range: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### rms() {#rms}

```ts
rms: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### std() {#std}

```ts
std: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### sum() {#sum}

```ts
sum: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### sumOfSquares() {#sumofsquares}

```ts
sumOfSquares: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### trimmed10() {#trimmed10}

```ts
trimmed10: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### trimmedMean() {#trimmedmean}

```ts
trimmedMean: (trimPercent) => (nn) => number;
```

#### Parameters

##### trimPercent

`number`

#### Returns

```ts
(nn): number;
```

##### Parameters

###### nn

readonly `number`[]

##### Returns

`number`

### uniqueCount() {#uniquecount}

```ts
uniqueCount: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`

### variance() {#variance}

```ts
variance: (nn) => number;
```

#### Parameters

##### nn

readonly `number`[]

#### Returns

`number`
