import { uidGenerator } from '@freyja/kit/core/uid-generator';
import { Box, Tooltip } from '@mantine/core';
import { hsl } from 'chroma.ts';
import { observer } from 'mobx-react-lite';
import { CSSProperties, useMemo } from 'react';

import { gainHue, gainPointColor } from '../const';
import { distance00to11 } from '../utils/geometry';
import { observerWithForwardRef } from '../utils/mobx-util';
import { useAnimationConfig } from '../utils/react-contexts';

const Ratio2DGraphSvg = observer(function Ratio2DGraphSvg() {
  const maskId = useMemo(() => `Ratio2DGraph_${uidGenerator()}`, []);

  const circle = (r: number) => (
    <circle
      cx="0"
      cy="100"
      r={Math.floor(distance00to11 * r * 100)}
      fill="none"
      stroke={hsl(gainHue(r), 0.5, 0.5).hex()}
      strokeWidth="1"
      strokeDasharray="2 6"
      mask={`url(#${maskId})`}
    />
  );

  return (
    <svg style={{ overflow: `visible` }} viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
      <mask id={maskId}>
        <rect x="0" y="0" width="100" height="100" fill="white" />
      </mask>
      {circle(0.25)}
      {circle(0.5)}
      {circle(0.75)}
      <path
        d={`M0,100 L0,0 L-4,10 M0,0 L4,10 M0,100 L100,100 L90,96 M100,100 L90,104`}
        fill="none"
        stroke="#000"
        strokeWidth="1"
      />
    </svg>
  );
});

export const Ratio2DGraph = observerWithForwardRef<
  {
    xLabel: string;
    x: number;
    yLabel: string;
    y: number;
    gain: number;
    onClick: () => void;
  },
  HTMLDivElement
>(function Ratio2DGraph({ xLabel, x, yLabel, y, onClick, gain }, forwardedRef) {
  const axisLabelStyle = { fontSize: `0.7rem`, fontStyle: `italic` } satisfies CSSProperties;

  const { timeMs } = useAnimationConfig();

  return (
    <Box
      ref={forwardedRef}
      pos="relative"
      style={{ alignSelf: `stretch`, justifySelf: `stretch`, width: `5rem`, height: `5rem` }}
      onClick={onClick}
    >
      <Ratio2DGraphSvg />
      <Box pos="absolute" right="0.5rem" bottom={0} style={axisLabelStyle}>
        {xLabel}
      </Box>
      <Box
        pos="absolute"
        left="0.5rem"
        top="0.5rem"
        style={{
          ...axisLabelStyle,
          transform: `rotate(90deg) translateY(-100%) translateY(0.5rem)`,
          transformOrigin: `left top`,
        }}
      >
        {yLabel}
      </Box>
      <Tooltip
        label={
          <Box>
            gain: {Math.round(gain * 100)}%{' '}
            <Box
              display="inline-block"
              bg={hsl(gainHue(gain), 0.8, 0.4).hex()}
              w={`0.7rem`}
              h={`0.7rem`}
              style={{
                border: `1px solid #aaa`,
                borderRadius: `50%`,
              }}
            />
          </Box>
        }
      >
        <Box
          bg={gainPointColor(gain)}
          w={`0.9rem`}
          h={`0.9rem`}
          pos="absolute"
          left={`${x * 100}%`}
          bottom={`${y * 100}%`}
          style={{
            border: `1px solid #aaa`,
            transform: `translate(-50%,50%)`,
            borderRadius: `50%`,
            transition: `all ${timeMs}ms ease`,
          }}
        />
      </Tooltip>
    </Box>
  );
});
