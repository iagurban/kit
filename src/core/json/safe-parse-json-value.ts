import { JsonValue } from './json-type';

export const safeParseJSONValue = (stringValue: string, fallback?: (error: unknown) => JsonValue) => {
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
