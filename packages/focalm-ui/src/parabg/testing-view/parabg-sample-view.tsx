import { Box, Flex } from '@mantine/core';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { computedFn } from 'mobx-utils';
import { useMemo } from 'react';

import { animationCreators } from '../animations';
import { backgrounds } from '../backgrounds';
import { keyframesBuilder } from '../keyframes-builder';
import classNames from '../parabg.module.scss';

export const getParabgKeyframes = computedFn((type: keyof typeof animationCreators, scale: number) => {
  const maxShift = (1 - 1 / scale) / 2;
  return keyframesBuilder.inject(`my`, animationCreators[type](maxShift));
});

export const ParabgSampleView = observer<{
  backgroundName: keyof typeof backgrounds;
  animationName: keyof typeof animationCreators;
  innerSize0to1: number;
  clip: boolean;
  scale: number;
}>(function ParabgSampleView({ animationName, backgroundName, innerSize0to1, clip, scale }) {
  const keyframes = useMemo(() => computed(() => getParabgKeyframes(`rectJumpy`, scale)), [scale]);

  return (
    <Flex className={classNames.sampleView}>
      {/*<Box*/}
      {/*  className={clsx(classNames.sampleViewInner, animationClass, backgroundClass)}*/}
      {/*  style={{*/}
      {/*    overflow: clip ? `hidden` : `visible`,*/}
      {/*    width: `${innerSize0to1 * 100}%`,*/}
      {/*    height: `${innerSize0to1 * 100}%`,*/}
      {/*  }}*/}
      {/*/>*/}

      <Box
        className={classNames.parabgBackgroundViewRoot}
        style={{
          width: `${innerSize0to1 * 100}%`,
          height: `${innerSize0to1 * 100}%`,
          border: `1px solid #f0f`,
          position: `relative`,
        }}
      >
        <Box
          style={{
            position: `absolute`,
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            border: `1px solid #0ff`,
            top: '50%',
            left: '50%',
            background: backgrounds.calm,
            transformOrigin: `center center`,
            animationName: keyframes.get().get(),
            animationDuration: `var(--parabg-duration)`,
            animationIterationCount: `infinite`,
            animationTimingFunction: `var(--parabg-timing-function)`,
            animationFillMode: `var(--parabg-fill-mode)`,
            animationDirection: `var(--parabg-direction)`,
          }}
        />
      </Box>
    </Flex>
  );
});
