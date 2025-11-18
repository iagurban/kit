import {
  checked,
  isArrayOf,
  isDefined,
  isInstanceOf,
  isInteger,
  isNotNull,
  isNotUndefined,
  isNumber,
  isPlainObject,
  isROArray,
  isSomeOf,
  isString,
  isTruthy,
  isTuple,
  isTuples,
  validator,
  validator0,
} from './checks';

describe('Type Checks', () => {
  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined({})).toBe(true);
    });

    it('should return false for null and undefined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('isNotUndefined', () => {
    it('should return true for defined values including null', () => {
      expect(isNotUndefined(0)).toBe(true);
      expect(isNotUndefined(null)).toBe(true);
      expect(isNotUndefined('')).toBe(true);
    });

    it('should return false for undefined', () => {
      expect(isNotUndefined(undefined)).toBe(false);
    });
  });

  describe('isNotNull', () => {
    it('should return true for non-null values including undefined', () => {
      expect(isNotNull(0)).toBe(true);
      expect(isNotNull(undefined)).toBe(true);
      expect(isNotNull('')).toBe(true);
    });

    it('should return false for null', () => {
      expect(isNotNull(null)).toBe(false);
    });
  });

  describe('isTruthy', () => {
    it('should return true for truthy values', () => {
      expect(isTruthy(1)).toBe(true);
      expect(isTruthy('text')).toBe(true);
      expect(isTruthy({})).toBe(true);
      expect(isTruthy([])).toBe(true);
    });

    it('should return false for falsy values', () => {
      expect(isTruthy(0)).toBe(false);
      expect(isTruthy('')).toBe(false);
      expect(isTruthy(false)).toBe(false);
      expect(isTruthy(null)).toBe(false);
      expect(isTruthy(undefined)).toBe(false);
    });
  });

  describe('isString/isNumber/isInteger', () => {
    it('should correctly identify strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('text')).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString({})).toBe(false);
    });

    it('should correctly identify numbers', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0.5)).toBe(true);
      expect(isNumber('123')).toBe(false);
      expect(isNumber(NaN)).toBe(true);
    });

    it('should correctly identify integers', () => {
      expect(isInteger(123)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(-1)).toBe(true);
      expect(isInteger(0.5)).toBe(false);
      expect(isInteger('123')).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('should identify plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('should reject non-plain objects', () => {
      class TestClass {}
      expect(isPlainObject(new TestClass())).toBe(false);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(null)).toBe(false);
    });
  });

  describe('isROArray and isArray', () => {
    it('should identify arrays', () => {
      const arr = [1, 2, 3];
      const readonlyArr: readonly number[] = arr;
      expect(isROArray(arr)).toBe(true);
      expect(isROArray(readonlyArr)).toBe(true);
      expect(isROArray({})).toBe(false);
    });

    it('should validate array elements', () => {
      const isNumberArray = isArrayOf(isNumber);
      expect(isNumberArray([1, 2, 3])).toBe(true);
      expect(isNumberArray([1, '2', 3])).toBe(false);
      expect(isNumberArray([])).toBe(true);
    });
  });

  describe('isInstanceOf', () => {
    class TestClass {}
    class ExtendedClass extends TestClass {}

    it('should check instance of single class', () => {
      const isTest = isInstanceOf(TestClass);
      expect(isTest(new TestClass())).toBe(true);
      expect(isTest(new ExtendedClass())).toBe(true);
      expect(isTest({})).toBe(false);
    });

    it('should check instance of multiple classes', () => {
      const isTestOrExtended = isInstanceOf(TestClass, ExtendedClass);
      expect(isTestOrExtended(new TestClass())).toBe(true);
      expect(isTestOrExtended(new ExtendedClass())).toBe(true);
      expect(isTestOrExtended({})).toBe(false);
    });
  });

  describe('isSomeOf', () => {
    it('should check if value matches any of the types', () => {
      const isStringOrNumber = isSomeOf(isString, isNumber);
      expect(isStringOrNumber('text')).toBe(true);
      expect(isStringOrNumber(123)).toBe(true);
      expect(isStringOrNumber({})).toBe(false);
    });
  });

  describe('isTuple and isTuples', () => {
    const isStringNumberTuple = isTuple(isString, isNumber);
    const isStringNumberTuples = isTuples(isString, isNumber);

    it('should validate tuples', () => {
      expect(isStringNumberTuple(['text', 123])).toBe(true);
      expect(isStringNumberTuple(['text', '123'])).toBe(false);
      expect(isStringNumberTuple(['text'])).toBe(false);
    });

    it('should validate arrays of tuples', () => {
      expect(
        isStringNumberTuples([
          ['text', 123],
          ['other', 456],
        ])
      ).toBe(true);
      expect(isStringNumberTuples([['text', '123']])).toBe(false);
      expect(isStringNumberTuples([])).toBe(true);
    });
  });

  describe('validator and validator0', () => {
    it('should validate and transform values', () => {
      const validateString = validator(isString);
      expect(validateString('text', s => s.length)).toBe(4);
      expect(() => validateString(123, s => s.length)).toThrow();
    });

    it('should validate without transformation', () => {
      const validateString = validator0(isString);
      expect(validateString('text')).toBe('text');
      expect(() => validateString(123)).toThrow();
    });
  });

  describe('checked', () => {
    it('should validate values with custom message', () => {
      const result = checked('text', isString, v => `Expected string, got ${typeof v}`);
      expect(result).toBe('text');

      expect(() => checked(123, isString, v => `Expected string, got ${typeof v}`)).toThrow(
        'Expected string, got number'
      );
    });

    it('should support type predicates', () => {
      const isPositive = (n: number): n is number => n > 0;
      const result = checked(5, isPositive, n => `Expected positive number, got ${n}`);
      expect(result).toBe(5);

      expect(() => checked(-1, isPositive, n => `Expected positive number, got ${n}`)).toThrow(
        'Expected positive number, got -1'
      );
    });
  });
});
