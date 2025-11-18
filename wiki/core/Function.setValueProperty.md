# Function: setValueProperty()

```ts
function setValueProperty<T, K, O>(
   target, 
   key, 
   value): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/once.ts:20](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/once.ts#L20)

Defines a value property on the given target with stable attributes and returns the value.

The property is defined with the following descriptors:
- `writable: false` — the value cannot be reassigned
- `enumerable: true` — the property appears during enumeration
- `configurable: true` — the property can be reconfigured or deleted later

This helper is primarily used by [once](Function.once.md) to replace a getter with its computed value
after the first access (lazy initialization / memoization).

## Type Parameters

### T

`T`

Type of the value being assigned.

### K

`K` *extends* `string` \| `number` \| `symbol`

Key of the property on the target object.

### O

`O`

Type of the target object.

## Parameters

### target

`O`

The object on which to define the property.

### key

`K`

The property name to define on the target.

### value

`T`

The value to set for the property.

## Returns

`T`

The same `value` that was provided.
