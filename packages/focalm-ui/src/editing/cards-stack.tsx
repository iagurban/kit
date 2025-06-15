import { ExMap } from '@freyja/kit/collections/ex-map';
import { notNull } from '@freyja/kit/utils/flow-utils';
import { Flex, Overlay } from '@mantine/core';
import { debounce, sortBy } from 'lodash';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CSSProperties, useMemo, useState } from 'react';

import { useLocalPreferences } from '../local-preferences';
import { useStorage } from '../storage';
import { useAnimationConfig } from '../utils/react-contexts';
import { CardForm } from './card-form';

const CardsForms = observer(function CardsForms() {
  const storage = useStorage();

  const { stableSorted, indexes } = useMemo(
    () =>
      computed(() => ({
        stableSorted: sortBy(storage.tasks.opened, c => c.id),
        indexes: new ExMap(storage.tasks.opened.map((c, idx) => [c.id, idx])),
      })),
    []
  ).get();

  const [hoverId /* can be accidentally already removed from this stack */, setHoverId] = useState<string>();
  const setHoverIdDebounced = useMemo(() => debounce(setHoverId, 50), []);

  const maxLastShift = 10;
  const yShift = Math.min(maxLastShift / (stableSorted.length - 1), 2);
  const hoverIndex = hoverId ? indexes.get(hoverId) : undefined;
  return (
    <>
      {stableSorted.map(card => {
        const index = notNull(indexes.get(card.id));
        return (
          <CardForm
            key={card.id}
            card={card}
            isLast={!storage.tasks.cardsHidden && index >= stableSorted.length - 1}
            top={3 + index * yShift + (hoverIndex != null && index > hoverIndex ? 1 / yShift : 0)}
            onHover={enter => setHoverIdDebounced(enter ? card.id : undefined)}
          />
        );
      })}
    </>
  );
});

export const CardsStack = observer(function CardsStack() {
  const storage = useStorage();

  const [hover, setHover] = useState(false);

  const { timeMs } = useAnimationConfig();

  const preferences = useLocalPreferences();

  return storage.tasks.opened.length > 0 ? (
    <Overlay
      fixed
      styles={{
        root: {
          pointerEvents: `none`,
          // '--overlay-z-index': 500,
          transition: `all ease ${timeMs}ms ${timeMs}ms`,
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      blur={preferences.blur ? (!hover || storage.tasks.cardsHidden ? 0 : 5) : 0}
      zIndex={1}
      backgroundOpacity={storage.tasks.cardsHidden ? 0 : hover ? 0.7 : 0.2}
      style={{ '--overlay-z-index': 200 } as CSSProperties}
    >
      <Flex
        pos="fixed"
        // left="0"
        top="0"
        right="4rem"
        bottom="0"
        direction="column"
        align="end"
        w={600}
        style={{
          transformStyle: `preserve-3d`,
          perspective: 1200,
          transition: `transform ease ${timeMs}ms`,
          transform: storage.tasks.cardsHidden ? `translateX(calc(100% + 1rem))` : `translateX(0%)`,
        }}
      >
        <CardsForms />
      </Flex>
    </Overlay>
  ) : null;
});
