# Abstract Class: ServerTimestampInterceptorBase\<Intermediate, Result\>

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:33](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L33)

Base interceptor class for adding server-side timestamp information to request processing.
Tracks request timing by adding timestamps at entry and exit points of NestJS request pipeline.

Can be used to:
- Measure request processing time
- Add timing metadata to responses
- Server time offset detection on clients

## Implements

## Example

```typescript
class TimingInterceptor extends ServerTimestampInterceptorBase<
  { data: Record<string, string>; entryTime: number },
  { data: Record<string, string>; entryTime: number; exitTime: number }
> {
  prepare(t1: number, data: Record<string, string>) {
    return { data, entryTime: t1 };
  }

  update(o: { data: any; entryTime: number }) {
    return { ...o, exitTime: Date.now() };
  }
}
```

## Extended by

- [`ServerTimestampPreciseInterceptor`](Class.ServerTimestampPreciseInterceptor.md)

## Type Parameters

### Intermediate

`Intermediate`

Type for intermediate data structure between prepare and update steps

### Result

`Result`

Final type of the processed response

## Implements

- `NestInterceptor`

## Methods

### intercept() {#intercept}

```ts
intercept(context, next): Observable<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:89](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L89)

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

#### Implementation of

```ts
NestInterceptor.intercept
```

***

### prepare() {#prepare}

```ts
abstract prepare(t1, data): Intermediate;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:60](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L60)

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

`Intermediate`

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

***

### update() {#update}

```ts
abstract update(o): Result;
```

Defined in: [IdeaProjects/kit/kit/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts:87](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/nest/interceptors/server-timestamp/server-timestamp-interceptor-base.ts#L87)

Updates intermediate data with exit timestamp just before sending response.
Called at the last possible moment before response is sent to client.

#### Parameters

##### o

`Intermediate`

Intermediate data structure from prepare step

#### Returns

`Result`

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
