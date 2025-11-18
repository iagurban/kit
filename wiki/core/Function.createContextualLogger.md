# Function: createContextualLogger()

```ts
function createContextualLogger(
   logger, 
   name, 
   payload?): IBaseLogger;
```

Defined in: [IdeaProjects/kit/kit/src/core/interfaces/logger-interface.ts:47](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/interfaces/logger-interface.ts#L47)

Creates a contextual logger by extending the base logger with additional context information.

## Parameters

### logger

[`ILogger`](Interface.ILogger.md)

The base logger instance to extend.

### name

`string`

The name of the context to associate with the logger.

### payload?

`LoggerContext`

Optional additional context information to include.

## Returns

[`IBaseLogger`](Interface.IBaseLogger.md)

A new logger instance with the provided contextual information.
