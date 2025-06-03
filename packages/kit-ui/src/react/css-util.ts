const numRe = /^(-?(?:\d*\.?)?\d+(?:e-?\d)?)/;

export const mutateCssNum = (s: number | string, update: (n: number) => number) => {
  if (typeof s === 'number') {
    return update(s);
  }

  const numMatch = s.match(numRe);
  if (!numMatch) {
    throw new SyntaxError(`can not parse number part from '${s}'`);
  }
  const numStr = numMatch[0];
  const num = Number.parseFloat(numStr);
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    throw new TypeError(`invalid number part of value ${num} parsed from '${s}'`);
  }
  return `${update(num)}${s.slice(numStr.length)}`;
};
