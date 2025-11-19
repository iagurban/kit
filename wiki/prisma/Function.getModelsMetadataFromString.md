# Function: getModelsMetadataFromString()

```ts
function getModelsMetadataFromString(s): object;
```

Defined in: [models-metadata.ts:158](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/prisma/models-metadata.ts#L158)

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
