# Function: isInstanceOf()

```ts
function isInstanceOf<C>(...classes): Checker<C>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:226](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/checks.ts#L226)

A utility function to check if a given object is an instance of one or more specified classes.

## Type Parameters

### C

`C`

The type representing the class or classes to check against.

## Parameters

### classes

...[`ClassConstructor`](TypeAlias.ClassConstructor.md)\<`C`\>[]

A list of class constructors to check the object instance against.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`C`\>

A type guard function that takes an object and determines if it is an instance of any of the provided classes.
