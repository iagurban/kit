import { errorFromUnknown, errorToString } from './error-utils';

describe('errorToString', () => {
  describe('errorFromUnknown', () => {
    it('should return the Error object as is if the input is already an Error', () => {
      const input = new Error('Existing error');
      const result = errorFromUnknown(input);
      expect(result).toBe(input);
    });

    it('should convert a string input into an Error object with the string as its message', () => {
      const input = 'Error message';
      const result = errorFromUnknown(input);
      expect(result).toEqual(new Error('Error message'));
    });

    it('should convert a number input into an Error object with the number as its message', () => {
      const input = 404;
      const result = errorFromUnknown(input);
      expect(result).toEqual(new Error('404'));
    });

    it('should convert null into an Error object with "null" as its message', () => {
      const input = null;
      const result = errorFromUnknown(input);
      expect(result).toEqual(new Error('null'));
    });

    it('should convert undefined into an Error object with "undefined" as its message', () => {
      const input = undefined;
      const result = errorFromUnknown(input);
      expect(result).toEqual(new Error('undefined'));
    });

    it('should convert an object into an Error object with "[object Object]" as its message', () => {
      const input = { key: 'value' };
      const result = errorFromUnknown(input);
      expect(result).toEqual(new Error('[object Object]'));
    });

    it('should convert a boolean into an Error object with the boolean as its message', () => {
      const input = false;
      const result = errorFromUnknown(input);
      expect(result).toEqual(new Error('false'));
    });

    it('should convert an array into an Error object with the string representation of the array as its message', () => {
      const input = [1, 2, 3];
      const result = errorFromUnknown(input);
      expect(result).toEqual(new Error('1,2,3'));
    });
  });
  it('should return the message of an Error object', () => {
    const error = new Error('Test error message');
    const result = errorToString(error);
    expect(result).toBe('Test error message');
  });

  it('should return the string representation of a non-Error object', () => {
    const error = { code: 500, message: 'Internal Server Error' };
    const result = errorToString(error);
    expect(result).toBe('[object Object]');
  });

  it('should return the string representation of a number', () => {
    const error = 404;
    const result = errorToString(error);
    expect(result).toBe('404');
  });

  it('should return the string representation of a string', () => {
    const error = 'Some error occurred';
    const result = errorToString(error);
    expect(result).toBe('Some error occurred');
  });

  it('should return the string "undefined" for an undefined value', () => {
    const error = undefined;
    const result = errorToString(error);
    expect(result).toBe('undefined');
  });

  it('should return the string "null" for a null value', () => {
    const error = null;
    const result = errorToString(error);
    expect(result).toBe('null');
  });

  it('should handle instances of extended Error classes', () => {
    class CustomError extends Error {
      constructor() {
        super('Custom error occurred');
      }
    }

    const error = new CustomError();
    const result = errorToString(error);
    expect(result).toBe('Custom error occurred');
  });

  it('should handle error-like objects that lack a "message" property', () => {
    const error = { name: 'ErrorLikeObject' };
    const result = errorToString(error);
    expect(result).toBe('[object Object]');
  });
});
