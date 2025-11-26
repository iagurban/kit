# Class: KeySetPaginator\<T, WhereUniqueInput, WhereInput, Select\>

Defined in: [keyset-paginator.ts:128](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/prisma/keyset-paginator.ts#L128)

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
