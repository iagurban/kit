# Function: createContextualLogger()

```ts
function createContextualLogger(
   logger, 
   name, 
   payload?): IBaseLogger;
```

Defined in: [IdeaProjects/kit/kit/src/core/contextual-logger.ts:11](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/contextual-logger.ts#L11)

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
