# Variable: InjectSelectionDataLoader()

```ts
const InjectSelectionDataLoader: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/data-loaders-fabric/inject-selection-data-loader.decorator.ts:13](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/nest/data-loaders-fabric/inject-selection-data-loader.decorator.ts#L13)

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
