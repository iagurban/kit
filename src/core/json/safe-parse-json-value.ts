import type { JsonValue } from './json-type';

/**
 * Safely parses a JSON-encoded string into its corresponding JavaScript value.
 * If parsing fails, either a custom fallback function or the original string is returned.
 *
 * @param {string} stringValue - The string to parse as JSON.
 * @param {(error: unknown) => JsonValue} [fallback] - An optional callback invoked
 *        when the parsing process fails, receiving the error as an argument.
 *        Should return a fallback value to replace the parsed result.
 * @returns {JsonValue} - The parsed value if successful. If parsing fails,
 *          returns the result of the fallback function if provided, or the
 *          original string value otherwise.
 */
export const safeParseJSONValue = (
  stringValue: string,
  fallback?: (error: unknown) => JsonValue
): JsonValue => {
  try {
    // Attempt to restore the original type using JSON.parse.
    // e.g., "true" -> true, "123" -> 123, "\"admin\"" -> "admin"
    return JSON.parse(stringValue);
  } catch (error) {
    // Parsing failed, data is potentially corrupt or was incorrectly stored.
    return fallback
      ? fallback(error) // Use provided custom fallback
      : stringValue; // Default: treat as a literal string
  }
};
