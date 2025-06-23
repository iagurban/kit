export { ExMap } from './collections/ex-map';
export { ExSet } from './collections/ex-set';
export type { Checker } from './core/checks';
export {
  checked,
  isArray,
  isDefined,
  isInstanceOf,
  isInteger,
  isNotNull,
  isNotUndefined,
  isNull,
  isNullish,
  isNumber,
  isPlainObject,
  isROArray,
  isSomeOf,
  isString,
  isTruthy,
  isTuple,
  isTuples,
  isUndefined,
  validator,
  validator0,
} from './core/checks';
export {
  angleBetween,
  boundingBox,
  circleArea,
  circleCircumference,
  degToRad,
  distance,
  distance00to11,
  distanceTo00,
  lerp,
  lerpPoint,
  midpoint,
  pointInCircle,
  pointInRect,
  pointInTriangle,
  pointOnCircle,
  radToDeg,
  rectArea,
  rectCenter,
  rectPerimeter,
  rectsIntersect,
  rotatePoint,
  rotateRect,
  triangleArea,
  triangleCentroid,
  trianglePerimeter,
} from './core/geometry';




export type { Listener } from './core/emitter';
export { Emitter } from './core/emitter';
export { FunctionsQueue } from './core/functions-queue';
export { lazyGetter } from './core/lazy-getter';
export { ProgrammingError } from './core/manual-sorting';
export { ManualSortingAlphabet } from './core/manual-sorting';
export { once, overwriteGetter } from './core/once';
export { stringConstants, svgNS } from './core/string-const';
export { uidGenerator } from './core/uid-generator';
export { weakCache } from './core/weak-cache';
export type { NumericAgg } from './numbers/aggregation';
export { aggregation } from './numbers/aggregation';
export { NumberBase } from './numbers/number-base';
export { NumberConverter } from './numbers/number-converter';
export {
  ArrayMutators,
  buckets,
  fromEntries,
  pickRandomItems,
  samples,
  samplesBy,
  syncArray,
} from './utils/array-utils';
export type { PromiseValue } from './utils/async-utils';
export { isPromise } from './utils/async-utils';
export { catching, notNull, NullError, throwing, warnCatch } from './utils/flow-utils';
export {
  addReturn,
  denyRecursion,
  mergeFunctions,
  multiRecurringDenier,
  skipCalls,
} from './utils/functions-utils';
export { indexed, iterableUtils, iu, reversed } from './utils/iterable-utils';
export { clamp, scale, scaleFrom01, scaleTo01, snap } from './utils/numeric-utils';
export { patchRR, PromiseController } from './utils/promise-util';
export { allCodePoints, allStringCodePoints, isUppercase } from './utils/string-util';
export type { NotNullish, Nullish, OverrideFields, ValOrArr } from './utils/types';
