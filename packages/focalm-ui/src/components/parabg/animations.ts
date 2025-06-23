import { CSSProperties } from 'react';

import { enhanceStepsEvenly } from './keyframes-builder';

type CreateParabgAnimation = (maxXRatio: number, maxYRatio: number) => readonly CSSProperties[];

export const animations = (() => {
  const tt = (maxXRatio: number, maxYRatio: number) => (tx01: number, ty01: number, rotate?: string) =>
    `translate(-50%,-50%) ${rotate ? `rotate(${rotate}) ` : ``}translate(${tx01 * maxXRatio * 100}%,${ty01 * maxYRatio * 100}%)`;

  return {
    rect0: (maxXRatio, maxYRatio) => {
      const t = tt(maxXRatio, maxYRatio);
      return [
        { transform: t(0, 0) },
        { transform: t(1, 1, `10deg`) },
        { transform: t(-1, 1, `-10deg`) },
        { transform: t(-1, -1, `10deg`) },
        { transform: t(1, -1, `-10deg`) },
        { transform: t(0, 0) },
      ];
    },
    wild: (maxXRatio, maxYRatio) => {
      const t = tt(maxXRatio, maxYRatio);
      return [
        { transform: t(0.0, 0.0, '0deg') }, // центр
        { transform: t(0.7, -0.9, '12deg') }, // резко вверх-вправо
        { transform: t(-0.8, -0.7, '-18deg') }, // влево-вверх
        { transform: t(-0.6, 0.6, '10deg') }, // вниз-влево
        { transform: t(0.8, 0.8, '-16deg') }, // вниз-вправо
        { transform: t(0.3, -0.6, '6deg') }, // вверх-вправо, меньше
        { transform: t(-0.9, 0.0, '24deg') }, // резко влево
        { transform: t(0.0, 0.9, '-22deg') }, // резко вниз
        { transform: t(0.7, 0.3, '15deg') }, // вправо-низ
        { transform: t(-0.7, -0.3, '-14deg') }, // влево-верх
        { transform: t(0.6, -0.6, '11deg') }, // диагональ вверх-вправо
        { transform: t(-0.3, 0.7, '-8deg') }, // диагональ вниз-влево
        { transform: t(0.9, -0.1, '21deg') }, // вправо почти макс
        { transform: t(-0.9, 0.8, '-19deg') }, // влево-вниз
        { transform: t(0.4, -0.8, '17deg') }, // вверх-вправо
        { transform: t(-0.6, 0.4, '-9deg') }, // вниз-влево
        { transform: t(0.8, 0.0, '7deg') }, // вправо
        { transform: t(0.0, -0.8, '-13deg') }, // вверх
        { transform: t(-0.2, 0.9, '16deg') }, // влево-вниз
        { transform: t(0.0, 0.0, '0deg') }, // обратно в центр
      ];
    },
    jumpy: (maxXRatio, maxYRatio) => {
      const t = tt(maxXRatio, maxYRatio);
      return [
        { transform: t(0.0, 0.0, '0deg') }, // центр
        { transform: t(0.8, -0.9, '25deg') }, // резкий рывок вправо-вверх
        { transform: t(0.6, -0.7, '12deg') }, // дрожание в ту же сторону
        { transform: t(-0.7, -0.8, '-20deg') }, // резкий рывок влево-вверх
        { transform: t(-0.9, 0.2, '-30deg') }, // еще дальше влево, чуть вниз
        { transform: t(-0.4, 0.7, '10deg') }, // резко вниз-влево
        { transform: t(0.7, 0.9, '18deg') }, // резкий бросок вниз-вправо
        { transform: t(0.9, 0.7, '28deg') }, // еще чуть вправо, дрожание
        { transform: t(0.0, -0.9, '-18deg') }, // резкий вверх по центру
        { transform: t(0.3, -0.5, '6deg') }, // легкий возврат вправо
        { transform: t(-0.8, 0.1, '-21deg') }, // влево рывок
        { transform: t(0.8, 0.0, '24deg') }, // сразу вправо
        { transform: t(-0.9, 0.9, '-32deg') }, // резкий влево-вниз
        { transform: t(-0.7, 0.6, '-14deg') }, // дрожание в том же направлении
        { transform: t(0.6, 0.9, '19deg') }, // резко вправо-вниз
        { transform: t(0.5, -0.8, '12deg') }, // вверх
        { transform: t(-0.5, -0.9, '-17deg') }, // сразу влево-вверх
        { transform: t(0.0, 0.8, '8deg') }, // резко вниз
        { transform: t(-0.6, 0.0, '-11deg') }, // влево
        { transform: t(0.0, 0.0, '0deg') }, // центр (reset)
      ];
    },
  } satisfies Record<string, CreateParabgAnimation>;
})();

// Big
// Short
// Result is %ofBig
// Big = Scale * Short
// Short = Big / Scale
// Result = (Big - Short) / 2 = (Big - Big / Scale) / 2 = 50% * (1 - 1 / Scale))
// Result2 = (Big - Short * 1.5) / 2 = (Big - 1.5 * Big / Scale) / 2 = 50% * (1 - 1.5 / Scale))

export const animationCreators = {
  rect0: maxShift => {
    maxShift -= 0.01; /// TODO

    const t = (tx: number, ty: number, rotateDeg?: number) =>
      `translate(-50%,-50%) rotate(${rotateDeg ?? 0}deg) translate(${tx * maxShift * 100}%,${ty * maxShift * 100}%)`;

    return enhanceStepsEvenly([
      { transform: t(0, 0) },
      { transform: t(1, 1) },
      { transform: t(1, -1) },
      { transform: t(-1, 1) },
      { transform: t(-1, -1) },
    ]);
  },
  rectJumpy: maxShift => {
    maxShift -= 0.01;
    const t = (tx: number, ty: number, rotateDeg?: number) =>
      `translate(-50%,-50%) rotate(${rotateDeg ?? 0}deg) translate(${tx * maxShift * 100}%,${ty * maxShift * 100}%)`;

    return enhanceStepsEvenly([
      { transform: t(0.0, 0.0, 0) },
      { transform: t(0.89, -0.61, -5) }, // край, угол 0°
      { transform: t(0.41, -0.62, 15) },
      { transform: t(-0.87, -0.79, 0) }, // край, угол 0°
      { transform: t(-0.25, 0.08, 15) },
      { transform: t(-0.94, 0.89, 0) }, // край, угол 0°
      { transform: t(-0.22, 0.58, -11) },
      { transform: t(0.83, 0.76, 0) }, // край, угол 0°
      { transform: t(0.51, 0.11, 7) },
      { transform: t(0.01, -0.58, -9) },
      { transform: t(0.69, -0.38, 15) },
      { transform: t(-0.88, -0.21, 0) }, // край, угол 0°
      { transform: t(0.32, 0.56, 11) },
      { transform: t(-0.36, 0.81, -8) },
      { transform: t(-0.06, 0.05, 2) }, // почти центр, крутой наклон
      { transform: t(0.71, 0.01, 13) },
      { transform: t(0.04, -0.69, -14) },
      { transform: t(-0.38, -0.61, -13) },
      { transform: t(-0.93, 0.05, 0) }, // край, угол 0°
      { transform: t(-0.48, 0.53, -12) },
      { transform: t(0.71, 0.13, 0) }, // край, угол 0°
      { transform: t(0.18, -0.73, -22) },
      { transform: t(0.0, 0.0, 0) }, // финал — центр, угол 0°
    ]);
  },
} as const satisfies Record<string, (scale: number) => Record<`${number}%`, CSSProperties>>;
