# Class: ServerTimestampPreciseInterceptor

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts:9](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts#L9)

Warning: this interceptor ignores results of operation and returns only "12345:12345" string in any case

## Extends

- [`ServerTimestampInterceptorBase`](Class.ServerTimestampInterceptorBase.md)\<`string`, `string`\>

## Methods

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:89](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L89)

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
prepare(t1): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts:10](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts#L10)

Prepares intermediate data structure by combining request entry timestamp with response data.
Called immediately after receiving response from route handler.

#### Parameters

##### t1

`number`

Timestamp when request entered NestJS pipeline (milliseconds since epoch)

#### Returns

`string`

Combined data structure for further processing

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
update(o): string;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts:14](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/nest/interceptors/server-timestamp/server-timestamp-precise.interceptor.ts#L14)

Updates intermediate data with exit timestamp just before sending response.
Called at the last possible moment before response is sent to client.

#### Parameters

##### o

`string`

Intermediate data structure from prepare step

#### Returns

`string`

Final response data with timing information

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
