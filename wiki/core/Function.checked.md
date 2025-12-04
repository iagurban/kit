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

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:355](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/checks.ts#L355)

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

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:365](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/checks.ts#L365)

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
