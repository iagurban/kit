# Interface: GqlSelectionDataLoaderContext\<T\>

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:37](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L37)

The main, "Ready to use" Context
This is the new base context for our entire application.

## Type Parameters

### T

`T`

## Properties

### \_\_selectionDataLoaderSelectionCache? {#__selectiondataloaderselectioncache}

```ts
optional __selectionDataLoaderSelectionCache: object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:49](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L49)

Internal, request-scoped cache for selections.
Key: Full query path (e.g., "q1.author")
Value: The pre-calculated selection object and its stringified key.

#### Index Signature

```ts
[fieldPath: string]: CachedSelection | undefined
```

***

### selectionDataLoaderProviders {#selectiondataloaderproviders}

```ts
selectionDataLoaderProviders: SelectionDataLoaderProviderMap<T>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/selection-data-loader.types.ts:42](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/selection-data-loader.types.ts#L42)

The top-level map holding all request-scoped providers,
keyed by entity name (e.g., "User").
