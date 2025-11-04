import { NumberBase } from '../numbers/number-base';

const {
  b62: { from10, to10, mask, fixedWidthRandomGenerator },
} = NumberBase;

// console.log(NumberBase.b62.maxSafeDigits, NumberBase.b16.maxSafeDigits);

const randomGen = fixedWidthRandomGenerator(8);
const dateMask = Number(to10(mask(4)));

export const uidGenerator = () => `${from10(Date.now() % dateMask)}${randomGen()}`;
