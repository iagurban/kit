# Function: isNodeJSSignal()

```ts
function isNodeJSSignal(value): value is number | Signals;
```

Defined in: [IdeaProjects/kit/kit/src/core/node-util.ts:10](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/node-util.ts#L10)

Type guard to check if a value is a valid NodeJS.Signals string.

## Parameters

### value

`unknown`

The value to check.

## Returns

value is number \| Signals

True if the value is a valid signal name, false otherwise.
