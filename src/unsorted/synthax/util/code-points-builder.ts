import { ExSet } from '../../../core/collections/ex-set';
import { allCodePoints } from '../../../core/string-util';

const parseCodePointsRange = (pair: string) => {
  if (pair.length > 2) {
    throw new Error(`code points range must be 2 characters long, got ${pair.length} instead`);
  }
  const cp1 = pair.codePointAt(0);
  const cp2 = pair.codePointAt(1);
  if (cp1 === undefined || cp2 === undefined) {
    throw new Error(`code points range must consist of 2 valid characters, got ${pair} instead`);
  }
  if (cp1 >= cp2) {
    throw new Error(`first code point in range must be less than second, got ${pair} instead`);
  }
  return [cp1, cp2] as const;
};

export class CodePointsBuilder {
  readonly cps = new ExSet<number>();

  range(pair: string) {
    const [start, end] = parseCodePointsRange(pair);
    this.cps.join(Array.from({ length: end - start + 1 }, (_, i) => start + i));
    return this;
  }

  any(chars: string) {
    this.cps.join(allCodePoints(chars));
    return this;
  }

  digits() {
    return this.range(`09`);
  }
}
