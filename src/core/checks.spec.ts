import {
  checked,
  checkerType,
  isArrayOf,
  isDefined,
  isInstanceOf,
  isInteger,
  isNotNull,
  isNotUndefined,
  isNull,
  isNullish,
  isNumber,
  isPlainObject,
  isROArray,
  isSomeObject,
  isSomeOf,
  isString,
  isTruthy,
  isTuple,
  isTuples,
  isUndefined,
  tagChecker,
  tagCheckerGetter,
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

  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
    });
  });

  describe('isNull', () => {
    it('should return true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull('')).toBe(false);
    });
  });

  describe('isNullish', () => {
    it('should return true for null and undefined', () => {
      expect(isNullish(null)).toBe(true);
      expect(isNullish(undefined)).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isNullish(0)).toBe(false);
      expect(isNullish('')).toBe(false);
      expect(isNullish({})).toBe(false);
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

  describe('isSomeObject', () => {
    it('should identify objects', () => {
      expect(isSomeObject({})).toBe(true);
      expect(isSomeObject({ a: 1 })).toBe(true);
      class TestClass {}
      expect(isSomeObject(new TestClass())).toBe(true);
    });

    it('should reject non-objects', () => {
      expect(isSomeObject([])).toBe(false);
      expect(isSomeObject(null)).toBe(false);
      expect(isSomeObject(undefined)).toBe(false);
      expect(isSomeObject(123)).toBe(false);
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
      expect(isNumberArray({})).toBe(false);
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
      expect(isStringNumberTuple({})).toBe(false);
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

    it('should throw an Error object if message returns one', () => {
      const customError = new Error('Custom error object');
      expect(() => checked(123, isString, () => customError)).toThrow(customError);
    });
  });

  describe('Checker Type Field Generation', () => {
    it('should have correct types for basic checkers', () => {
      expect(checkerType(isDefined)).toBe('[defined]');
      expect(checkerType(isNotUndefined)).toBe('!undefined');
      expect(checkerType(isNotNull)).toBe('!null');
      expect(checkerType(isTruthy)).toBe('[truthy]');
      expect(checkerType(isUndefined)).toBe('undefined');
      expect(checkerType(isNull)).toBe('null');
      expect(checkerType(isNullish)).toBe('(null|undefined)');
      expect(checkerType(isString)).toBe('string');
      expect(checkerType(isNumber)).toBe('number');
      expect(checkerType(isInteger)).toBe('integer');
      expect(checkerType(isPlainObject)).toBe('plain-object');
      expect(checkerType(isSomeObject)).toBe('some-object');
      expect(checkerType(isROArray)).toBe('readonly-array');
    });

    it('should generate correct type for isArrayOf', () => {
      const isNumberArray = isArrayOf(isNumber);
      expect(checkerType(isNumberArray)).toBe('number[]');
      const isStringArrayArray = isArrayOf(isArrayOf(isString));
      expect(checkerType(isStringArrayArray)).toBe('string[][]');
    });

    it('should generate correct type for isSomeOf', () => {
      const isStringOrNumber = isSomeOf(isString, isNumber);
      expect(checkerType(isStringOrNumber)).toBe('(string | number)');
      const isComplex = isSomeOf(isString, isArrayOf(isNumber));
      expect(checkerType(isComplex)).toBe('(string | number[])');
    });

    it('should generate correct type for isInstanceOf', () => {
      class MyClass {}
      class AnotherClass {}
      const isMyClass = isInstanceOf(MyClass);
      expect(checkerType(isMyClass)).toBe('[class MyClass]');
      const isOneOfTwo = isInstanceOf(MyClass, AnotherClass);
      expect(checkerType(isOneOfTwo)).toBe('[class MyClass | class AnotherClass]');
    });

    it('should handle anonymous classes in isInstanceOf', () => {
      const isAnon = isInstanceOf(class {});
      expect(checkerType(isAnon)).toBe('[class]');
    });
  });

  describe('Custom Checker Creation', () => {
    it('should create a checker with no type tag', () => {
      const isPositive = (o: unknown): o is number => typeof o === 'number' && o > 0;
      expect(isPositive(1)).toBe(true);
      expect(isPositive(-1)).toBe(false);
      expect(checkerType(isPositive)).toBe('[unknown]');
    });

    it('should create a checker with a fixed string type', () => {
      const isPositive = tagChecker((o: unknown): o is number => typeof o === 'number' && o > 0, 'positive-number');
      expect(isPositive(1)).toBe(true);
      expect(isPositive(-1)).toBe(false);
      expect(checkerType(isPositive)).toBe('positive-number');
    });

    it('should create a checker with a cached getter for the type', () => {
      const typeGetter = jest.fn(() => 'positive-number');
      const isPositive = tagCheckerGetter((o: unknown): o is number => typeof o === 'number' && o > 0, typeGetter);

      expect(checkerType(isPositive)).toBe('positive-number');
      expect(checkerType(isPositive)).toBe('positive-number'); // Access again
      expect(typeGetter).toHaveBeenCalledTimes(1); // Should only be called once
    });

    it('should create a checker with a non-cached getter for the type', () => {
      const typeGetter = jest.fn(() => 'positive-number');
      const isPositive = tagCheckerGetter(
        (o: unknown): o is number => typeof o === 'number' && o > 0,
        typeGetter,
        false // cache = false
      );

      expect(checkerType(isPositive)).toBe('positive-number');
      expect(checkerType(isPositive)).toBe('positive-number'); // Access again
      expect(typeGetter).toHaveBeenCalledTimes(2); // Should be called each time
    });
  });

  describe('Validator Error Messages', () => {
    it('should include the type in the error message when available', () => {
      const validateString = validator(isString);
      expect(() => validateString(123, s => s.length)).toThrow('check of type string failed, got 123');
      const validateString0 = validator0(isString);
      expect(() => validateString0(123)).toThrow('check of type string failed, got 123');
    });

    it('should not include the type in the error message when not available', () => {
      const isPositive = (o: unknown): o is number => typeof o === 'number' && o > 0;
      const validatePositive = validator(isPositive);
      expect(() => validatePositive(-1, n => n)).toThrow('check failed, got -1');
      const validatePositive0 = validator0(isPositive);
      expect(() => validatePositive0(-1)).toThrow('check failed, got -1');
    });

    it('should return transformed value on successful validation', () => {
      const validateString = validator(isString);
      expect(validateString('test', s => s.toUpperCase())).toBe('TEST');
    });

    it('should return value on successful validation for validator0', () => {
      const validateNumber = validator0(isNumber);
      expect(validateNumber(123)).toBe(123);
    });
  });
});
