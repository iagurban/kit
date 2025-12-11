# Function: isInstanceOf()

```ts
function isInstanceOf<C>(...classes): Checker<C>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-instance-of.ts:12](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-instance-of.ts#L12)

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
