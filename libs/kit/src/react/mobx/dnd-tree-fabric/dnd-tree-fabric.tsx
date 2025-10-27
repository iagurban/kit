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
import { clsx } from 'clsx';
import { sortBy, sortedIndexBy } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import {
  CSSProperties,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { ExSet } from '../../../collections/ex-set';
import { ManualSortingAlphabet } from '../../../core/manual-sorting';
import { notNull } from '../../../utils/flow/flow-utils';
import { clamp } from '../../../utils/numeric-utils';
import { createUsableContext } from '../../react';
import { ObservableExSet } from '../observable-ex-set';
import classNames from './dnd-tree.module.scss';

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
  // console.log(`levelShift`, levelShift, `min`, min, `max`, max, `path`, path, `points`, points);
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

export type DropPoint = {
  levelDelta: number;
  inside: string | null;
  after: string | null;
  parents: Set<string>;
};

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

  getPath(id: string) {
    const path: string[] = [id];
    let node = this.getById(id);
    while (node) {
      node = (node.parentId && notNull(this.getById(node.parentId))) || null;
      if (node) {
        path.unshift(node.id);
      }
    }
    return path;
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

    if (overId === preDroppableId) {
      return {
        points: [{ after: null, inside: null, levelDelta: 0, parents: new Set<string>() }],
        min: 0,
        max: 0,
      };
    }

    const path = this.getPath(overId);

    // console.log(`path`, path);
    const currRowLevel = path.length;
    const nextRowLevel = findNextRowAfter(currRowLevel, overId);
    // console.log(`currRowLevel, nextRowLevel`, currRowLevel, nextRowLevel);

    const delta = nextRowLevel - currRowLevel;
    // id dela <= 0, overId is not expanded

    // console.log(`delta =`, delta, ` after ${path.join(' -> ')} -> ${overId}`);

    const levels: DropPoint[] = [];

    if (delta < 0) {
      let p = notNull(getById(overId)).parentId;

      const upperLevels: DropPoint[] = [];
      for (let i = -1; p && i >= delta; i--) {
        const node = notNull(getById(p));
        upperLevels.push({
          levelDelta: i,
          after: node.id,
          inside: node.parentId ?? null,
          parents: new Set(path.slice(0, i - 1)),
        });

        p = node.parentId;
      }
      // console.log(`upper`, ...upperLevels);
      levels.push(...upperLevels);
    }

    if (delta <= 0) {
      // same level as overId, next after it
      const nearLevel: DropPoint = {
        levelDelta: 0,
        after: overId,
        inside: path.at(0) ?? null,
        parents: new Set(path.slice(0, -1)),
      };
      levels.push(nearLevel);
      // console.log(`near`, nearLevel);
    }

    {
      // first inside overId
      const deeperLevel: DropPoint = {
        levelDelta: 1,
        after: null,
        inside: overId,
        parents: new Set(path),
      };
      levels.push(deeperLevel);
      // console.log(`deeper`, deeperLevel);
    }
    // console.log(`levels:`, ...levels);
    // console.log(`----`);
    const sortedPoints = sortBy(
      levels.filter(l => canBeInserted(item, l.inside)),
      l => l.levelDelta
    );
    // console.log(`sortedPoints`, sortedPoints);
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
    this.setDropPoint(null);

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
    // console.log(`setDropPoint`, point);
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

  @action
  expandRecursively(id: string, prevIds = new ExSet<string>()) {
    const { getSortedChildrenOfId } = this;
    const children = getSortedChildrenOfId(id);
    if (prevIds.has(id)) {
      // real recursion
      return;
    }
    prevIds = prevIds.or([id]);
    if (children) {
      this.setExpanded(id, true);
      for (const child of children) {
        this.expandRecursively(child.id, prevIds);
      }
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
      onClick: (e: MouseEvent<HTMLElement>) => void;
      visible: boolean;
      opened: boolean;
    }) => ReactNode;
    dragging: (props: { itemId: string }) => ReactNode;
    dropLine: (props: {
      ml: number | string;
      color?: string;
      isTop?: boolean;
      visible: boolean;
    }) => ReactNode;
  },
  {
    mlStep,
    offsetWidth,
    getDropBoxProps,
    getDroppingParentProps,
  }: {
    mlStep: number;
    offsetWidth: (depth: number) => number | string;
    getDropBoxProps?: (isTop: boolean) => BoxProps;
    getDroppingParentProps?: (visible: boolean) => BoxProps;
  }
) => {
  const { use: useDndTreeState, provider: DndTreeStateProvider } = createUsableContext<State>(`DndTreeState`);

  const FakeBeginningDroppable = observer(function FakeBeginningDroppable() {
    const {
      setNodeRef: setNodeRefDown,
      active: activeDown,
      isOver: isOverDown,
    } = useDroppable({ id: preDroppableId });

    const dropBoxProps = getDropBoxProps?.(true);

    return (
      <>
        <Box
          ref={setNodeRefDown}
          {...dropBoxProps}
          className={clsx(classNames.topDropBox, dropBoxProps?.className)}
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

  const DragParentCover = observer<{
    item: Item;
  }>(function DragParentCover({ item }) {
    const store = useDndTreeState();
    const visible = useMemo(() => computed(() => store.dropPoint?.parents.has(item.id)), [item, store]);

    const props = (
      getDroppingParentProps || (visible => ({ className: undefined, style: { opacity: visible ? 0.2 : 0 } }))
    )(visible.get() || false);

    return <Box {...props} className={clsx(classNames.droppingParent, props.className)} />;
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
    }, [over?.id, active?.id, active?.rect.current.translated, path, store, item]);

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
        <DragParentCover item={item} />
      </>
    );
  });

  const TreeNodeChildren = observer<{
    ownerID: string;
    path: readonly string[] | null;
    sortedItems?: readonly Item[];
  }>(function TreeNodeChildren({ sortedItems, ownerID, path }) {
    const subPath = useMemo(() => (path ? [...path, ownerID] : []), [path, ownerID]);
    return sortedItems?.length ? (
      <>
        {sortedItems.map((i, index) => (
          <TreeNode key={i.id} item={i} path={subPath} index={index} />
        ))}
      </>
    ) : null;
  });

  const TreeNode = observer<{
    path: readonly string[];
    item: Item;
    index: number;
  }>(function TreeNode({ item, path, index }) {
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

    const ow = useMemo(() => offsetWidth(path.length - 1), [path]);

    const dropBoxProps = getDropBoxProps?.(false);

    const expand = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      if (e.ctrlKey) {
        store.expandRecursively(item.id);
      } else {
        store.setExpanded(item.id, !opened);
      }
    };

    return (
      <>
        <Flex pos={`relative`} align="center">
          <Box
            ref={setNodeRefDown}
            {...dropBoxProps}
            className={clsx(classNames.dropBox, dropBoxProps?.className)}
          />
          <Flex
            w={ow}
            maw={ow}
            miw={ow}
            h="100%"
            justify="end"
            onClick={expand}
            style={sortedItems?.length ? { cursor: `pointer` } : {}}
          />
          <Flex pos={`relative`} flex="1 0 0" miw={0} align="center">
            {methods.expandButton({ onClick: expand, visible: !!sortedItems?.length, opened: opened })}
            {index === 0 && path.length === 1 && <FakeBeginningDroppable />}

            <Flex pos={`relative`} direction={`column`} justify={`stretch`} flex={`1 1 auto`} p={5} miw={0}>
              <InnerContent item={item} path={path} />
            </Flex>

            {methods.dropLine({
              ml: offsetWidth((store.dropPoint?.levelDelta ?? 0) + 1),
              visible: !!activeDown && isOverDown && store.dropPoint != null,
            })}
          </Flex>
        </Flex>
        {opened && sortedItems?.length ? (
          <TreeNodeChildren sortedItems={sortedItems} path={path} ownerID={item.id} />
        ) : null}
      </>
    );
  });

  const RootLevel = observer(function RootLevel() {
    const store = useDndTreeState();

    return (
      <>
        {store.getSortedChildrenOfId(null).map((t, index) => (
          <TreeNode key={t.id} item={t} path={[t.id]} index={index} />
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
