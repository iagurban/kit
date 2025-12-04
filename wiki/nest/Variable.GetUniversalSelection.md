# Variable: GetUniversalSelection()

```ts
const GetUniversalSelection: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/universal-selection.decorator.ts:146](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/nest/decorators/universal-selection.decorator.ts#L146)

A decorator that extracts the universal selection object from a GraphQL execution context.

## Parameters

### dataOrPipes

...(
  \| [`UniversalSelectionArgs`](TypeAlias.UniversalSelectionArgs.md)
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`
