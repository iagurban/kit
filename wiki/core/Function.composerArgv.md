# Function: composerArgv()

```ts
function composerArgv<Args>(initial): object;
```

Defined in: [IdeaProjects/kit/kit/src/core/composer.ts:46](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/composer.ts#L46)

A factory function that creates an object for managing a composed series of argument handlers.

## Type Parameters

### Args

`Args` *extends* [`AnyArray`](TypeAlias.AnyArray.md)

## Parameters

### initial

(...`args`) => `boolean`

The initial handler function that processes arguments.

## Returns

`object`

An object with methods to manage composed argument handlers.

### run()

```ts
run: (...args) => boolean;
```

#### Parameters

##### args

...`Args`

#### Returns

`boolean`

### push()

```ts
push(next): void;
```

#### Parameters

##### next

(...`args`) => `boolean`

#### Returns

`void`
