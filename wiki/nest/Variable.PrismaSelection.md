# Variable: PrismaSelection()

```ts
const PrismaSelection: (...dataOrPipes) => ParameterDecorator;
```

Defined in: [IdeaProjects/kit/kit/src/nest/decorators/prisma-selection.decorator.ts:80](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/nest/decorators/prisma-selection.decorator.ts#L80)

A decorator that extracts the Prisma selection object from a GraphQL execution context.

## Parameters

### dataOrPipes

...(
  \| `BasicSelectionArgs`\<`Record`\<`never`, `never`\>\>
  \| `PipeTransform`\<`any`, `any`\>
  \| `Type`\<`PipeTransform`\<`any`, `any`\>\>)[]

## Returns

`ParameterDecorator`
