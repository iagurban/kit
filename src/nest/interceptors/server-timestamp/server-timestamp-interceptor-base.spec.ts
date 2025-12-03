/* eslint-disable @typescript-eslint/no-explicit-any */

import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

import { ServerTimestampInterceptorBase } from './server-timestamp-interceptor-base';

// A concrete implementation for testing purposes
class TestTimestampInterceptor extends ServerTimestampInterceptorBase<
  { data: any; entryTime: number },
  { data: any; entryTime: number; exitTime: number }
> {
  prepare(t1: number, data: any) {
    return { data, entryTime: t1 };
  }

  update(o: { data: any; entryTime: number }) {
    return { ...o, exitTime: Date.now() };
  }
}

describe('ServerTimestampInterceptorBase', () => {
  let interceptor: TestTimestampInterceptor;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  const mockDateNow = jest.spyOn(Date, 'now');

  beforeEach(() => {
    interceptor = new TestTimestampInterceptor();

    mockExecutionContext = {} as ExecutionContext;

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should call prepare and update, and transform the response', done => {
    const initialData = { message: 'hello' };
    const entryTime = 1672531200000; // 2023-01-01 00:00:00 UTC
    const exitTime = 1672531200100; // 100ms later

    mockDateNow.mockReturnValueOnce(entryTime).mockReturnValueOnce(exitTime);

    mockCallHandler = {
      handle: () => of(initialData),
    };

    const prepareSpy = jest.spyOn(interceptor, 'prepare');
    const updateSpy = jest.spyOn(interceptor, 'update');

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      // Verify prepare was called correctly
      expect(prepareSpy).toHaveBeenCalledWith(entryTime, initialData);
      expect(prepareSpy).toHaveBeenCalledTimes(1);

      // Verify update was called correctly
      expect(updateSpy).toHaveBeenCalledWith({ data: initialData, entryTime });
      expect(updateSpy).toHaveBeenCalledTimes(1);

      // Verify the final result
      expect(result).toEqual({
        data: initialData,
        entryTime,
        exitTime,
      });

      done();
    });
  });

  it('should handle an empty response from the handler', done => {
    const entryTime = 1672531201000;
    const exitTime = 1672531201200;

    mockDateNow.mockReturnValueOnce(entryTime).mockReturnValueOnce(exitTime);

    mockCallHandler = {
      handle: () => of(null), // Handler returns null
    };

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      expect(result).toEqual({
        data: null,
        entryTime,
        exitTime,
      });
      done();
    });
  });
});
