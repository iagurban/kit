# Class: KeyframesBuilder

Defined in: [mobx/keyframes-builder.tsx:25](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/react/mobx/keyframes-builder.tsx#L25)

The KeyframesBuilder class provides functionality to dynamically create CSS keyframes
and manage them in the document's styles through unique naming and caching mechanisms.
This ensures animations have unique names and are efficiently reused when their steps
are identical, while also cleaning up unused styles.

## Methods

### inject() {#inject}

```ts
inject(label, steps): IComputedValue<string>;
```

Defined in: [mobx/keyframes-builder.tsx:39](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/react/mobx/keyframes-builder.tsx#L39)

Injects a CSS animation keyframes rule into the DOM and returns a computed value representing the animation name.

#### Parameters

##### label

`string`

A descriptive label used for creating a unique animation name.

##### steps

`Record`\<`` `${number}%` ``, `CSSProperties`\>

An object representing the keyframes for the animation.
Each key is a percentage of the animation's duration, and its value is a CSSProperties object defining the styles.

#### Returns

`IComputedValue`\<`string`\>

A computed observable value that holds the name of the created animation.
When the computed value is no longer observed, the animation styles are automatically removed from the DOM.
