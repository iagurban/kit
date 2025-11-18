import { NumberBase } from './numbers/number-base';

const {
  b62: { from10, to10, mask, fixedWidthRandomGenerator },
} = NumberBase;

// console.log(NumberBase.b62.maxSafeDigits, NumberBase.b16.maxSafeDigits);

const randomGen = fixedWidthRandomGenerator(8);
const dateMask = Number(to10(mask(4)));

/**
 * Generates a unique identifier string.
 *
 * The `uidGenerator` function creates a unique identifier combining a
 * timestamp-derived component and a random component.
 * The first part of the identifier is generated using the current
 * timestamp modulo `dateMask`, converted through the `from10` function.
 * The second part is a random string provided by the `randomGen` function.
 *
 * Ensure that `from10()` and `randomGen()` are defined and accessible in
 * the context where this function is used.
 *
 * This function is useful for creating compact and unique identifiers
 * for various application needs.
 *
 * @returns {string} A unique string identifier.
 */
export const uidGenerator = (): string => `${from10(Date.now() % dateMask)}${randomGen()}`;
