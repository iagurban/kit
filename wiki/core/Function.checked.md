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

Defined in: [IdeaProjects/kit/kit/src/core/checks/checked.ts:10](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/checked.ts#L10)

Evaluates a value against a given check function and throws an error if the check fails.

### Type Parameters

#### T

`T`

#### R

`R`

### Parameters

#### v

`T`

The value to be validated.

#### check

(`v`) => `v is R`

A function that performs a validation check on the value. Should return a truthy value if validation passes.

#### message

(`v`) => `string` \| `Error`

A function that generates an error message or error object to be thrown if validation fails.

### Returns

`R`

Returns the validated value if the check is successful.

### Throws

Throws an error if the check function returns a falsy value.

## Call Signature

```ts
function checked<T>(
   v, 
   check, 
   message): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/checked.ts:20](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/checked.ts#L20)

Evaluates a value against a given check function and throws an error if the check fails.

### Type Parameters

#### T

`T`

### Parameters

#### v

`T`

The value to be validated.

#### check

(`v`) => `unknown`

A function that performs a validation check on the value. Should return a truthy value if validation passes.

#### message

(`v`) => `string` \| `Error`

A function that generates an error message or error object to be thrown if validation fails.

### Returns

`T`

Returns the validated value if the check is successful.

### Throws

Throws an error if the check function returns a falsy value.
