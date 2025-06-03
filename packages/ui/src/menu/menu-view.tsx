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
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExSet, isTruthy, notNull } from '@freyja/kit';
import { ActionIcon, Box, Button, Flex, Loader, Paper } from '@mantine/core';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconCaretDown,
  IconCaretRight,
  IconTrash,
} from '@tabler/icons-react';
import { sortBy, sortedIndexBy } from 'lodash';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';

import { FloatingToolbar } from '../floating-toolbar';
import { manualSort } from '../manual-sort';
import { mantineCssVar } from '../util';
import { EditingItemModal } from './editing-item-modal';
import { Errors } from './errors';
import { SidePanel } from './side-panel';
import {
  DropPoint,
  InputMenuItem,
  MenuEditingStore,
  useEditingTreeContext,
} from './stores/menu-editing-store';
import { TreeAddIcon } from './tree-add-icon';

const dropPointsMaker = (editCtx: MenuEditingStore) => {
  const findNextRowAfterRecur = (depth: number, id: string): number => {
    const node = editCtx.menu.actualItem(id);
    const siblingsSorted = notNull(editCtx.menu.actualSortedChildrenOf(node.parentId ?? null));
    if (siblingsSorted.at(-1)?.orderKey !== node.orderKey) {
      //  node is not last child in parent
      return depth; // same depth
    }
    return node.parentId ? findNextRowAfterRecur(depth - 1, node.parentId) : depth;
  };

  const findNextRowAfter = (depth: number, id: string): number => {
    if (editCtx.treeState.isExpanded(id) && editCtx.menu.actualUnsortedChildrenOf(id)?.length) {
      return depth + 1;
    }
    return findNextRowAfterRecur(depth, id);
  };

  const canBeInserted = (item: InputMenuItem, parentId: string | null): boolean => {
    // return item.id !== parentId && item.parentId !== parentId;

    if (parentId) {
      // the item cannot be inserted into parentId if item.id is parentId or is one of the parents of parentId
      if (
        item.id === parentId ||
        editCtx.menu.findParentOfActualItem(editCtx.menu.actualItem(parentId), i => i.id === item.id)
      ) {
        return false;
      }
    }

    return true;
  };

  const pointToStr = (dp: DropPoint) => ({
    ...dp,
    after: dp.after ? `[${editCtx.menu.maybeActualItem(dp.after)?.title || '---'}]` : null,
    inside: dp.inside ? `[${editCtx.menu.maybeActualItem(dp.inside)?.title || '---'}]` : null,
  });

  const getAvailableDropPoints = (overId: string, item: InputMenuItem) => {
    console.log(`over`, overId);

    const path: string[] = [];
    {
      let node = editCtx.menu.maybeActualItem(overId);
      while (node) {
        node = (node.parentId && editCtx.menu.actualItem(node.parentId)) || undefined;
        if (node) {
          path.push(node.id);
        }
      }
    }
    const currRowLevel = path.length;
    const nextRowLevel = findNextRowAfter(currRowLevel, overId);
    console.log(currRowLevel, nextRowLevel);
    const delta = nextRowLevel - currRowLevel;
    console.log(`delta =`, delta, ` after ${path.join(' -> ')} -> ${overId}`);

    const levels: DropPoint[] = [];

    if (delta < 0) {
      let p: string | undefined | null = editCtx.menu.actualItem(overId).parentId;

      const upperLevels: DropPoint[] = [];
      for (let i = -1; i >= delta - 1; i--) {
        const node: InputMenuItem | undefined = p ? editCtx.menu.actualItem(p) : undefined;
        if (node) {
          upperLevels.push({ levelDelta: i, after: node.id, inside: node.parentId ?? null });
        }
        p = node?.parentId;
      }
      console.log(`upper`, ...upperLevels.map(pointToStr));
      levels.push(...upperLevels);
    }

    if (delta <= 0) {
      const nearLevel: DropPoint = { levelDelta: 0, after: overId, inside: path.at(-1) ?? null };
      levels.push(nearLevel);
      console.log(`near`, pointToStr(nearLevel));
    }
    // if (delta >= 0)
    {
      const deeperLevel: DropPoint = { levelDelta: 1, after: null, inside: overId };
      levels.push(deeperLevel);
      console.log(`deeper`, pointToStr(deeperLevel));
    }
    // console.log(`levels:`, ...levels);
    console.log(`----`);
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

  return { getAvailableDropPoints };
};

const pickDropPoint = (
  path: readonly string[],
  { min, max, points }: Readonly<{ points: readonly DropPoint[]; min: number; max: number }>,
  levelShift: number
) => {
  for (let ls = Math.min(max, Math.max(min, levelShift)), els = ls + path.length + 1; ls < els; ++ls) {
    // console.log(`ls`, levelShift, min, max, ls);
    const q = points.find(i => i.levelDelta === ls);
    if (q) {
      return q;
    }
  }
  return null;
};

const detectLevelShift = (over: Over | null, active: Active | null) =>
  over && active
    ? Math.floor(
        ((active.rect.current.translated?.left ?? 0) - (active.rect.current.initial?.left ?? 0)) / 24
      )
    : null;

const onDragEnd = (changesCtx: MenuEditingStore, activeId: string, dropPoint: DropPoint) => {
  const srcNode = changesCtx.menu.actualItem(activeId);
  const srcParent = (srcNode.parentId && changesCtx.menu.actualItem(srcNode.parentId)) || null;
  const srcChildren = changesCtx.menu.actualSortedChildrenOf(srcParent?.id ?? null) || [];
  const srcIndex = sortedIndexBy(srcChildren, srcNode, i => i.orderKey);
  if (srcIndex < 0) {
    throw new Error(`srcNode not found in srcParent`);
  }
  const srcAfter = srcChildren[srcIndex - 1]?.id ?? null;

  const dstParent =
    dropPoint.inside === srcNode.parentId
      ? srcParent
      : dropPoint.inside
        ? changesCtx.menu.actualItem(dropPoint.inside)
        : null;
  const dstChildren =
    dstParent === srcParent
      ? srcChildren
      : changesCtx.menu.actualSortedChildrenOf(dstParent?.id ?? null) || [];
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
        changesCtx.menu.actualItem(dstAfter).orderKey,
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

  const changes = [change1, ...change2];

  console.log(`drag end`, ...changes);

  for (const { id, ...c } of changes) {
    changesCtx.menu.updateItem(id as string, c);
  }
};

const TreeItemPaper = observer<{
  path: readonly string[];
  item: InputMenuItem;
}>(function TreeItemPaper({ item, path }) {
  const editCtx = useEditingTreeContext();
  const { treeState } = editCtx;

  const { attributes, listeners, setNodeRef, transform, over, active } = useDraggable({ id: item.id });

  const style = {
    transform: transform
      ? CSS.Transform.toString({ /*...transform,*/ x: 0, y: 0, scaleX: 1, scaleY: 1 })
      : undefined,
    touchAction: 'none',
  };

  const dropPoints = useMemo(
    () =>
      over && active?.id === item.id
        ? dropPointsMaker(editCtx).getAvailableDropPoints(over.id as string, item)
        : null,
    [over?.id, active, item, editCtx]
  );

  const levelShift = useMemo(
    () => (dropPoints ? detectLevelShift(over, active) : null),
    [dropPoints, over, active?.rect.current]
  );

  const pickedDropPoint = useMemo(
    () =>
      dropPoints ? (levelShift != null ? pickDropPoint(path, dropPoints, levelShift) : null) : undefined,
    [dropPoints, levelShift, path]
  );

  useEffect(
    () => void (pickedDropPoint !== undefined && editCtx.treeState.setDropPoint(pickedDropPoint)),
    [editCtx, pickedDropPoint]
  );

  return (
    <Paper
      withBorder
      flex="1 0 auto"
      p={10}
      pos="relative"
      onClick={e => !e.defaultPrevented && treeState.setEditing(item)}
      // draggable props:
      ref={setNodeRef}
      style={{ touchAction: 'none' }}
    >
      <Flex direction="row" gap={10}>
        <Box flex="1 0 auto">
          <Box>{item.title}</Box>
          <Box fs="italic">{item.description || <Box opacity={0.5}>{`<empty>`}</Box>}</Box>
        </Box>
        <Box>{item.price || `-`}</Box>
        <Flex pos="absolute" right={0} bottom={0} gap={5} p={5} style={{ zIndex: 10 }}>
          <ActionIcon onClick={e => (e.preventDefault(), treeState.setEditingNewFirstInParent(item.id))}>
            <TreeAddIcon sub />
          </ActionIcon>
          <ActionIcon
            onClick={e => (
              e.preventDefault(),
              treeState.setEditingNewInParentAfterKey(item.parentId ?? null, item.orderKey)
            )}
          >
            <TreeAddIcon sub={false} />
          </ActionIcon>
          <ActionIcon onClick={e => e.preventDefault()} color="red.8">
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Flex>

      <Flex
        pos={`absolute`}
        // drag handle props:
        style={!active ? { left: 0, top: 0, bottom: 0, right: 0, ...style } : { ...style }}
        {...attributes}
        {...listeners}
      />
    </Paper>
  );
});

const MenuTreeNodeChildren = observer<{
  ownerID: string;
  path: readonly string[] | null;
  sortedItems?: readonly InputMenuItem[];
  ml: number;
}>(function MenuTreeNodeChildren({ sortedItems, ownerID, path, ml }) {
  const subPath = useMemo(() => (path ? [...path, ownerID] : []), [path, ownerID]);
  return sortedItems?.length ? (
    <>
      {sortedItems.map(i => (
        <MenuTreeNode key={i.id} item={i} path={subPath} ml={ml} />
      ))}
    </>
  ) : null;
});

const DropLine = observer<{
  ml: number;
}>(function DropLine({ ml }) {
  return (
    <Box
      pos="absolute"
      bg={`blue.6`}
      h={3}
      ml={ml}
      left={5}
      bottom={-4}
      right={5}
      style={{ borderRadius: `3px`, zIndex: 1000 }}
    >
      <Box
        pos="absolute"
        left={-2}
        top={`50%`}
        w={8}
        h={8}
        style={{
          borderRadius: `50%`,
          border: `2px solid ${mantineCssVar(`blue`, 6)}`,
          background: `#fff`,
          transform: `translateY(-50%)`,
        }}
      />
    </Box>
  );
});

const MenuTreeNode = observer<{
  path: readonly string[];
  item: InputMenuItem;
  ml: number;
}>(function MenuTreeNode({ item, path, ml }) {
  const editCtx = useEditingTreeContext();
  const { treeState } = editCtx;

  /// TODO is possible to use not sorted there
  const sortedItems = useMemo(
    () => computed(() => editCtx.menu.actualSortedChildrenOf(item.id)),
    [editCtx, item]
  ).get();

  const opened = useMemo(() => computed(() => treeState.isExpanded(item.id)), [treeState, item]).get();

  const {
    setNodeRef: setNodeRefDown,
    active: activeDown,
    isOver: isOverDown,
  } = useDroppable({ id: item.id });

  return (
    <>
      <Flex pos={`relative`} ml={ml}>
        <Box px={4} py={16}>
          <ActionIcon
            onClick={e => (e.preventDefault(), treeState.setExpanded(item.id, !opened))}
            size={`sm`}
            variant={`light`}
            style={{
              opacity: sortedItems?.length ? 1 : 0,
              pointerEvents: sortedItems?.length ? undefined : `none`,
            }}
          >
            {opened ? <IconCaretDown /> : <IconCaretRight />}
          </ActionIcon>
        </Box>

        <Box
          pos={`absolute`}
          ref={setNodeRefDown}
          style={{ top: `50%`, height: `100%`, left: 0, width: `100%` }}
        />

        <Flex pos={`relative`} direction={`column`} justify={`stretch`} flex={`1 0 auto`} p={5}>
          <TreeItemPaper item={item} path={path} />

          {activeDown && isOverDown && treeState.dropPoint != null && (
            <DropLine ml={20 * Math.max(-path.length, treeState.dropPoint.levelDelta)} />
          )}
        </Flex>
      </Flex>
      {opened && sortedItems?.length ? (
        <MenuTreeNodeChildren sortedItems={sortedItems} path={path} ownerID={item.id} ml={ml + 20} />
      ) : null}
    </>
  );
});

const TreeToolbar = observer<{
  expandAll: () => void;
  collapseAll: () => void;
  selecting: boolean;
  setSelecting: (selecting: boolean) => void;
}>(function TreeToolbar({ expandAll, collapseAll, selecting, setSelecting }) {
  return (
    <Flex direction="row" gap={16} align={`center`}>
      <Flex flex="1 0 auto">
        {selecting ? (
          <Button onClick={() => setSelecting(false)}>Reset selection</Button>
        ) : (
          <Button onClick={() => setSelecting(true)}>Select</Button>
        )}
      </Flex>
      <ActionIcon onClick={() => expandAll()} size={`lg`}>
        <IconArrowsMaximize />
      </ActionIcon>
      <ActionIcon onClick={() => collapseAll()} size={`lg`}>
        <IconArrowsMinimize />
      </ActionIcon>
    </Flex>
  );
});

const MenuTree = observer(function MenuTree() {
  const editCtx = useEditingTreeContext();

  return (
    <Flex direction="column" gap={16} p={16}>
      <TreeToolbar
        expandAll={() =>
          editCtx.treeState.resetExpanded(
            new ExSet(Array.from(editCtx.menu.actualTree?.parentsKeys || []).filter(isTruthy))
          )
        }
        collapseAll={() => editCtx.treeState.resetExpanded(new Set())}
        selecting={false}
        setSelecting={() => undefined}
      />
      {editCtx.menu.actualTree && (
        <Flex direction="column">
          <MenuTreeNodeChildren
            sortedItems={editCtx.menu.actualTree.roots}
            path={null}
            ownerID={`###root`}
            ml={0}
          />
        </Flex>
      )}
    </Flex>
  );
});

const EditingFloatingPanel = observer(function EditingFloatingPanel() {
  const editCtx = useEditingTreeContext();
  return (
    <FloatingToolbar visible={!!editCtx.menu.changesCount}>
      <Flex align={`center`} gap={16}>
        <Box>You have {editCtx.menu.changesCount} changed items</Box>
        <>
          <Button
            onClick={() => editCtx.menu.save()}
            loading={editCtx.menu.saving}
            disabled={editCtx.menu.saving}
          >
            Save
          </Button>
          <Button variant={'outline'} color={`red`} disabled={editCtx.menu.saving}>
            Discard
          </Button>
        </>
      </Flex>
    </FloatingToolbar>
  );
});

const DraggingItem = observer<{
  itemId: string;
}>(function DraggingItem({ itemId }) {
  const ctx = useEditingTreeContext();

  const item = useMemo(() => ctx.menu.actualItem(itemId), [ctx, itemId]);
  return (
    <Box bg={`#a77`} w={`200px`} opacity={0.5} style={{ transform: `rotate(-2deg)` }}>
      {item.title}
    </Box>
  );
});

export const MenuView = observer(function MenuView() {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const changesCtx = useEditingTreeContext();

  const dndCtxProps = useMemo(
    () => ({
      onDragStart: (e: DragStartEvent) => {
        changesCtx.treeState.setDraggingId(e.active.id as string);
      },
      onDragEnd: (e: DragEndEvent) => {
        const { dropPoint } = changesCtx.treeState;
        if (!dropPoint) {
          console.warn(`no drop point`);
          return;
        }
        onDragEnd(changesCtx, e.active.id as string, dropPoint);
        changesCtx.treeState.setDraggingId(null);
      },
    }),
    [changesCtx]
  );

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin} {...dndCtxProps}>
      <Flex direction="row" h="100vh">
        <SidePanel />
        <Flex flex="1 0 auto" direction="column">
          {/*<Button onClick={() => changesCtx.menuRequest.invalidate()}>Refetch</Button>*/}

          {changesCtx.menu.menuRequest.loading ? (
            <Loader />
          ) : changesCtx.menu.menuRequest.result?.errors ? (
            <Errors errors={changesCtx.menu.menuRequest.result.errors} />
          ) : changesCtx.menu.menuRequest.result?.data ? (
            <Flex gap={16} direction="column">
              {/*<MenuSelector />*/}
              <MenuTree />
            </Flex>
          ) : null}
        </Flex>
      </Flex>

      <EditingFloatingPanel />
      <EditingItemModal />

      <DragOverlay modifiers={[snapCenterToCursor]}>
        {changesCtx.treeState.draggingId != null && <DraggingItem itemId={changesCtx.treeState.draggingId} />}
      </DragOverlay>
    </DndContext>
  );
});
