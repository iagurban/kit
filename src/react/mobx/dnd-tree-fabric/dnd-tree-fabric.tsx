// noinspection LocalVariableNamingConventionJS

import type { Modifier } from '@dnd-kit/core';
import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  Over,
  PointerSensor,
  pointerWithin,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS, getEventCoordinates } from '@dnd-kit/utilities';
import { Box, BoxProps, Flex } from '@mantine/core';
import { ElementProps } from '@mantine/core/lib/core';
import { sortBy, sortedIndexBy } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import {
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { ManualSortingAlphabet } from '../../../core/manual-sorting';
import { notNull } from '../../../utils/flow-utils';
import { clamp } from '../../../utils/numeric-utils';
import { createUsableContext } from '../../react';
import { ObservableExSet } from '../observable-ex-set';

const preDroppableId = `!!!PRE!!!`;

export const snapRightBoundToCursor: Modifier = ({ activatorEvent, draggingNodeRect, transform }) => {
  if (!draggingNodeRect || !activatorEvent) {
    return transform;
  }

  const activatorCoordinates = getEventCoordinates(activatorEvent);
  if (!activatorCoordinates) {
    return transform;
  }

  const offsetX = activatorCoordinates.x - draggingNodeRect.left;
  const offsetY = activatorCoordinates.y - draggingNodeRect.top;

  return {
    ...transform,
    x: transform.x + Math.max(offsetX - draggingNodeRect.width, 0),
    y: transform.y + offsetY - draggingNodeRect.height / 2,
  };
};

const pickDropPoint = (
  path: readonly string[],
  { min, max, points }: Readonly<{ points: readonly DropPoint[]; min: number; max: number }>,
  levelShift: number
) => {
  for (let ls = clamp(levelShift, min, max), els = ls + path.length + 1; ls < els; ++ls) {
    //console.log(`ls`, levelShift, min, max, ls);
    const q = points.find(i => i.levelDelta === ls);
    if (q) {
      return q;
    }
  }
  return null;
};

const detectLevelShift = (active: Active) =>
  active.rect.current.initial && active.rect.current.translated
    ? Math.floor((active.rect.current.translated.left - active.rect.current.initial.left) / 24)
    : null;

export type DropPoint = { levelDelta: number; inside: string | null; after: string | null };

export class DndTreeState<Item extends { id: string; parentId?: string | null; orderKey: string }> {
  constructor(
    readonly getById: (id: string) => Item | null,
    readonly getSortedChildrenOfId: (id: string | null) => Item[],
    readonly getChildrenCountOfId: (id: string | null) => number,
    readonly submit: (
      mainItem: { id: string; parentId: string | null; orderKey: string },
      others: readonly { id: string; orderKey: string }[]
    ) => void,
    readonly manualSort: ManualSortingAlphabet
  ) {
    makeObservable(this);
  }

  readonly getAvailableDropPoints = (overId: string, item: Item) => {
    const { getById, getSortedChildrenOfId, getChildrenCountOfId, isExpanded } = this;

    const findParentOfActualItem = (item: Item, pred: (i: Item) => boolean): Item | null => {
      let node: Item | undefined = item.parentId != null ? notNull(getById(item.parentId)) : undefined;
      while (node) {
        if (pred(node)) {
          return node;
        }
        node = node.parentId != null ? notNull(getById(node.parentId)) : undefined;
      }
      return null;
    };

    const findNextRowAfterRecur = (depth: number, id: string): number => {
      const node = notNull(getById(id));
      const siblingsSorted = getSortedChildrenOfId(node.parentId ?? null);
      if (siblingsSorted.at(-1)?.orderKey !== node.orderKey) {
        //  node is not last child in parent
        return depth; // same depth
      }
      return node.parentId ? findNextRowAfterRecur(depth - 1, node.parentId) : depth;
    };

    const findNextRowAfter = (depth: number, id: string): number =>
      isExpanded(id) && getChildrenCountOfId(id) ? depth + 1 : findNextRowAfterRecur(depth, id);

    const canBeInserted = (item: Item, parentId: string | null): boolean => {
      // return item.id !== parentId && item.parentId !== parentId;

      if (parentId) {
        // the item cannot be inserted into parentId if item.id is parentId or is one of the parents of parentId
        if (
          item.id === parentId ||
          findParentOfActualItem(notNull(getById(parentId)), i => i.id === item.id)
        ) {
          return false;
        }
      }

      return true;
    };

    const pointToStr = (dp: DropPoint) => ({
      ...dp,
      after: dp.after ? `[${getById(dp.after)?.id || '---'}]` : null,
      inside: dp.inside ? `[${getById(dp.inside)?.id || '---'}]` : null,
    });

    if (overId === preDroppableId) {
      return { points: [{ after: null, inside: null, levelDelta: 0 }], min: 0, max: 0 };
    }

    const path: string[] = [];
    {
      let node = getById(overId);
      while (node) {
        node = (node.parentId && notNull(getById(node.parentId))) || null;
        if (node) {
          path.push(node.id);
        }
      }
    }
    const currRowLevel = path.length;
    const nextRowLevel = findNextRowAfter(currRowLevel, overId);
    // console.log(currRowLevel, nextRowLevel);
    const delta = nextRowLevel - currRowLevel;
    // console.log(`delta =`, delta, ` after ${path.join(' -> ')} -> ${overId}`);

    const levels: DropPoint[] = [];

    if (delta < 0) {
      let p: string | undefined | null = notNull(getById(overId)).parentId;

      const upperLevels: DropPoint[] = [];
      for (let i = -1; i >= delta - 1; i--) {
        const node: Item | undefined = p ? notNull(getById(p)) : undefined;
        if (node) {
          upperLevels.push({ levelDelta: i, after: node.id, inside: node.parentId ?? null });
        }
        p = node?.parentId;
      }
      // console.log(`upper`, ...upperLevels.map(pointToStr));
      levels.push(...upperLevels);
    }

    if (delta <= 0) {
      const nearLevel: DropPoint = { levelDelta: 0, after: overId, inside: path.at(-1) ?? null };
      levels.push(nearLevel);
      // console.log(`near`, pointToStr(nearLevel));
    }
    // if (delta >= 0)
    {
      const deeperLevel: DropPoint = { levelDelta: 1, after: null, inside: overId };
      levels.push(deeperLevel);
      // console.log(`deeper`, pointToStr(deeperLevel));
    }
    // console.log(`levels:`, ...levels);
    // console.log(`----`);
    const sortedPoints = sortBy(
      levels.filter(l => canBeInserted(item, l.inside)),
      l => l.levelDelta
    );
    return {
      points: sortedPoints,
      min: sortedPoints.at(0)?.levelDelta ?? 0,
      max: sortedPoints.at(-1)?.levelDelta ?? 0,
    };
  };

  readonly onDragEnd = () => {
    const { getById, getSortedChildrenOfId, dropPoint, draggingId: activeId, manualSort } = this;

    if (!dropPoint || !activeId) {
      return;
    }

    const srcNode = notNull(getById(activeId));
    const srcParent = (srcNode.parentId && notNull(getById(srcNode.parentId))) || null;
    const srcChildren = getSortedChildrenOfId(srcParent?.id ?? null) || [];
    const srcIndex = sortedIndexBy(srcChildren, srcNode, i => i.orderKey);
    if (srcIndex < 0) {
      throw new Error(`srcNode not found in srcParent`);
    }
    const srcAfter = srcChildren[srcIndex - 1]?.id ?? null;

    const dstParent =
      dropPoint.inside === srcNode.parentId
        ? srcParent
        : dropPoint.inside
          ? notNull(getById(dropPoint.inside))
          : null;
    const dstChildren =
      dstParent === srcParent ? srcChildren : getSortedChildrenOfId(dstParent?.id ?? null) || [];
    const dstAfter = dropPoint.after;

    if (dstParent === srcParent && dstAfter === srcAfter) {
      return;
    }

    if (dstParent === srcParent) {
      dstChildren.splice(srcIndex, 1);
    }

    const { newKeys, updated } = dstAfter
      ? manualSort.insertAfter(
          dstChildren.map(i => i.orderKey),
          notNull(getById(dstAfter)).orderKey,
          1
        )
      : dstChildren.length
        ? manualSort.insertBefore(
            dstChildren.map(i => i.orderKey),
            dstChildren[0].orderKey,
            1
          )
        : { newKeys: manualSort.getNewKeys(1), updated: undefined };

    const change1 = { id: activeId, orderKey: newKeys[0], parentId: dstParent?.id ?? null };
    const change2 = [...(updated?.entries() || [])].map(([k, v]) => ({ id: k, orderKey: v }));
    this.submit(change1, change2);
  };

  readonly pickDropPoint = (
    over: Over | null,
    active: Active | null,
    path: readonly string[],
    item: Item
  ) => {
    if (!over || active?.id !== item.id) {
      return {};
    }

    const dropPoints = this.getAvailableDropPoints(over.id as string, item);
    const levelShift = detectLevelShift(active);
    return {
      levelShift,
      dropPoints,
      picked: levelShift != null ? pickDropPoint(path, dropPoints, levelShift) : null,
    };
  };

  @observable
  draggingId: string | null = null;

  @action
  setDraggingId(id: string | null) {
    this.draggingId = id;
  }

  @observable dropPoint: DropPoint | null = null;

  @action
  setDropPoint(point: DropPoint | null) {
    // console.log(`point`, point);
    this.dropPoint = point;
  }

  readonly expanded = new ObservableExSet<string>(); /// TODO restrict recursion while rendering

  readonly isExpanded = (id: string) => {
    return this.expanded.has(id);
  };

  @action.bound
  setExpanded(id: string, expanded: boolean) {
    if (expanded) {
      this.expanded.add(id);
    } else {
      this.expanded.delete(id);
    }
  }
}
/**
 * Creates context accessors for DndTreeState (which user must provide with ProvideDndTreeState) and
 * components for rendering tree bound to that context.
 *
 * ```typescript
 * const DraggingItem = observer<{
 *   itemId: string;
 * }>(function DraggingItem({ itemId }) {
 *   const store = useDndTreeState();
 *
 *   const item = useMemo(() => computed(() => notNull(store.getById(itemId))), [store, itemId]).get();
 *   return (
 *     <Paper
 *       p={8}
 *       w={`calc(max(50vw, 20rem))`}
 *       opacity={0.9}
 *       withBorder
 *       style={{ transform: `rotate(-2deg)`, cursor: `pointer`, zIndex: 1000 }}
 *     >
 *       <Text style={{ overflow: `hidden`, textOverflow: `ellipsis`, whiteSpace: `nowrap` }}>{item.title}</Text>
 *     </Paper>
 *   );
 * });
 *
 * const TaskPaperWithContent = observerWithForwardRef<
 *   BoxProps &
 *     ElementProps<'div'> & {
 *       task: TaskTreeItem;
 *       isDrag: RefObject<boolean>;
 *     },
 *   HTMLDivElement
 * >(function TaskPaperWithContent({ task, isDrag, ...props }, ref) {
 *   const storage = useStorage();
 *
 *   return (
 *     <Paper
 *       {...props}
 *       ref={ref}
 *       p={8}
 *       withBorder
 *       className={classNames.taskItemRoot}
 *       onClick={e => void (!e.defaultPrevented && !isDrag.current && storage.tasks.openTask(task.id))}
 *     >
 *       <TaskPaperContent task={task} />
 *     </Paper>
 *   );
 * });
 *
 * const { DndTreeContext, RootLevel, useDndTreeState } = dndTreeFabric<TaskTreeItem>(
 *   {
 *     renderItem: (props, item, { isDrag }) => <TaskPaperWithContent {...props} task={item} isDrag={isDrag} />,
 *     expandButton: props => <ExpandButtonReference {...props} />,
 *     dropLine: props => <DropLineReference {...props} />,
 *     dragging: props => <DraggingItem {...props} />,
 *   },
 *   { mlStep: 20 }
 * );
 *
 * export const TasksListView = observer(function TasksListView() {
 *   const storage = useStorage();
 *   const store = useMemo(
 *     () =>
 *       new DndTreeState(
 *         id => storage.tasks.actualTasks.get(id) ?? null,
 *         id => storage.tasks.actualSortedChildrenOf(id),
 *         id => storage.tasks.actualUnsortedChildrenOf(id)?.length ?? 0,
 *         (main, others) => {
 *           console.log(`drag end`, main, others);
 *           storage.tasks.pushUpdates([
 *             { taskId: main.id, field: 'parentId', value: main.parentId },
 *             { taskId: main.id, field: 'orderKey', value: main.orderKey },
 *             ...others.map(o => ({ taskId: o.id, field: 'orderKey', value: o.orderKey }) as const),
 *           ]);
 *         },
 *         manualSort
 *       ),
 *     [storage]
 *   );
 *
 *   return (
 *     <ProvideDndTreeState store={store}>
 *       <ScrollArea flex="1 0 0" type="always" scrollbars="y">
 *         <Flex direction="column">
 *           <RootLevel />
 *         </Flex>
 *       </ScrollArea>
 *     </ProvideDndTreeState>
 *   );
 * });
 * ```
 * @param methods
 * @param mlStep
 */
export const dndTreeFabric = <
  Item extends { id: string; parentId?: string | null; orderKey: string },
  State extends DndTreeState<Item> = DndTreeState<Item>,
>(
  methods: {
    renderItem: (
      props: BoxProps & ElementProps<'div'> & { ref: (element: HTMLElement | null) => void },
      item: Item,
      other: { isDrag: RefObject<boolean> }
    ) => ReactNode;
    expandButton: (props: {
      onClick: MouseEventHandler<HTMLElement>;
      visible: boolean;
      opened: boolean;
    }) => ReactNode;
    dragging: (props: { itemId: string }) => ReactNode;
    dropLine: (props: { ml: number; color?: string; isTop?: boolean; visible: boolean }) => ReactNode;
  },
  { mlStep }: { mlStep: number }
) => {
  const { use: useDndTreeState, provider: DndTreeStateProvider } = createUsableContext<State>(`DndTreeState`);

  const FakeBeginningDroppable = observer(function FakeBeginningDroppable() {
    const {
      setNodeRef: setNodeRefDown,
      active: activeDown,
      isOver: isOverDown,
    } = useDroppable({ id: preDroppableId });

    return (
      <>
        <Box
          pos={`absolute`}
          ref={setNodeRefDown}
          style={{
            top: `-50%`,
            height: `100%`,
            left: 0,
            width: `100%`,
            pointerEvents: `none`,
            // border: `1px solid #f00`,
          }}
        >
          {methods.dropLine({ ml: mlStep, isTop: true, visible: !!activeDown && isOverDown })}
        </Box>
      </>
    );
  });

  const ProvideDndTreeState = observer<
    PropsWithChildren<{
      store: State;
    }>
  >(function ProvideDndTreeState({ store, children }) {
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 4 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const dndCtxProps = useMemo(
      () => ({
        onDragStart: (e: DragStartEvent) => {
          store.setDraggingId(e.active.id as string);
        },
        onDragEnd: (_e: DragEndEvent) => {
          store.onDragEnd();
          store.setDraggingId(null);
        },
        onDragCancel: () => {
          store.setDraggingId(null);
        },
      }),
      [store]
    );

    return (
      <DndTreeStateProvider value={store}>
        <DndContext sensors={sensors} collisionDetection={pointerWithin} {...dndCtxProps}>
          {children}

          <DragOverlay modifiers={[snapRightBoundToCursor]}>
            {store.draggingId != null && methods.dragging({ itemId: store.draggingId })}
          </DragOverlay>
        </DndContext>
      </DndTreeStateProvider>
    );
  });

  const InnerContent = observer<{
    item: Item;
    path: readonly string[];
  }>(function InnerContent({ item, path }) {
    const store = useDndTreeState();

    const { attributes, listeners, setNodeRef, transform, over, active } = useDraggable({ id: item.id });

    const style: CSSProperties = {
      transform: transform
        ? CSS.Transform.toString({ /*...transform,*/ x: 0, y: 0, scaleX: 1, scaleY: 1 })
        : undefined,
      touchAction: 'none',
    };

    useLayoutEffect(() => {
      const { picked } = store.pickDropPoint(over, active, path, item);
      if (picked) {
        store.setDropPoint(picked);
      }
    }, [over?.id, active?.id, active?.rect.current, path, store, item]);

    const mouseDownPos = useRef<{ x: number; y: number } | null>(null);
    const isDrag = useRef(false);

    const mouseHandlers = useMemo(
      () => ({
        onMouseDown: (e: MouseEvent) => {
          mouseDownPos.current = { x: e.clientX, y: e.clientY };
          isDrag.current = false;
        },
        onMouseMove: (e: MouseEvent) => {
          if (!mouseDownPos.current) {
            return;
          }
          if (
            Math.abs(e.clientX - mouseDownPos.current.x) > 3 ||
            Math.abs(e.clientY - mouseDownPos.current.y) > 3
          ) {
            isDrag.current = true;
          }
        },
      }),
      [isDrag, mouseDownPos]
    );

    return (
      <>
        <Flex direction="column" pos="relative">
          {methods.renderItem(
            {
              ref: setNodeRef,
              style,
              ...attributes,
              ...listeners,
              ...mouseHandlers,
            },
            item,
            { isDrag }
          )}
        </Flex>
      </>
    );
  });

  const TreeNodeChildren = observer<{
    ownerID: string;
    path: readonly string[] | null;
    sortedItems?: readonly Item[];
    ml: number;
  }>(function TreeNodeChildren({ sortedItems, ownerID, path, ml }) {
    const subPath = useMemo(() => (path ? [...path, ownerID] : []), [path, ownerID]);
    return sortedItems?.length ? (
      <>
        {sortedItems.map((i, index) => (
          <TreeNode key={i.id} item={i} path={subPath} ml={ml} index={index} />
        ))}
      </>
    ) : null;
  });

  const TreeNode = observer<{
    path: readonly string[];
    item: Item;
    ml: number;
    index: number;
  }>(function TreeNode({ item, path, ml, index }) {
    const store = useDndTreeState();

    const sortedItems = useMemo(
      () => computed(() => store.getSortedChildrenOfId(item.id)),
      [store, item]
    ).get();

    const opened = useMemo(() => computed(() => store.isExpanded(item.id)), [store, item]).get();

    const {
      setNodeRef: setNodeRefDown,
      active: activeDown,
      isOver: isOverDown,
    } = useDroppable({ id: item.id });

    return (
      <>
        <Flex pos={`relative`} ml={ml} align="center">
          {methods.expandButton({
            onClick: e => {
              e.preventDefault();
              store.setExpanded(item.id, !opened);
            },
            visible: !!sortedItems?.length,
            opened: opened,
          })}

          <Box
            pos={`absolute`}
            ref={setNodeRefDown}
            style={{
              top: `50%`,
              height: `100%`,
              left: 0,
              width: `100%`,
              pointerEvents: `none`,
              // border: `1px solid #00f`,
            }}
          />

          {index === 0 && path.length === 1 && <FakeBeginningDroppable />}

          <Flex pos={`relative`} direction={`column`} justify={`stretch`} flex={`1 1 auto`} p={5} miw={0}>
            <InnerContent item={item} path={path} />

            {methods.dropLine({
              ml: mlStep * Math.max(-path.length - 1, store.dropPoint?.levelDelta ?? 0),
              visible: !!activeDown && isOverDown && store.dropPoint != null,
            })}
          </Flex>
        </Flex>
        {opened && sortedItems?.length ? (
          <TreeNodeChildren sortedItems={sortedItems} path={path} ownerID={item.id} ml={ml + mlStep} />
        ) : null}
      </>
    );
  });

  const RootLevel = observer(function RootLevel() {
    const store = useDndTreeState();
    return (
      <>
        {store.getSortedChildrenOfId(null).map((t, index) => (
          <TreeNode key={t.id} item={t} path={[t.id]} ml={0} index={index} />
        ))}
      </>
    );
  });

  return {
    ProvideDndTreeState,
    TreeNode,
    RootLevel,
    useDndTreeState,
  };
};
