# Class: KeySetPaginator\<T, WhereUniqueInput, WhereInput, Select\>

Defined in: [keyset-paginator.ts:128](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/prisma/keyset-paginator.ts#L128)

The `KeySetPaginator` class implements a mechanism for performing efficient
keyset pagination on a data set using a cursor-based approach.

This class is generic and can be used with any data type `T`.

## Type Parameters

### T

`T`

The type of the entity being paginated.

### WhereUniqueInput

`WhereUniqueInput`

The type of the input used to uniquely identify a record.

### WhereInput

`WhereInput`

The type of the input used for filtering a collection.

### Select

`Select`

The type of the input used for selecting specific fields.
