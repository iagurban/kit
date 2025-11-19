import { weakCache } from './weak-cache';

describe('weakCache', () => {
  it('should return the same value for the same object input', () => {
    const createMock = jest.fn((obj: { id: number }) => ({ value: obj.id * 2 }));
    const cache = weakCache(createMock);

    const input = { id: 1 };
    const result1 = cache(input);
    const result2 = cache(input);

    expect(result1).toBe(result2);
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it('should return new values for different object inputs', () => {
    const createMock = jest.fn((obj: { id: number }) => ({ value: obj.id * 2 }));
    const cache = weakCache(createMock);

    const input1 = { id: 1 };
    const input2 = { id: 2 };

    const result1 = cache(input1);
    const result2 = cache(input2);

    expect(result1).not.toBe(result2);
    expect(createMock).toHaveBeenCalledTimes(2);
  });

  it('should handle multiple calls with the same object correctly', () => {
    const createMock = jest.fn((obj: { id: number }) => ({ value: obj.id * 2 }));
    const cache = weakCache(createMock);

    const input = { id: 3 };

    const result1 = cache(input);
    const result2 = cache(input);
    const result3 = cache(input);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it('should lazily initialize and cache values', () => {
    const createMock = jest.fn((obj: { id: number }) => ({ value: obj.id * 2 }));
    const cache = weakCache(createMock);

    const input = { id: 5 };

    expect(createMock).not.toHaveBeenCalled();

    const result = cache(input);

    expect(result).toEqual({ value: 10 });
    expect(createMock).toHaveBeenCalledTimes(1);
  });
});
