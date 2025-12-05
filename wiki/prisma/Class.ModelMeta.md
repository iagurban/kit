# Class: ModelMeta

Defined in: [models-metadata.ts:63](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/prisma/models-metadata.ts#L63)

Represents metadata for a model declaration which provides information about fields,
block attributes, and identification attributes in the model schema.

## Accessors

### allIdFields {#allidfields}

#### Get Signature

```ts
get allIdFields(): ModelFieldMeta[];
```

Defined in: [models-metadata.ts:143](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/prisma/models-metadata.ts#L143)

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

Defined in: [models-metadata.ts:96](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/prisma/models-metadata.ts#L96)

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

Defined in: [models-metadata.ts:74](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/prisma/models-metadata.ts#L74)

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

Defined in: [models-metadata.ts:84](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/prisma/models-metadata.ts#L84)

Retrieves a mapping of fields by their names.

##### Returns

`ExMap`\<`string`, [`ModelFieldMeta`](Class.ModelFieldMeta.md)\>

A map where each key is a field name and its corresponding value is the field object.

***

### idBlockAttribute {#idblockattribute}

#### Get Signature

```ts
get idBlockAttribute(): ModelFieldMeta[] | null;
```

Defined in: [models-metadata.ts:112](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/prisma/models-metadata.ts#L112)

Retrieves the block attribute related to the `id` for the corresponding schema.

The method identifies the block attribute by checking the path value and ensures that the
format is valid. It validates the structure of the attribute and extracts the relevant fields,
ensuring they are declared and accessible within the context.

##### Returns

[`ModelFieldMeta`](Class.ModelFieldMeta.md)[] \| `null`

An array of fields corresponding to the `id` block attribute if
                             present and correctly formatted; otherwise, null. Throws an error
                             if the schema format is unsupported or fields are not declared.
