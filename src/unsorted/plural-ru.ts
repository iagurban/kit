/**
 * Склоняет существительное согласно числительному n
 * @param {string} nominative именительный падеж, единственное число
 * @param {string} genitiveSingle родительный падеж, единственное число
 * @param {string} genitiveMulti родительный падеж, множественное число
 * @returns {(n: number) => string}
 */
export const nounPluralRU =
  (nominative: string, genitiveSingle: string, genitiveMulti: string) => (n: number) => {
    n = Math.abs(n);
    const rem10 = n % 10;
    const rem100 = n % 100;

    return rem10 === 1 && rem100 !== 11
      ? nominative
      : rem10 > 1 && rem10 < 5 && (rem100 < 10 || rem100 > 19)
        ? genitiveSingle
        : genitiveMulti;
  };

/**
 * Для сочетаний винительного падежа с глаголами
 * @param {string} single винительный падеж, единственное число
 * @param {string} many винительный падеж, множественное число
 * @returns {(n: number) => string}
 */
export const accusativeNounPluralRU = (single: string, many: string) => (n: number) =>
  Math.abs(n) === 1 ? single : many;

/** Возвращает форму сказуемого согласно числительному
 * @param {string} single единственное число ("прошёл"/"прошла")
 * @param {string} many множественное число ("прошли")
 * @param {string} middle средний род ("прошло")
 * @returns {(n: number) => string}
 */
export const verbPluralRU = (single: string, many: string, middle: string) => (n: number) => {
  n = Math.abs(n);

  if (n > 1_000_000) {
    return middle;
  }

  if (n > 1000 && n < 1_000_000 && n % 1000 === 0) {
    n = Math.trunc(n / 1000);
  }

  const rem10 = n % 10;
  const rem100 = n % 100;

  return (rem10 === 1 && rem100 !== 11) || n === 1000
    ? single
    : rem10 > 1 && rem10 < 5 && (rem100 < 10 || rem100 > 19)
      ? many
      : middle;
};
