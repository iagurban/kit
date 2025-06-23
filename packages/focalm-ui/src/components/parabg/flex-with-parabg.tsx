import { useResizeObserverWithCallback } from '@freyja/kit-ui/mobx/use-resize-observer';
import { Box, BoxProps, Flex, FlexProps } from '@mantine/core';
import clsx from 'clsx';
import { computed, makeAutoObservable, runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';

import { animations } from './animations';
import { backgrounds } from './backgrounds';
import { enhanceStepsEvenly, keyframesBuilder } from './keyframes-builder';
import classNames from './parabg.module.scss';

const ParabgInner = observer<{
  bgProps?: Omit<BoxProps, `style`>;
  bgSize: number;
  maxXRatio: number;
  maxYRatio: number;
  animationName: keyof typeof animations;
  backgroundName: keyof typeof backgrounds;
}>(function ParabgInner({ bgProps, bgSize, backgroundName, animationName, maxXRatio, maxYRatio }) {
  const keyframes = useMemo(
    () =>
      computed(() =>
        keyframesBuilder.inject(`parabg`, enhanceStepsEvenly(animations[animationName](maxXRatio, maxYRatio)))
      ),
    [animationName, maxXRatio, maxYRatio]
  );

  return (
    <Box
      {...bgProps}
      className={clsx(bgProps?.className, classNames.parabgBackgroundView)}
      style={{
        animationName: keyframes.get().get(),
        width: bgSize,
        height: bgSize,
        background: backgrounds[backgroundName],
      }}
    />
  );
});

const useParabg = (rect: { width: number; height: number }, scale: number) => {
  const bgSize = Math.max(rect.width, rect.height) * scale;

  const corner = Math.hypot(rect.width, rect.height) / 2;
  const doubleBgSize = bgSize * 2;
  const trimmedBgSize = bgSize - corner;
  const maxXRatio = (trimmedBgSize - rect.width) / doubleBgSize;
  const maxYRatio = (trimmedBgSize - rect.height) / doubleBgSize;

  return { bgSize, maxXRatio, maxYRatio };
};

export const FlexWithParabg = observer<
  FlexProps & {
    bgProps?: Omit<BoxProps, `style`>;
    backgroundName: keyof typeof backgrounds;
    animationName: keyof typeof animations;
    scale?: number;
  }
>(function FlexWithParabg({ children, bgProps, backgroundName, animationName, scale = 4, ...props }) {
  // const [ref, rect] = useResizeObserver();

  const rect = useMemo(
    () =>
      makeAutoObservable({
        width: 0,
        height: 0,
        scale: 1,
        get parabg() {
          return useParabg(this, this.scale);
        },
      }),
    []
  );
  useEffect(() => {
    runInAction(() => {
      rect.scale = scale;
    });
  }, [rect, scale]);
  const { ref } = useResizeObserverWithCallback(
    e => {
      runInAction(() => {
        rect.width = e.borderBoxSize[0].inlineSize;
        rect.height = e.borderBoxSize[0].blockSize;
      });
    },
    [rect]
  );

  return (
    <Flex {...props} ref={ref}>
      <ParabgInner
        {...rect.parabg}
        bgProps={bgProps}
        backgroundName={backgroundName}
        animationName={animationName}
      />
      {children}
    </Flex>
  );
});
