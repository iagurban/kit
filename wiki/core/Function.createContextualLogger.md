# Function: createContextualLogger()

```ts
function createContextualLogger(
   logger, 
   name, 
   payload?): IBaseLogger;
```

Defined in: [IdeaProjects/kit/kit/src/core/contextual-logger.ts:11](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/contextual-logger.ts#L11)

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
