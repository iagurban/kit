# Variable: ArrayMutators

```ts
const ArrayMutators: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/array-utils.ts:70](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/collections/array-utils.ts#L70)

A collection of utility functions for manipulating arrays. Each function allows optional mutation of the original array.

## Type Declaration

### insert() {#insert}

```ts
insert<T>(
   a, 
   value, 
   pos, 
   mutate): T[];
```

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

##### value

`T`

##### pos

`number`

##### mutate

`boolean` = `false`

#### Returns

`T`[]

### move() {#move}

```ts
move<T>(
   a, 
   from, 
   to, 
   mutate): T[];
```

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

##### from

`number`

##### to

`number`

##### mutate

`boolean` = `false`

#### Returns

`T`[]

### remove() {#remove}

```ts
remove<T>(
   a, 
   from, 
   count, 
   mutate): T[];
```

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

##### from

`number`

##### count

`number` = `1`

##### mutate

`boolean` = `false`

#### Returns

`T`[]

### set() {#set}

```ts
set<T>(
   a, 
   value, 
   pos, 
   mutate): T[];
```

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

##### value

`T`

##### pos

`number`

##### mutate

`boolean` = `false`

#### Returns

`T`[]
