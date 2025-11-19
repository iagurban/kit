/**
 * Converts a duration in milliseconds to a human-readable string format.
 *
 * The output string includes the duration in seconds and milliseconds,
 * separated by a decimal point, followed by the letter "s" as a unit symbol.
 * Milliseconds are always represented with three digits, padded with leading
 * zeros if necessary.
 *
 * @param {number} durationInMs - The duration in milliseconds to be formatted.
 * @returns {string} A string representation of the duration in the format "X.XXXs",
 *                   where X represents seconds and XXX represents milliseconds.
 */
export const formatDuration = (durationInMs: number): string => {
  const seconds = Math.floor(durationInMs / 1000);
  const milliseconds = durationInMs % 1000;
  return `${seconds}.${String(milliseconds).padStart(3, '0')}s`;
};
