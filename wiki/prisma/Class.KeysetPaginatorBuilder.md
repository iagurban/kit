# Class: KeysetPaginatorBuilder\<T\>

Defined in: [keyset-paginator.ts:120](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/prisma/keyset-paginator.ts#L120)

Class representing a builder for generating keyset pagination queries.
This provides methods to construct the necessary SQL-like clauses for
cursor-based pagination, based on the provided entity schema and ordering configuration.

## Type Parameters

### T

`T`

The type of the paginated items.

## Methods

### cursorSelectClause() {#cursorselectclause}

```ts
cursorSelectClause(): object;
```

Defined in: [keyset-paginator.ts:156](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/prisma/keyset-paginator.ts#L156)

Generates a "select" clause object representing the fields required for cursor-based pagination
based on the ordering configuration of the current instance.

#### Returns

`object`

An object containing the structured fields to be selected for the query.

***

### whereClause() {#whereclause}

```ts
whereClause(cursor): object;
```

Defined in: [keyset-paginator.ts:188](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/prisma/keyset-paginator.ts#L188)

Constructs and returns a structured "where" clause object based on the provided cursor and predefined orders.

#### Parameters

##### cursor

`T`

The cursor object used to generate comparison values for the "where" clause.

#### Returns

`object`

A structured object representing the "where" clause containing logical operators and conditions.

##### OR

```ts
OR: object[] = ands;
```
