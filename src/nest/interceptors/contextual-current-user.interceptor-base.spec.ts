import { AsyncLocalStorage } from 'node:async_hooks';

import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

import { getCurrentUserFromExeContext } from '../decorators/current-user.decorator-base';
import { ContextualCurrentUserInterceptorBase } from './contextual-current-user.interceptor-base';

// Mock the user extraction function
jest.mock('../decorators/current-user.decorator-base', () => ({
  getCurrentUserFromExeContext: jest.fn(),
}));

const mockedGetCurrentUser = getCurrentUserFromExeContext as jest.Mock;

// Define a user type for testing
type User = { id: number; name: string };

class UserContextInterceptor extends ContextualCurrentUserInterceptorBase<User> {
  // The static storage instance
  private static storage = new AsyncLocalStorage<User>();

  // Provide the storage instance
  getStorage() {
    return UserContextInterceptor.storage;
  }

  // Helper to get the current user from storage
  static getCurrentUser(): User | undefined {
    return UserContextInterceptor.storage.getStore();
  }
}

describe('ContextualCurrentUserInterceptorBase', () => {
  let interceptor: UserContextInterceptor;
  let mockExecutionContext: ExecutionContext;
  let mockCallHandler: CallHandler;

  beforeEach(() => {
    interceptor = new UserContextInterceptor();
    mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({}),
      }),
    } as ExecutionContext;
    jest.clearAllMocks();
  });

  it('should extract user, run it in storage, and call next.handle()', done => {
    const mockUser: User = { id: 1, name: 'John Doe' };
    const responseData = { result: 'success' };

    // Mock the user extraction to return our test user
    mockedGetCurrentUser.mockReturnValue(mockUser);

    // Mock next.handle() to return an observable and check storage
    mockCallHandler = {
      handle: jest.fn(() => {
        // Inside the handler, check if the user is available in async storage
        const userFromStorage = UserContextInterceptor.getCurrentUser();
        expect(userFromStorage).toBe(mockUser);
        return of(responseData);
      }),
    };

    const storageRunSpy = jest.spyOn(interceptor.getStorage(), 'run');

    const result$ = interceptor.intercept(mockExecutionContext, mockCallHandler);

    result$.subscribe(result => {
      // Verify the final result is passed through
      expect(result).toBe(responseData);

      // Verify that getCurrentUserFromExeContext was called
      expect(mockedGetCurrentUser).toHaveBeenCalledWith(mockExecutionContext);

      // Verify that storage.run was called with the user
      expect(storageRunSpy).toHaveBeenCalledWith(mockUser, expect.any(Function));

      // Verify that next.handle was called
      expect(mockCallHandler.handle).toHaveBeenCalledTimes(1);

      done();
    });
  });

  it('should throw an error if the user is not found in the context', () => {
    // Mock the user extraction to return null
    mockedGetCurrentUser.mockReturnValue(null);

    mockCallHandler = {
      handle: () => of({}),
    };

    // The interceptor uses notNull, which should throw if the user is null
    expect(() => interceptor.intercept(mockExecutionContext, mockCallHandler)).toThrow('arg is null');
  });
});
