import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

import { ServerTimestampPreciseInterceptor } from './server-timestamp-precise.interceptor';

describe('ServerTimestampPreciseInterceptor', () => {
  let interceptor: ServerTimestampPreciseInterceptor;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  const mockDateNow = jest.spyOn(Date, 'now');

  beforeEach(() => {
    interceptor = new ServerTimestampPreciseInterceptor();
    mockExecutionContext = {} as ExecutionContext;
    jest.clearAllMocks();
  });

  it('should return a timestamp string and ignore the initial data', done => {
    const initialData = { message: 'this should be ignored' };
    const entryTime = 1672531200000;
    const exitTime = 1672531200100;

    mockDateNow.mockReturnValueOnce(entryTime).mockReturnValueOnce(exitTime);

    mockCallHandler = {
      handle: () => of(initialData),
    };

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      expect(result).toBe(`${entryTime}:${exitTime}`);
      done();
    });
  });

  it('should return a timestamp string even if the handler returns null', done => {
    const entryTime = 1672531201000;
    const exitTime = 1672531201200;

    mockDateNow.mockReturnValueOnce(entryTime).mockReturnValueOnce(exitTime);

    mockCallHandler = {
      handle: () => of(null), // Handler returns null
    };

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      expect(result).toBe(`${entryTime}:${exitTime}`);
      done();
    });
  });
});
