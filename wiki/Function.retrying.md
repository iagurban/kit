# Function: retrying()

```ts
function retrying<T>(shouldRetry, fn): Promise<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/async/retrying.ts:16](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/async/retrying.ts#L16)

Выполняет асинхронную функцию fn, повторяя ее в случае сбоя
в соответствии с логикой, определенной в shouldRetry.

## Type Parameters

### T

`T`

## Parameters

### shouldRetry

`ShouldRetryFn`

Функция, определяющая, нужно ли повторять попытку.

### fn

(`attempt`) => `Promise`\<`T`\>

Асинхронная функция для выполнения.

## Returns

`Promise`\<`T`\>
