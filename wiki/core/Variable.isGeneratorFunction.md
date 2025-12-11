# Variable: isGeneratorFunction()

```ts
const isGeneratorFunction: (value) => value is GeneratorFunction;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-generator-function.ts:9](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-generator-function.ts#L9)

Checker that determines whether a value is a generator function (function*).

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is GeneratorFunction`

True if the value is a generator function, otherwise false.
