import { Box, FlexProps } from '@mantine/core';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { computedFn } from 'mobx-utils';
import { CSSProperties, PropsWithChildren, useMemo } from 'react';

import { uidGenerator } from '../../../core/uid-generator';
import { enhanceStepsEvenly, KeyframesBuilder } from '../../keyframes-builder';

const bgMovingKeyframesBuilder = new KeyframesBuilder();

export interface RotatingGradientBackgroundProps {
  /** коэффициент масштабирования SVG */
  scale: number;

  gradientStops: readonly {
    offset: number;
    color: string;
  }[];

  rotateKeyframes: {
    values: string;
    keyTimes: string;
  };

  /** Длительность SVG-вращения, например "5s" */
  rotateDur: string;

  moveAnimation?: readonly CSSProperties[];

  /** Длительность фоновой анимации */
  moveDur: string;
}

const getMoveAnimationName = computedFn((moveAnimation: readonly CSSProperties[]) =>
  bgMovingKeyframesBuilder.inject(`svgMove`, enhanceStepsEvenly(moveAnimation))
);

const toBase64 =
  typeof window !== 'undefined' ? window.btoa : (s: string) => Buffer.from(s).toString('base64');

const dataUriEncode = (s: string) => `url("data:image/svg+xml;base64,${toBase64(s)}")`;

export const AnimatedSVGGradientBackground = observer<
  PropsWithChildren<
    RotatingGradientBackgroundProps & { style?: CSSProperties; className?: string } & Pick<FlexProps, `pos`>
  >
>(function AnimatedSVGGradientBackground({
  scale,
  gradientStops,
  rotateKeyframes,
  rotateDur,
  moveAnimation,
  moveDur,
  style,
  pos,
  className,
  children,
}) {
  const uid = useMemo(() => uidGenerator(), []);

  // Формируем SVG stop-элементы
  const stopTags = useMemo(
    () =>
      gradientStops
        .map(({ offset, color }) => `<stop offset="${(offset * 100).toFixed(2)}%" stop-color="${color}"/>`)
        .join(''),
    [gradientStops]
  );

  const dataUri = useMemo(
    () =>
      dataUriEncode(
        `<?xml version="1.0" encoding="UTF-8"?>` +
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none">` +
          `<defs><linearGradient id="${uid}-rotGrad" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">` +
          `${stopTags}` +
          `<animateTransform attributeName="gradientTransform" type="rotate" values="${rotateKeyframes.values}" keyTimes="${rotateKeyframes.keyTimes}" dur="${rotateDur}" repeatCount="indefinite"/>` +
          `</linearGradient></defs>` +
          `<rect x="0" y="0" width="1" height="1" fill="url(#${uid}-rotGrad)"/>` +
          `</svg>`
      ),
    [stopTags, rotateKeyframes, rotateDur]
  );

  // Генерация CSS keyframes для фоновой анимации
  const moveKeyframes = useMemo(
    () => computed(() => (moveAnimation ? getMoveAnimationName(moveAnimation) : undefined)),
    [moveAnimation, getMoveAnimationName]
  );

  return (
    <Box
      pos={pos}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: dataUri,
        backgroundSize: `${scale * 100}% ${scale * 100}%`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        animationName: moveKeyframes.get()?.get(),
        animationDuration: moveDur,
        animationDirection: `alternate`,
        animationIterationCount: `infinite`,

        ...style,
      }}
      className={className}
    >
      {children}
    </Box>
  );
});
