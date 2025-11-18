/**
 * Adjusts a given number to the nearest multiple of a specified step size.
 * The adjustment can be controlled using an optional rounding mode.
 *
 * @function
 * @param {number} x - The number to be adjusted.
 * @param {number} step - The step size to which the number will be snapped.
 * @param {'ceil' | 'floor' | 'round'} [mode] - Optional rounding mode to apply; defaults to 'round' if not provided.
 * Valid values are:
 *   - 'ceil': Rounds up to the nearest step.
 *   - 'floor': Rounds down to the nearest step.
 *   - 'round': Rounds to the nearest step based on standard rounding rules.
 * @returns {number} The adjusted value, snapped to the nearest multiple of the step size.
 */
export const snap = (x: number, step: number, mode?: 'ceil' | 'floor' | 'round'): number =>
  (mode ? Math[mode] : Math.round)(x / step) * step;

/**
 * Scales a value from a normalized range [0, 1] to a specified range [min, max].
 *
 * @param {number} v - The value to be scaled, assumed to be in the range [0, 1].
 * @param {number} min - The lower bound of the target range.
 * @param {number} max - The upper bound of the target range.
 * @returns {number} The scaled value in the range [min, max].
 */
export const scaleFrom01 = (v: number, min: number, max: number): number => v * (max - min) + min;

/**
 * Scales a given value to a normalized range between 0 and 1.
 *
 * This function is used to map a value `v` from an input range defined by `min`
 * and `max` to a proportional position within the range [0, 1]. It assumes
 * that `min` is not equal to `max` and does not perform validation on the inputs.
 *
 * @param {number} v - The value to be scaled.
 * @param {number} min - The lower bound of the input range.
 * @param {number} max - The upper bound of the input range.
 * @returns {number} The normalized value within the range [0, 1].
 */
export const scaleTo01_unsafe = (v: number, min: number, max: number): number => (v - min) / (max - min);

/**
 * Scales a given value to a normalized range [0, 1] based on the specified minimum and maximum range values.
 *
 * Throws an error if the maximum and minimum values are equal, as the result would be NaN in this scenario.
 *
 * @param {number} v - The value to scale.
 * @param {number} min - The minimum value of the original range.
 * @param {number} max - The maximum value of the original range.
 * @returns {number} The scaled value within the range [0, 1].
 * @throws {Error} If max is equal to min.
 */
export const scaleTo01 = (v: number, min: number, max: number): number => {
  if (max === min) {
    throw new Error(`max === min`);
  }
  return scaleTo01_unsafe(v, min, max);
};

/**
 * Scales a given number `v` from one range to another without enforcing boundary checks.
 *
 * This function converts the input value from an initial range [fromMin, fromMax]
 * into a normalized range [0, 1], and then scales it to the target range [toMin, toMax].
 * It does not guarantee the input `v` is within the range [fromMin, fromMax], hence
 * may produce results beyond the target range boundaries if the input is outside the source range.
 *
 * @param {number} v - The value to be scaled from the source range to the target range.
 * @param {number} fromMin - The minimum value of the source range.
 * @param {number} fromMax - The maximum value of the source range.
 * @param {number} toMin - The minimum value of the target range.
 * @param {number} toMax - The maximum value of the target range.
 * @returns {number} The scaled value in the target range.
 */
export const scale_unsafe = (
  v: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number => scaleFrom01(scaleTo01_unsafe(v, fromMin, fromMax), toMin, toMax);

/**
 * Scales a numeric value from one range to another.
 *
 * This function takes a value and re-maps it from a source range
 * ([fromMin, fromMax]) to a target range ([toMin, toMax]).
 *
 * The source range is defined with the parameters `fromMin` and `fromMax`.
 * The target range is defined with the parameters `toMin` and `toMax`.
 *
 * If the value lies outside the source range, the scaling is performed
 * as if the source range were extended, without clamping the final result.
 *
 * @param {number} v - The value to be scaled.
 * @param {number} fromMin - The minimum of the source range.
 * @param {number} fromMax - The maximum of the source range.
 * @param {number} toMin - The minimum of the target range.
 * @param {number} toMax - The maximum of the target range.
 * @returns {number} The value scaled to the target range.
 */
export const scale = (v: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number =>
  scaleFrom01(scaleTo01(v, fromMin, fromMax), toMin, toMax);

/**
 * Restricts a number to be within a specified range.
 *
 * The `clamp` function ensures that a given number `v` lies within the bounds
 * defined by `min` and `max`. If `v` is less than `min`, the function returns
 * `min`. If `v` is greater than `max`, the function returns `max`.
 * Otherwise, it returns `v`.
 *
 * Throws an error if `min` is greater than `max`.
 *
 * @param {number} v - The number to be clamped.
 * @param {number} min - The lower boundary of the range.
 * @param {number} max - The upper boundary of the range.
 * @returns {number} The clamped value, restricted to the inclusive range [min, max].
 * @throws {Error} If `min` is greater than `max`.
 */
export const clamp = (v: number, min: number, max: number): number => {
  if (min > max) {
    throw new Error(`min must be less than max`);
  }
  return v < min ? min : v > max ? max : v;
};
