# Function: getModelsMetadataFromString()

```ts
function getModelsMetadataFromString(s): object;
```

Defined in: [models-metadata.ts:158](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/prisma/models-metadata.ts#L158)

Parses a Prisma schema string and extracts metadata information for all model declarations.

This function processes the provided Prisma schema string, identifies model declarations,
and creates a mapping of model names to their corresponding metadata.

## Parameters

### s

`string`

A string representation of the Prisma schema.

## Returns

`object`

An object containing a mapping of model names
to their respective metadata as `ModelMeta` objects.

### models

```ts
models: ExMap<string, ModelMeta>;
```
