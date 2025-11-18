# Function: createIoCContainer()

```ts
function createIoCContainer<T>(schema): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/ioc.ts:31](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/ioc.ts#L31)

A factory function to create an Inversion of Control (IoC) container.

This IoC container allows for managing dependencies by dynamically instantiating services
and ensuring proper resolution of their dependencies. Services can be defined as part
of the input schema, and their implementations can be registered into the container.

The container prevents redefinition of service implementations after they have been
instantiated and immediately throws an error in cases of cyclic dependencies or
accessing unregistered services.

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\>

The type definition of the IoC container, representing services and their types.

## Parameters

### schema

\{ \[K in string \| number \| symbol\]: null \}

A schema object defining the service keys the container will manage.
Each key is set to `null` to establish the potential for registering an implementation.

## Returns

`object`

An object containing:
- `container`: The IoC container instance that provides resolved implementations of the services.
- `implementations`: A proxy object allowing for the registration of service implementations.

### container

```ts
container: T;
```

### implementations

```ts
implementations: { [K in string | number | symbol]: (container: T) => T[K] };
```

## Throws

If a service implementation is accessed without being registered.

## Throws

If an implementation of a service is set after the service has been instantiated.

## Throws

If a cyclic dependency is detected when resolving a service.
