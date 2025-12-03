# Function: checked()

Evaluates a value against a given check function and throws an error if the check fails.

## Param

The value to be validated.

## Param

A function that performs a validation check on the value. Should return a truthy value if validation passes.

## Param

A function that generates an error message or error object to be thrown if validation fails.

## Throws

Throws an error if the check function returns a falsy value.

## Call Signature

```ts
function checked<T, R>(
   v, 
   check, 
   message): R;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:346](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/checks.ts#L346)

### Type Parameters

#### T

`T`

#### R

`R`

### Parameters

#### v

`T`

#### check

(`v`) => `v is R`

#### message

(`v`) => `string` \| `Error`

### Returns

`R`

## Call Signature

```ts
function checked<T>(
   v, 
   check, 
   message): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:347](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/checks.ts#L347)

### Type Parameters

#### T

`T`

### Parameters

#### v

`T`

#### check

(`v`) => `unknown`

#### message

(`v`) => `string` \| `Error`

### Returns

`T`
