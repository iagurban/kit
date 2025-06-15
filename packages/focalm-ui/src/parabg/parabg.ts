import { isTruthy } from '@freyja/kit/asserts';
import { CSSProperties } from 'react';

export const parabgVars = (o: {
  timing?: CSSProperties[`animationTimingFunction`];
  duration?: number;
  fillMode?: CSSProperties[`animationFillMode`];
  direction?: CSSProperties[`animationDirection`];
}) =>
  Object.fromEntries(
    [
      o.timing !== undefined && ['--parabg-timing-function', o.timing],
      o.duration !== undefined && ['--parabg-duration', o.duration + `s`],
      o.fillMode !== undefined && ['--parabg-fill-mode', o.fillMode],
      o.direction !== undefined && ['--parabg-direction', o.direction],
    ].filter(isTruthy)
  ) as CSSProperties;
