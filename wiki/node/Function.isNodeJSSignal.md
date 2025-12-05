# Function: isNodeJSSignal()

```ts
function isNodeJSSignal(value): value is number | Signals;
```

Defined in: [IdeaProjects/kit/kit/src/node/node-util.ts:12](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/node-util.ts#L12)

Type guard to check if a value is a valid NodeJS.Signals string.

## Parameters

### value

`unknown`

The value to check.

## Returns

value is number \| Signals

True if the value is a valid signal name, false otherwise.
