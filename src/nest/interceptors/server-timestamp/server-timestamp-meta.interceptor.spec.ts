import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

import { ServerTimestampMetaInterceptor } from './server-timestamp-meta.interceptor';

describe('ServerTimestampMetaInterceptor', () => {
  let interceptor: ServerTimestampMetaInterceptor;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  const mockDateNow = jest.spyOn(Date, 'now');

  beforeEach(() => {
    interceptor = new ServerTimestampMetaInterceptor();
    mockExecutionContext = {} as ExecutionContext;
    jest.clearAllMocks();
  });

  it('should add __sync metadata to the response object', done => {
    const initialData = { message: 'hello', value: 42 };
    const entryTime = 1672531200000; // 2023-01-01 00:00:00 UTC
    const exitTime = 1672531200100; // 100ms later

    mockDateNow.mockReturnValueOnce(entryTime).mockReturnValueOnce(exitTime);

    mockCallHandler = {
      handle: () => of(initialData),
    };

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      expect(result).toEqual({
        ...initialData,
        __sync: {
          t1: entryTime,
          t2: exitTime,
        },
      });
      done();
    });
  });

  it('should create the response object if the handler returns null', done => {
    const entryTime = 1672531201000;
    const exitTime = 1672531201200;

    mockDateNow.mockReturnValueOnce(entryTime).mockReturnValueOnce(exitTime);

    mockCallHandler = {
      handle: () => of(null), // Handler returns null
    };

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      expect(result).toEqual({
        __sync: {
          t1: entryTime,
          t2: exitTime,
        },
      });
      done();
    });
  });

  it('should overwrite an existing __sync property on the data', done => {
    const initialData = {
      message: 'hello',
      __sync: 'old value', // Pre-existing __sync property
    };
    const entryTime = 1672531202000;
    const exitTime = 1672531202300;

    mockDateNow.mockReturnValueOnce(entryTime).mockReturnValueOnce(exitTime);

    mockCallHandler = {
      handle: () => of(initialData),
    };

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      expect(result).toEqual({
        message: 'hello',
        __sync: {
          t1: entryTime,
          t2: exitTime,
        },
      });
      done();
    });
  });
});
