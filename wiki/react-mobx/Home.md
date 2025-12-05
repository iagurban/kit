# @grbn/kit

## Classes

- [KeyframesBuilder](Class.KeyframesBuilder.md)

## Interfaces

- [RotatingGradientBackgroundProps](Interface.RotatingGradientBackgroundProps.md)

## Variables

- [AnimatedSVGGradientBackground](Variable.AnimatedSVGGradientBackground.md)
- [gradientPresets](Variable.gradientPresets.md)
- [keyframesBuilder](Variable.keyframesBuilder.md)
- [moveAnimations](Variable.moveAnimations.md)
- [rotateAnimations](Variable.rotateAnimations.md)

## Functions

- [dndTreeFabric](Function.dndTreeFabric.md)
- [enhanceStepsEvenly](Function.enhanceStepsEvenly.md)
- [useResizeObserver](Function.useResizeObserver.md)
- [useResizeObserverWithCallback](Function.useResizeObserverWithCallback.md)


# Class: KeyframesBuilder

Defined in: [mobx/keyframes-builder.tsx:25](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/keyframes-builder.tsx#L25)

The KeyframesBuilder class provides functionality to dynamically create CSS keyframes
and manage them in the document's styles through unique naming and caching mechanisms.
This ensures animations have unique names and are efficiently reused when their steps
are identical, while also cleaning up unused styles.

## Methods

### inject() {#inject}

```ts
inject(label, steps): IComputedValue<string>;
```

Defined in: [mobx/keyframes-builder.tsx:39](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/keyframes-builder.tsx#L39)

Injects a CSS animation keyframes rule into the DOM and returns a computed value representing the animation name.

#### Parameters

##### label `string`

A descriptive label used for creating a unique animation name.

##### steps `Record`\<`` `${number}%` ``, `CSSProperties`\>

An object representing the keyframes for the animation.
Each key is a percentage of the animation's duration, and its value is a CSSProperties object defining the styles.

#### Returns `IComputedValue`\<`string`\>

A computed observable value that holds the name of the created animation.
When the computed value is no longer observed, the animation styles are automatically removed from the DOM.


# Function: dndTreeFabric()

```ts
function dndTreeFabric<Item, State>(methods, mlStep): object;
```

Defined in: [mobx/dnd-tree-fabric/dnd-tree-fabric.tsx:455](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/dnd-tree-fabric/dnd-tree-fabric.tsx#L455)

Creates context accessors for DndTreeState (which user must provide with ProvideDndTreeState) and
components for rendering tree bound to that context.

```typescript
const DraggingItem = observer<{
  itemId: string;
}>(function DraggingItem({ itemId }) {
  const store = useDndTreeState();

  const item = useMemo(() => computed(() => notNull(store.getById(itemId))), [store, itemId]).get();
  return (
    <Paper
      p={8}
      w={`calc(max(50vw, 20rem))`}
      opacity={0.9}
      withBorder
      style={{ transform: `rotate(-2deg)`, cursor: `pointer`, zIndex: 1000 }}
    >
      <Text style={{ overflow: `hidden`, textOverflow: `ellipsis`, whiteSpace: `nowrap` }}>{item.title}</Text>
    </Paper>
  );
});

const TaskPaperWithContent = observerWithForwardRef<
  BoxProps &
    ElementProps<'div'> & {
      task: TaskTreeItem;
      isDrag: RefObject<boolean>;
    },
  HTMLDivElement
>(function TaskPaperWithContent({ task, isDrag, ...props }, ref) {
  const storage = useStorage();

  return (
    <Paper
      {...props}
      ref={ref}
      p={8}
      withBorder
      className={classNames.taskItemRoot}
      onClick={e => void (!e.defaultPrevented && !isDrag.current && storage.tasks.openTask(task.id))}
    >
      <TaskPaperContent task={task} />
    </Paper>
  );
});

const { DndTreeContext, RootLevel, useDndTreeState } = dndTreeFabric<TaskTreeItem>(
  {
    renderItem: (props, item, { isDrag }) => <TaskPaperWithContent {...props} task={item} isDrag={isDrag} />,
    expandButton: props => <ExpandButtonReference {...props} />,
    dropLine: props => <DropLineReference {...props} />,
    dragging: props => <DraggingItem {...props} />,
  },
  { mlStep: 20 }
);

export const TasksListView = observer(function TasksListView() {
  const storage = useStorage();
  const store = useMemo(
    () =>
      new DndTreeState(
        id => storage.tasks.actualTasks.get(id) ?? null,
        id => storage.tasks.actualSortedChildrenOf(id),
        id => storage.tasks.actualUnsortedChildrenOf(id)?.length ?? 0,
        (main, others) => {
          console.log(`drag end`, main, others);
          storage.tasks.pushUpdates([
            { taskId: main.id, field: 'parentId', value: main.parentId },
            { taskId: main.id, field: 'orderKey', value: main.orderKey },
            ...others.map(o => ({ taskId: o.id, field: 'orderKey', value: o.orderKey }) as const),
          ]);
        },
        manualSort
      ),
    [storage]
  );

  return (
    <ProvideDndTreeState store={store}>
      <ScrollArea flex="1 0 0" type="always" scrollbars="y">
        <Flex direction="column">
          <RootLevel />
        </Flex>
      </ScrollArea>
    </ProvideDndTreeState>
  );
});
```

## Type Parameters

### Item `Item` *extends* `object`

### State `State` *extends* `DndTreeState`\<`Item`\> = `DndTreeState`\<`Item`\>

## Parameters

### methods

#### dragging

(`props`) => `ReactNode`

#### dropLine

(`props`) => `ReactNode`

#### expandButton

(`props`) => `ReactNode`

#### renderItem

(`props`, `item`, `other`) => `ReactNode`

### mlStep

#### getDropBoxProps?

(`isTop`) => `BoxProps`

#### getDroppingParentProps?

(`visible`) => `BoxProps`

#### mlStep `number`

#### offsetWidth

(`depth`) => `string` \| `number`

## Returns

`object`

### ProvideDndTreeState

```ts
ProvideDndTreeState: FunctionComponent<PropsWithChildren<{
  store: State;
}>>;
```

### RootLevel

```ts
RootLevel: FunctionComponent<object>;
```

### TreeNode

```ts
TreeNode: FunctionComponent<{
  index: number;
  item: Item;
  path: readonly string[];
}>;
```

### useDndTreeState()

```ts
useDndTreeState: () => State;
```

#### Returns `State`


# Function: enhanceStepsEvenly()

```ts
function enhanceStepsEvenly(steps, o?): Record<`${number}%`, CSSProperties>;
```

Defined in: [mobx/keyframes-builder.tsx:94](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/keyframes-builder.tsx#L94)

Generates a mapping of percentages to CSS properties, evenly distributing the provided steps.
Optionally completes a cycle by repeating the first step at the end.

## Parameters

### steps

readonly `CSSProperties`[]

An array of CSS properties representing animation steps.

### o?

An options-object.

#### cycle? `boolean`

If true, appends the first step to the end to create a seamless loop.

## Returns

`Record`\<`` `${number}%` ``, `CSSProperties`\>

A record where keys are percentage strings and values are CSS properties.


# Function: useResizeObserver()

```ts
function useResizeObserver(callback): GraphNodeViewStore;
```

Defined in: [mobx/use-resize-observer.ts:57](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/use-resize-observer.ts#L57)

useResizeObserver is a custom hook that creates a reference to a `GraphNodeViewStore`
instance for handling resize events using a provided callback function.

## Parameters

### callback

(`e`) => `void`

A function that will be triggered when a resize event occurs.
                             It receives a single parameter of type `ResizeObserverEntry`,
                             which contains details of the resize event.

## Returns

`GraphNodeViewStore`

Returns an instance of `GraphNodeViewStore` that manages
                              the resize observer and its lifecycle.


# Function: useResizeObserverWithCallback()

```ts
function useResizeObserverWithCallback<T>(...cb): GraphNodeViewStore;
```

Defined in: [mobx/use-resize-observer.ts:84](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/use-resize-observer.ts#L84)

A custom hook that uses a resize observer to track changes in the size of an element,
and executes a memoized callback function when a resize event occurs.

## Type Parameters

### T `T` *extends* (`e`) => `any`

The type of the callback function.

## Parameters

### cb

...\[`T`, `DependencyList`\]

The parameters for the `useCallback` hook.
The first parameter is the callback function to be executed on resize, and the second is the dependency array.

## Returns

`GraphNodeViewStore`

An instance of `GraphNodeViewStore` that manages the resize observer.


# Interface: RotatingGradientBackgroundProps

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:15](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L15)

Props for the RotatingGradientBackground component.

## Properties

### gradientStops {#gradientstops}

```ts
gradientStops: readonly object[];
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:24](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L24)

The stops of the gradient.

***

### moveAnimation? {#moveanimation}

```ts
optional moveAnimation: readonly CSSProperties[];
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:45](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L45)

The keyframes for the move animation.

***

### moveDur {#movedur}

```ts
moveDur: string;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:50](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L50)

The duration of the move animation.

***

### rotateDur {#rotatedur}

```ts
rotateDur: string;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:40](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L40)

The duration of the rotation animation.

***

### rotateKeyframes {#rotatekeyframes}

```ts
rotateKeyframes: object;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:32](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L32)

The keyframes for the rotation animation.

#### keyTimes

```ts
keyTimes: string;
```

#### values

```ts
values: string;
```

***

### scale {#scale}

```ts
scale: number;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:19](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L19)

The scale of the SVG.


# Variable: AnimatedSVGGradientBackground

```ts
const AnimatedSVGGradientBackground: FunctionComponent<PropsWithChildren<RotatingGradientBackgroundProps & object & Pick<FlexProps, "pos">>>;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx:65](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background.tsx#L65)

A component that displays an animated SVG gradient background.


# Variable: gradientPresets

```ts
const gradientPresets: object;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background-presets.ts:22](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background-presets.ts#L22)

A collection of preset gradients.

## Type Declaration

### calmBlue {#calmblue}

```ts
readonly calmBlue: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### coralSplash {#coralsplash}

```ts
readonly coralSplash: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### insta {#insta}

```ts
readonly insta: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### lavaWarning {#lavawarning}

```ts
readonly lavaWarning: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### lavenderField {#lavenderfield}

```ts
readonly lavenderField: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### lemonNavy {#lemonnavy}

```ts
readonly lemonNavy: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### magentaNight {#magentanight}

```ts
readonly magentaNight: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### mintBlue {#mintblue}

```ts
readonly mintBlue: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### mintDream {#mintdream}

```ts
readonly mintDream: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### mintRed {#mintred}

```ts
readonly mintRed: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### oceanDeepSmooth {#oceandeepsmooth}

```ts
readonly oceanDeepSmooth: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### rainbowSerene {#rainbowserene}

```ts
readonly rainbowSerene: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### sandCloud {#sandcloud}

```ts
readonly sandCloud: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### sandSea {#sandsea}

```ts
readonly sandSea: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### stripeSoftBlue {#stripesoftblue}

```ts
readonly stripeSoftBlue: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### stripeSoftYellow {#stripesoftyellow}

```ts
readonly stripeSoftYellow: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### sunsetSmooth {#sunsetsmooth}

```ts
readonly sunsetSmooth: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```

### sunSky {#sunsky}

```ts
readonly sunSky: readonly [{
  color: string;
  offset: number;
}, {
  color: string;
  offset: number;
}];
```


# Variable: keyframesBuilder

```ts
const keyframesBuilder: KeyframesBuilder;
```

Defined in: [mobx/keyframes-builder.tsx:121](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/keyframes-builder.tsx#L121)

A variable that holds an instance of the KeyframesBuilder class.
The KeyframesBuilder is used to programmatically create CSS keyframes
that define animations for HTML elements. It provides methods for
adding keyframes and managing animations dynamically.


# Variable: moveAnimations

```ts
const moveAnimations: object;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background-presets.ts:132](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background-presets.ts#L132)

A collection of preset background position animations.

## Type Declaration

### basic {#basic}

```ts
readonly basic: readonly [{
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}];
```

### bounce {#bounce}

```ts
readonly bounce: readonly [{
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}];
```

### diagonal {#diagonal}

```ts
readonly diagonal: readonly [{
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}];
```

### drift {#drift}

```ts
readonly drift: readonly [{
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}];
```

### spiral {#spiral}

```ts
readonly spiral: readonly [{
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}];
```

### vertical {#vertical}

```ts
readonly vertical: readonly [{
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}];
```

### zigzag {#zigzag}

```ts
readonly zigzag: readonly [{
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}, {
  backgroundPosition: string;
}];
```


# Variable: rotateAnimations

```ts
const rotateAnimations: object;
```

Defined in: [mobx/animated-svg-gradient-background/animated-svg-gradient-background-presets.ts:148](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/react/mobx/animated-svg-gradient-background/animated-svg-gradient-background-presets.ts#L148)

A collection of preset gradient rotation animations.

## Type Declaration

### backAndForth {#backandforth}

```ts
readonly backAndForth: object;
```

#### backAndForth.keyTimes

```ts
keyTimes: string;
```

#### backAndForth.values

```ts
values: string;
```

### doubleCircle {#doublecircle}

```ts
readonly doubleCircle: object;
```

#### doubleCircle.keyTimes

```ts
keyTimes: string;
```

#### doubleCircle.values

```ts
values: string;
```

### drift {#drift}

```ts
readonly drift: object;
```

#### drift.keyTimes

```ts
keyTimes: string;
```

#### drift.values

```ts
values: string;
```

### fastShake {#fastshake}

```ts
readonly fastShake: object;
```

#### fastShake.keyTimes

```ts
keyTimes: string;
```

#### fastShake.values

```ts
values: string;
```

### fullCircle {#fullcircle}

```ts
readonly fullCircle: object;
```

#### fullCircle.keyTimes

```ts
keyTimes: string;
```

#### fullCircle.values

```ts
values: string;
```

### gentleSway {#gentlesway}

```ts
readonly gentleSway: object;
```

#### gentleSway.keyTimes

```ts
keyTimes: string;
```

#### gentleSway.values

```ts
values: string;
```

### halfCircle {#halfcircle}

```ts
readonly halfCircle: object;
```

#### halfCircle.keyTimes

```ts
keyTimes: string;
```

#### halfCircle.values

```ts
values: string;
```

### pauseInMiddle {#pauseinmiddle}

```ts
readonly pauseInMiddle: object;
```

#### pauseInMiddle.keyTimes

```ts
keyTimes: string;
```

#### pauseInMiddle.values

```ts
values: string;
```

### quarterTurn {#quarterturn}

```ts
readonly quarterTurn: object;
```

#### quarterTurn.keyTimes

```ts
keyTimes: string;
```

#### quarterTurn.values

```ts
values: string;
```

### randomJump {#randomjump}

```ts
readonly randomJump: object;
```

#### randomJump.keyTimes

```ts
keyTimes: string;
```

#### randomJump.values

```ts
values: string;
```

### sawWave {#sawwave}

```ts
readonly sawWave: object;
```

#### sawWave.keyTimes

```ts
keyTimes: string;
```

#### sawWave.values

```ts
values: string;
```

### slowCircle {#slowcircle}

```ts
readonly slowCircle: object;
```

#### slowCircle.keyTimes

```ts
keyTimes: string;
```

#### slowCircle.values

```ts
values: string;
```

### tripleBounce {#triplebounce}

```ts
readonly tripleBounce: object;
```

#### tripleBounce.keyTimes

```ts
keyTimes: string;
```

#### tripleBounce.values

```ts
values: string;
```
