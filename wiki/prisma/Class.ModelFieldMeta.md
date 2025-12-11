# Class: ModelFieldMeta

Defined in: [models-metadata.ts:25](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/prisma/models-metadata.ts#L25)

Represents metadata about a model field, including its name and associated attributes.

## Accessors

### attributes {#attributes}

#### Get Signature

```ts
get attributes(): FieldAttribute[];
```

Defined in: [models-metadata.ts:44](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/prisma/models-metadata.ts#L44)

Retrieves the attributes of the current object. If no attributes are available, returns an empty array.
Decorated with

##### Once

to ensure that the getter is executed only once and caches the result thereafter.

##### Returns

`FieldAttribute`[]

The list of attributes for the current object, or an empty array if no attributes are defined.

***

### hasIdAttribute {#hasidattribute}

#### Get Signature

```ts
get hasIdAttribute(): boolean;
```

Defined in: [models-metadata.ts:54](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/prisma/models-metadata.ts#L54)

Checks if the attributes contain an `id` attribute.

##### Returns

`boolean`

True if the attributes include an `id` attribute, otherwise false.

***

### name {#name}

#### Get Signature

```ts
get name(): string;
```

Defined in: [models-metadata.ts:33](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/prisma/models-metadata.ts#L33)

Retrieves the name value from the raw object property.

##### Returns

`string`

The name value.
