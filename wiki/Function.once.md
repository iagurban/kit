# Function: once()

## Call Signature

```ts
function once<T, O, K>(
   target, 
   key, 
d): TypedPropertyDescriptor<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/once.ts:60](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/once.ts#L60)

Memoizes a getter: replaces it with its computed value upon first access.

Decorator usage: apply to a getter to turn it into a lazy property.
After the first `get`, the descriptor is replaced with a concrete value using
[setValueProperty](Function.setValueProperty.md), so subsequent accesses return the cached value without
invoking the original getter again.

Example (decorator):
```ts
class Example {
  @once
  get expensive() {
    return heavyComputation();
  }
}
```

Notes:
- Must be used on getters only; using on a setter or a non-getter throws an error.
- The resulting property is non-writable, enumerable, and configurable.

### Type Parameters

#### T

`T`

The inferred return type of the getter.

#### O

`O`

The type of the instance that owns the property.

#### K

`K` *extends* `string` \| `number` \| `symbol`

The key of the property on `O`.

### Parameters

#### target

`O`

The prototype or instance the decorator is applied to (provided by TS decorator system).

#### key

`K`

The property name being decorated.

#### d

`TypedPropertyDescriptor`\<`T`\>

The typed property descriptor provided by the decorator system.

### Returns

`TypedPropertyDescriptor`\<`T`\>

A new getter-only descriptor that memoizes its first computed value.

## Call Signature

```ts
function once<T, O, K>(
   target, 
   key, 
   replace, 
   value): T;
```

Defined in: [IdeaProjects/kit/kit/src/core/once.ts:90](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/once.ts#L90)

Sets a property to a concrete value in a form suitable for use inside a getter body.

Function usage: when called with `true` as the third argument, it directly defines
the value on the instance (using [setValueProperty](Function.setValueProperty.md)) and returns it. This is
especially handy for manual lazy initialization inside a getter without using a
decorator.

Example (function form inside getter):
```ts
get a() {
  return once(this, 'a', true, 123 + 456 + 789);
}
```

### Type Parameters

#### T

`T`

Type of the value being set.

#### O

`O`

Type of the target object.

#### K

`K` *extends* `string` \| `number` \| `symbol`

The key of the property on `O`.

### Parameters

#### target

`O`

The object on which to set the property.

#### key

`K`

Property name to set.

#### replace

`true`

Literal `true` to select the function form of `once`.

#### value

`T`

The value to assign to the property.

### Returns

`T`

The value that was assigned to the property.
