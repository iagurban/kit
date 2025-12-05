# @grbn/kit

## Classes

- [KeySetPaginator](Class.KeySetPaginator.md)
- [KeysetPaginatorBuilder](Class.KeysetPaginatorBuilder.md)
- [ModelBlockAttribute](Class.ModelBlockAttribute.md)
- [ModelFieldMeta](Class.ModelFieldMeta.md)
- [ModelMeta](Class.ModelMeta.md)

## Functions

- [getModelsMetadataFromString](Function.getModelsMetadataFromString.md)


# Class: KeySetPaginator\<T, WhereUniqueInput, WhereInput, Select\>

Defined in: [keyset-paginator.ts:128](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/keyset-paginator.ts#L128)

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

Defined in: [keyset-paginator.ts:12](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/keyset-paginator.ts#L12)

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

Defined in: [keyset-paginator.ts:48](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/keyset-paginator.ts#L48)

Generates a "select" clause object representing the fields required for cursor-based pagination
based on the ordering configuration of the current instance.

#### Returns `object`

An object containing the structured fields to be selected for the query.

***

### whereClause() {#whereclause}

```ts
whereClause(cursor): object;
```

Defined in: [keyset-paginator.ts:80](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/keyset-paginator.ts#L80)

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


# Class: ModelBlockAttribute

Defined in: [models-metadata.ts:18](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L18)

Represents a model block attribute wrapper that allows handling
attributes of a block within a model construct.


# Class: ModelFieldMeta

Defined in: [models-metadata.ts:25](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L25)

Represents metadata about a model field, including its name and associated attributes.

## Accessors

### attributes {#attributes}

#### Get Signature

```ts
get attributes(): FieldAttribute[];
```

Defined in: [models-metadata.ts:44](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L44)

Retrieves the attributes of the current object. If no attributes are available, returns an empty array.
Decorated with

##### Once

to ensure that the getter is executed only once and caches the result thereafter.

##### Returns `FieldAttribute`[]

The list of attributes for the current object, or an empty array if no attributes are defined.

***

### hasIdAttribute {#hasidattribute}

#### Get Signature

```ts
get hasIdAttribute(): boolean;
```

Defined in: [models-metadata.ts:54](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L54)

Checks if the attributes contain an `id` attribute.

##### Returns `boolean`

True if the attributes include an `id` attribute, otherwise false.

***

### name {#name}

#### Get Signature

```ts
get name(): string;
```

Defined in: [models-metadata.ts:33](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L33)

Retrieves the name value from the raw object property.

##### Returns `string`

The name value.


# Class: ModelMeta

Defined in: [models-metadata.ts:63](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L63)

Represents metadata for a model declaration which provides information about fields,
block attributes, and identification attributes in the model schema.

## Accessors

### allIdFields {#allidfields}

#### Get Signature

```ts
get allIdFields(): ModelFieldMeta[];
```

Defined in: [models-metadata.ts:143](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L143)

Retrieves all fields or attributes marked as ID within the current object.
Combines ID fields from `idBlockAttribute` and fields containing the `hasIdAttribute` property.

##### Returns

[`ModelFieldMeta`](Class.ModelFieldMeta.md)[]

A unique array of all fields or attributes identified as ID within the object.

***

### blockAttributes {#blockattributes}

#### Get Signature

```ts
get blockAttributes(): ModelBlockAttribute[];
```

Defined in: [models-metadata.ts:96](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L96)

Retrieves a list of block attributes from the raw members.
Filters the members to include only those identified as block attributes
and maps them to instances of ModelBlockAttribute.

##### Returns

[`ModelBlockAttribute`](Class.ModelBlockAttribute.md)[]

An array of ModelBlockAttribute instances extracted from the raw members.

***

### fields {#fields}

#### Get Signature

```ts
get fields(): ModelFieldMeta[];
```

Defined in: [models-metadata.ts:74](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L74)

Retrieves the list of field metadata for the model.
The method filters the raw member data to identify valid field metadata
and maps them into ModelFieldMeta instances.

##### Returns

[`ModelFieldMeta`](Class.ModelFieldMeta.md)[]

An array of ModelFieldMeta instances representing the fields.

***

### fieldsByName {#fieldsbyname}

#### Get Signature

```ts
get fieldsByName(): ExMap<string, ModelFieldMeta>;
```

Defined in: [models-metadata.ts:84](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L84)

Retrieves a mapping of fields by their names.

##### Returns `ExMap`\<`string`, [`ModelFieldMeta`](Class.ModelFieldMeta.md)\>

A map where each key is a field name and its corresponding value is the field object.

***

### idBlockAttribute {#idblockattribute}

#### Get Signature

```ts
get idBlockAttribute(): ModelFieldMeta[] | null;
```

Defined in: [models-metadata.ts:112](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L112)

Retrieves the block attribute related to the `id` for the corresponding schema.

The method identifies the block attribute by checking the path value and ensures that the
format is valid. It validates the structure of the attribute and extracts the relevant fields,
ensuring they are declared and accessible within the context.

##### Returns

[`ModelFieldMeta`](Class.ModelFieldMeta.md)[] \| `null`

An array of fields corresponding to the `id` block attribute if
                             present and correctly formatted; otherwise, null. Throws an error
                             if the schema format is unsupported or fields are not declared.


# Function: getModelsMetadataFromString()

```ts
function getModelsMetadataFromString(s): object;
```

Defined in: [models-metadata.ts:158](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/prisma/models-metadata.ts#L158)

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
