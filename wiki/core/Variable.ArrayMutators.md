# Variable: ArrayMutators

```ts
const ArrayMutators: object;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/array-utils.ts:70](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/array-utils.ts#L70)

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

Inserts a value into an array at a specified position.

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

The array to insert into.

##### value

`T`

The value to insert.

##### pos

`number`

The position to insert at.

##### mutate

`boolean` = `false`

Whether to mutate the original array.

#### Returns

`T`[]

A new array with the value inserted, or the mutated array.

### move() {#move}

```ts
move<T>(
   a, 
   from, 
   to, 
   mutate): T[];
```

Moves an element within an array from one position to another.

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

The array to move the element in.

##### from

`number`

The position of the element to move.

##### to

`number`

The position to move the element to.

##### mutate

`boolean` = `false`

Whether to mutate the original array.

#### Returns

`T`[]

A new array with the element moved, or the mutated array.

### remove() {#remove}

```ts
remove<T>(
   a, 
   from, 
   count, 
   mutate): T[];
```

Removes one or more elements from an array.

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

The array to remove elements from.

##### from

`number`

The position to start removing from.

##### count

`number` = `1`

The number of elements to remove.

##### mutate

`boolean` = `false`

Whether to mutate the original array.

#### Returns

`T`[]

A new array with the elements removed, or the mutated array.

### set() {#set}

```ts
set<T>(
   a, 
   value, 
   pos, 
   mutate): T[];
```

Sets the value of an element in an array at a specified position.

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`[]

The array to set the element in.

##### value

`T`

The value to set.

##### pos

`number`

The position of the element to set.

##### mutate

`boolean` = `false`

Whether to mutate the original array.

#### Returns

`T`[]

A new array with the element set, or the mutated array.
