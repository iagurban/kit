import { safeParseJSONValue } from './safe-parse-json-value';

describe('safeParseJSONValue', () => {
  it('should parse a valid JSON string representing a primitive value', () => {
    expect(safeParseJSONValue('"Hello"')).toBe('Hello');
    expect(safeParseJSONValue('123')).toBe(123);
    expect(safeParseJSONValue('true')).toBe(true);
    expect(safeParseJSONValue('null')).toBe(null);
  });

  it('should parse a valid JSON string representing an object', () => {
    const jsonString = '{"key": "value", "num": 42}';
    const result = safeParseJSONValue(jsonString);
    expect(result).toEqual({ key: 'value', num: 42 });
  });

  it('should parse a valid JSON string representing an array', () => {
    const jsonString = '[1, "two", null, false]';
    const result = safeParseJSONValue(jsonString);
    expect(result).toEqual([1, 'two', null, false]);
  });

  it('should return the fallback value when parsing fails and fallback is provided', () => {
    const invalidJSONString = '{key: value}';
    const fallback = (error: unknown) => ({ error: 'Parsing failed', details: (error as Error).message });
    const result = safeParseJSONValue(invalidJSONString, fallback);
    expect(result).toEqual({ error: 'Parsing failed', details: expect.any(String) });
  });

  it('should return the original string when parsing fails and no fallback is provided', () => {
    const invalidJSONString = '{key: value}';
    const result = safeParseJSONValue(invalidJSONString);
    expect(result).toBe(invalidJSONString);
  });

  it('should handle an empty string as input correctly', () => {
    const result = safeParseJSONValue('');
    expect(result).toBe('');
  });

  it('should handle complex JSON structures', () => {
    const jsonString = '{"nested": {"array": [1, "two", null]}}';
    const result = safeParseJSONValue(jsonString);
    expect(result).toEqual({ nested: { array: [1, 'two', null] } });
  });
});
