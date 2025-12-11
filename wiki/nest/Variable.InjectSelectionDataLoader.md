# Variable: InjectSelectionDataLoader()

```ts
const InjectSelectionDataLoader: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/inject-selection-data-loader.decorator.ts:13](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/data-loaders-fabric/inject-selection-data-loader.decorator.ts#L13)

This decorator injects the correct, selection-specific DataLoader.
It *must* be used with @UseInterceptors(SelectionDataLoaderCacheInterceptor).

## Parameters

### dataOrPipes

...(
  \| `string`
  \| `void`
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`
