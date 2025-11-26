# Function: isInstanceOf()

```ts
function isInstanceOf<C>(...classes): Checker<C>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:194](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/checks.ts#L194)

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
