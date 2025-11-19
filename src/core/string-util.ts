/**
 * Converts a given string into an array of its Unicode code points.
 *
 * This function iterates over each character of the input string,
 * capturing the Unicode code point of each character, and returns
 * an array containing all code points in sequence.
 *
 * @param {string} s - The input string to be converted into Unicode code points.
 * @returns {number[]} An array of numbers representing the Unicode code points of the input string characters.
 */
export const allStringCodePoints = (s: string): number[] => {
  const r: number[] = [];
  for (let i = 0; ; i++) {
    const cp = s.codePointAt(i);
    if (cp === undefined) {
      break;
    }
    r.push(cp);
  }
  return r;
};

/**
 * Computes and returns an array of numeric code points for the provided input.
 *
 * If the input is a string, it returns an array of Unicode code points
 * for all characters in the string.
 * If the input is an array of strings, it recursively processes each string
 * in the array and combines all the resulting code points into a single array.
 *
 * @template T - The type of the input, which can either be a string or an array of strings.
 * @param {T} s - The string or array of strings to process for code points.
 * @returns {number[]} An array of numeric code points for the given string(s).
 */
export const allCodePoints = <T extends string | readonly string[]>(s: T): number[] => {
  if (typeof s !== 'string') {
    return s.flatMap(allCodePoints);
  }
  return allStringCodePoints(s);
};

/**
 * Determines whether the given string contains at least one uppercase letter.
 *
 * This function uses a regular expression to check for the presence of any character
 * categorized as an uppercase letter in Unicode. It supports all scripts and languages
 * defined in Unicode to identify uppercase characters.
 *
 * @param {string} word - The input string to be evaluated.
 * @returns {boolean} Returns true if the input string contains at least one uppercase letter, otherwise false.
 */
export const isUppercase = (word: string): boolean => /\p{Lu}/u.test(word);
