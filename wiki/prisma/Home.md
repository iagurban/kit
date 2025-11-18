# @grbn/kit

## Classes

- [KeySetPaginator](Class.KeySetPaginator.md)
- [KeysetPaginatorBuilder](Class.KeysetPaginatorBuilder.md)

## Functions

- [getModelsMetadataFromString](Function.getModelsMetadataFromString.md)


# Class: KeySetPaginator\<T, WhereUniqueInput, WhereInput, Select\>

Defined in: [keyset-paginator.ts:236](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/prisma/keyset-paginator.ts#L236)

The `KeySetPaginator` class implements a mechanism for performing efficient
keyset pagination on a data set using a cursor-based approach.

This class is generic and can be used with any data type `T`.

## Type Parameters

### T `T`

The type of the entity being paginated.

### WhereUniqueInput `WhereUniqueInput`

The type of the input used to uniquely identify a record.

### WhereInput `WhereInput`

The type of the input used for filtering a collection.

### Select `Select`

The type of the input used for selecting specific fields.


# Class: KeysetPaginatorBuilder\<T\>

Defined in: [keyset-paginator.ts:120](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/prisma/keyset-paginator.ts#L120)

Class representing a builder for generating keyset pagination queries.
This provides methods to construct the necessary SQL-like clauses for
cursor-based pagination, based on the provided entity schema and ordering configuration.

## Type Parameters

### T `T`

The type of the paginated items.

## Methods

### cursorSelectClause() {#cursorselectclause}

```ts
cursorSelectClause(): object;
```

Defined in: [keyset-paginator.ts:156](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/prisma/keyset-paginator.ts#L156)

Generates a "select" clause object representing the fields required for cursor-based pagination
based on the ordering configuration of the current instance.

#### Returns `object`

An object containing the structured fields to be selected for the query.

***

### whereClause() {#whereclause}

```ts
whereClause(cursor): object;
```

Defined in: [keyset-paginator.ts:188](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/prisma/keyset-paginator.ts#L188)

Constructs and returns a structured "where" clause object based on the provided cursor and predefined orders.

#### Parameters

##### cursor `T`

The cursor object used to generate comparison values for the "where" clause.

#### Returns `object`

A structured object representing the "where" clause containing logical operators and conditions.

##### OR

```ts
OR: object[] = ands;
```


# Function: getModelsMetadataFromString()

```ts
function getModelsMetadataFromString(s): object;
```

Defined in: [keyset-paginator.ts:95](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/prisma/keyset-paginator.ts#L95)

Parses a Prisma schema string and extracts metadata information for all model declarations.

This function processes the provided Prisma schema string, identifies model declarations,
and creates a mapping of model names to their corresponding metadata.

## Parameters

### s `string`

A string representation of the Prisma schema.

## Returns

`object`

An object containing a mapping of model names
to their respective metadata as `ModelMeta` objects.

### models

```ts
models: ExMap<string, ModelMeta>;
```
