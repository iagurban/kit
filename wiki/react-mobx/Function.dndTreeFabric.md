# Function: dndTreeFabric()

```ts
function dndTreeFabric<Item, State>(methods, mlStep): object;
```

Defined in: [mobx/dnd-tree-fabric/dnd-tree-fabric.tsx:455](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/react/mobx/dnd-tree-fabric/dnd-tree-fabric.tsx#L455)

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

### Item

`Item` *extends* `object`

### State

`State` *extends* `DndTreeState`\<`Item`\> = `DndTreeState`\<`Item`\>

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

#### mlStep

`number`

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

#### Returns

`State`
