/**
 * Преобразует смещение во времени, заданное в секундах, в строку формата `"HH:MM[:SS][.mmm]"`.
 *
 * @param {number} inputSeconds — смещение в секундах (может быть дробным, для учёта миллисекунд).
 * @param {{ s?: boolean|'auto'; ms?: boolean|'auto' }} [options={}] — настройки вывода:
 *   @param {boolean|'auto'} [options.s] —
 *     - `true`  — всегда включать поле секунд (`:SS`),
 *     - `false` — никогда не включать секунды,
 *     - `'auto'` (или не указано) — включать секунды, только если они ненулевые.
 *   @param {boolean|'auto'} [options.ms] —
 *     - `true`  — всегда включать поле миллисекунд (`.mmm`),
 *     - `false` — никогда не включать миллисекунды,
 *     - `'auto'` (или не указано) — включать миллисекунды, только если они ненулевые.
 *
 * @returns {string} Строка вида `"HH:MM"`, `"HH:MM:SS"` или `"HH:MM:SS.mmm"`, в зависимости от значений и опций.
 */
export const secondsOffsetToString = (
  inputSeconds: number,
  options: { s?: boolean | `auto`; ms?: boolean | `auto` } = {}
): string => {
  const hours = Math.floor(inputSeconds / 60 / 60);
  inputSeconds -= hours * 60 * 60;
  const minutes = Math.floor(inputSeconds / 60);
  inputSeconds -= minutes * 60;
  const seconds = Math.floor(inputSeconds);
  const milliSeconds = Math.min(Math.round((inputSeconds - seconds) * 1000), 999);
  let hm = `${String(hours).padStart(2, `0`)}:${String(minutes).padStart(2, `0`)}`;
  if (seconds ? options.s !== false : options.s === true) {
    hm += `:${String(seconds).padStart(2, `0`)}`;
  }
  if (milliSeconds ? options.ms !== false : options.ms === true) {
    hm += `.${String(milliSeconds).padStart(3, `0`)}`;
  }
  return hm;
};

/**
 * Преобразует строку времени формата `"HH:MM"`, `"HH:MM:SS"` или `"HH:MM:SS.mmm"`
 * в смещение в секундах (целое число, округлённое до ближайшего).
 *
 * @param {string} inputDateStr — строка времени. Ожидается:
 *   - часы и минуты:         `"HH:MM"`,
 *   - часы, минуты и секунды: `"HH:MM:SS"`,
 *   - часы, минуты, секунды и миллисекунды: `"HH:MM:SS.mmm"`.
 *
 * @throws {Error} Если строка не соответствует ожидаемому формату, бросает ошибку
 *                 `new Error(\`wrong time format: ${input}\`)`.
 *
 * @returns {number} Смещение в секундах (с учётом миллисекунд, округлённое).
 */
export const timeStringToSecondsOffset = (inputDateStr: string): number => {
  const match = inputDateStr.match(/(\d{2}):(\d{2})(?::(\d{2})(?:.(\d{3}))?)?/);
  if (!match) {
    throw new Error(`wrong time format: ${inputDateStr}`);
  }
  const [, h, m, s, ms] = match;
  return Math.round(
    parseInt(h, 10) * 60 * 60 +
      parseInt(m, 10) * 60 +
      (s !== undefined ? parseInt(s, 10) : 0) +
      (ms !== undefined ? parseInt(ms, 10) / 1000 : 0)
  );
};

// console.log(`secondsOffsetToString`, '00:01', secondsOffsetToString(60));
// console.log(`secondsOffsetToString`, '01:00', secondsOffsetToString(3600));
// console.log(`timeStringToSecondsOffset`, 60, timeStringToSecondsOffset(`00:01`));
// console.log(`timeStringToSecondsOffset`, 3600, timeStringToSecondsOffset(`01:00`));
