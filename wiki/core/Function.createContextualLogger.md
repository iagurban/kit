# Function: createContextualLogger()

```ts
function createContextualLogger(
   logger, 
   name, 
   payload?): IBaseLogger;
```

Defined in: [IdeaProjects/kit/kit/src/core/interfaces/logger-interface.ts:47](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/interfaces/logger-interface.ts#L47)

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
