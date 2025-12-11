# Class: GqlJwtAuthGuardBase

Defined in: [IdeaProjects/kit/kit/src/nest/guards/gql-jwt-auth-guard-base.ts:8](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/guards/gql-jwt-auth-guard-base.ts#L8)

A JWT authentication guard for GraphQL requests.

## Extends

- `IAuthGuard`

## Properties

### name {#name}

```ts
readonly static name: string;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es2015.core.d.ts:97

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

```ts
AuthGuard('jwt').name
```

## Methods

### canActivate() {#canactivate}

```ts
canActivate(context): boolean | Promise<boolean> | Observable<boolean>;
```

Defined in: IdeaProjects/kit/kit/.yarn/\_\_virtual\_\_/@nestjs-common-virtual-c83844d05c/4/.yarn/berry/cache/@nestjs-common-npm-11.1.9-c5d2997654-10c0.zip/node\_modules/@nestjs/common/interfaces/features/can-activate.interface.d.ts:21

#### Parameters

##### context

`ExecutionContext`

Current execution context. Provides access to details about
the current request pipeline.

#### Returns

`boolean` \| `Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

Value indicating whether or not the current request is allowed to
proceed.

#### Inherited from

```ts
AuthGuard('jwt').canActivate
```

***

### getRequest() {#getrequest}

```ts
getRequest(context): any;
```

Defined in: [IdeaProjects/kit/kit/src/nest/guards/gql-jwt-auth-guard-base.ts:14](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/nest/guards/gql-jwt-auth-guard-base.ts#L14)

Gets the request object from the execution context.

#### Parameters

##### context

`ExecutionContext`

The execution context.

#### Returns

`any`

The request object.

#### Overrides

```ts
AuthGuard('jwt').getRequest
```

***

### \[hasInstance\]() {#hasinstance}

```ts
static hasInstance: boolean;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

##### value

`any`

#### Returns

`boolean`

#### Inherited from

```ts
AuthGuard('jwt').[hasInstance]
```

***

### apply() {#apply}

```ts
static apply(
   this, 
   thisArg, 
   argArray?): any;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the this object.

##### argArray?

`any`

A set of arguments to be passed to the function.

#### Returns

`any`

#### Inherited from

```ts
AuthGuard('jwt').apply
```

***

### bind() {#bind}

```ts
static bind(
   this, 
   thisArg, ...
   argArray): any;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

##### this

`Function`

##### thisArg

`any`

An object to which the this keyword can refer inside the new function.

##### argArray

...`any`[]

A list of arguments to be passed to the new function.

#### Returns

`any`

#### Inherited from

```ts
AuthGuard('jwt').bind
```

***

### call() {#call}

```ts
static call(
   this, 
   thisArg, ...
   argArray): any;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the current object.

##### argArray

...`any`[]

A list of arguments to be passed to the method.

#### Returns

`any`

#### Inherited from

```ts
AuthGuard('jwt').call
```

***

### toString() {#tostring}

```ts
static toString(): string;
```

Defined in: .yarn/berry/cache/typescript-patch-6fda4d02cf-10c0.zip/node\_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

```ts
AuthGuard('jwt').toString
```
