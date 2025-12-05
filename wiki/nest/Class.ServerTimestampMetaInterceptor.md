# Class: ServerTimestampMetaInterceptor

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts:31](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts#L31)

An interceptor that injects server-side request timestamps into the response body.

This interceptor extends `ServerTimestampInterceptorBase` to add a `__sync` object
to the JSON response. The original data from the route handler is merged at the
top level of the response body.

The `__sync` object contains:
- `t1`: The timestamp (in milliseconds since epoch) when the request entered the NestJS pipeline.
- `t2`: The timestamp (in milliseconds since epoch) just before the response is sent.

This is particularly useful for client-side applications that need to calculate the
server time offset or measure the exact request processing duration.

## Example

```ts
// If the route handler returns: { "message": "hello" }
// The final response body will be:
{
  "message": "hello",
  "__sync": {
    "t1": 1672531200000,
    "t2": 1672531200100
  }
}
```

## Extends

- [`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md)\<\{
  `__sync`: \{
     `t1`: `number`;
  \};
\}, \{
  `__sync`: \{
     `t1`: `number`;
     `t2`: `number`;
  \};
\}\>

## Methods

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:89](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L89)

Method to implement a custom interceptor.

#### Parameters

##### context

`ExecutionContext`

an `ExecutionContext` object providing methods to access the
route handler and class about to be invoked.

##### next

`CallHandler`

a reference to the `CallHandler`, which provides access to an
`Observable` representing the response stream from the route handler.

#### Returns

`Observable`\<`unknown`\>

#### Inherited from

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`intercept`](Class.ServerTimestampInterceptorBase.md#intercept)

***

### prepare() {#prepare}

```ts
prepare(t1, data): object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts:35](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts#L35)

Prepares intermediate data structure by combining request entry timestamp with response data.
Called immediately after receiving response from route handler.

#### Parameters

##### t1

`number`

Timestamp when request entered NestJS pipeline (milliseconds since epoch)

##### data

`Record`\<`string`, `string`\>

Response data from route handler

#### Returns

`object`

Combined data structure for further processing

##### \_\_sync

```ts
__sync: object;
```

###### \_\_sync.t1

```ts
t1: number;
```

#### Example

```typescript
// Example #1: Return object with data and entry timestamp
prepare(t1: number, data: Record<string, string>) {
  return { data, t1 };
}

// Example #2: Return string prefix with entry timestamp
prepare(t1: number) {
  return t1.toString() + ':'; // ignore data for precision
}

// Example #3: Return object with data and entry timestamp in addition meta
prepare(t1: number, data: Record<string, string>) {
  return { ...data, __timeMetadata: {t1} };
}
```

#### Overrides

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`prepare`](Class.ServerTimestampInterceptorBase.md#prepare)

***

### update() {#update}

```ts
update(o): object;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts:39](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/nest/interceptors/server-timestamp/server-timestamp-meta.interceptor.ts#L39)

Updates intermediate data with exit timestamp just before sending response.
Called at the last possible moment before response is sent to client.

#### Parameters

##### o

Intermediate data structure from prepare step

###### __sync

\{
  `t1`: `number`;
\}

###### __sync.t1

`number`

#### Returns

`object`

Final response data with timing information

##### \_\_sync

```ts
__sync: object;
```

###### \_\_sync.t1

```ts
t1: number;
```

###### \_\_sync.t2

```ts
t2: number;
```

#### Example

```typescript
// Example #1: Add exit timestamp to object
update(o: { data: any; t1: number }) {
  return { ...o, t2: Date.now() }; // result: {data, t1, t2}
}

// Example #2: Append exit timestamp to string
update(o: string) {
  return o + Date.now().toString(); // result: `${t1}:${t2}`
}

// Example #3: Add exit timestamp to object metadata
update(o: { data: any; t1: number }) {
  return { ...o, __timeMetadata: { ...o.__timeMetadata, t2: Date.now() }}; // result: {...data, __timeMetadata: {t1, t2}}
}
```

#### Overrides

[`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md).[`update`](Class.ServerTimestampInterceptorBase.md#update)
