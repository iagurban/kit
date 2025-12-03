import { ILogger, IPubSubSubscriberService } from '../core';
import { CachedResource } from './cached-resource';

const mockLogger: ILogger = {
  child: jest.fn().mockReturnThis(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn(),
  trace: jest.fn(),
  silent: jest.fn(),
};

describe('CachedResource', () => {
  let mockSubscriber: jest.Mocked<IPubSubSubscriberService>;
  let fetchFn: jest.Mock<Promise<string>>;
  let onLoaded: jest.Mock;
  let resource: CachedResource<string>;

  let onMessageListener: (channel: string, message: string) => void;

  const resourceName = 'test-resource';
  const channel = 'test-channel';

  beforeEach(() => {
    jest.clearAllMocks();

    fetchFn = jest.fn();
    onLoaded = jest.fn();

    mockSubscriber = {
      onMessage: jest.fn().mockImplementation((_event, listener) => {
        onMessageListener = listener;
        return mockSubscriber;
      }),
      onReady: jest.fn().mockImplementation((_event, listener) => {
        // Immediately invoke the onReady listener to simulate a successful connection
        listener();
        return mockSubscriber;
      }),
      subscribe: jest.fn().mockResolvedValue(undefined),
      unsubscribe: jest.fn().mockResolvedValue(undefined),
    };

    resource = new CachedResource(resourceName, fetchFn, mockSubscriber, channel, mockLogger, {
      loaded: onLoaded,
    });
  });

  afterEach(async () => {
    await resource.destroy();
  });

  it('should fetch data on initialization', async () => {
    fetchFn.mockResolvedValue('initial data');

    await resource.initialize();

    expect(fetchFn).toHaveBeenCalledTimes(1);
    const data = await resource.fetch();
    expect(data).toBe('initial data');
    expect(onLoaded).toHaveBeenCalledWith('initial data');
  });

  it('should initialize with undefined "on" parameter', () => {
    const r = new CachedResource(resourceName, fetchFn, mockSubscriber, channel, mockLogger);
    expect((r as any).on).toBeDefined();
  });

  it('should use cached data on subsequent fetches', async () => {
    fetchFn.mockResolvedValue('some data');
    await resource.initialize();
    expect(fetchFn).toHaveBeenCalledTimes(1);

    const data1 = await resource.fetch();
    const data2 = await resource.fetch();

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(data1).toBe('some data');
    expect(data2).toBe(data1);
  });

  it('should force a refetch when fetch(true) is called', async () => {
    fetchFn.mockResolvedValueOnce('first call').mockResolvedValueOnce('second call');
    await resource.initialize();
    expect(fetchFn).toHaveBeenCalledTimes(1);

    const data1 = await resource.fetch();
    expect(data1).toBe('first call');

    const data2 = await resource.fetch(true);
    expect(data2).toBe('second call');
    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('should refetch and notify subscribers on a pub/sub message', async () => {
    fetchFn.mockResolvedValueOnce('initial').mockResolvedValueOnce('updated');
    await resource.initialize();
    expect(fetchFn).toHaveBeenCalledTimes(1);

    const subscriberCallback = jest.fn();
    resource.subscribe(subscriberCallback);

    expect(onMessageListener).toBeDefined();
    onMessageListener(channel, 'update notification');

    expect(fetchFn).toHaveBeenCalledTimes(2);
    expect(subscriberCallback).toHaveBeenCalledWith(resource);

    const data = await resource.fetch();
    expect(data).toBe('updated');
    expect(onLoaded).toHaveBeenCalledWith('updated');
  });

  it('should allow unsubscribing from updates', async () => {
    // Add mock implementation for the initial fetch to prevent timeout
    fetchFn.mockResolvedValue('default data');
    await resource.initialize();

    const subscriberCallback = jest.fn();
    const unsubscribe = resource.subscribe(subscriberCallback);

    unsubscribe();

    onMessageListener(channel, 'another message');
    expect(subscriberCallback).not.toHaveBeenCalled();
  });

  it('should unsubscribe from the Redis channel on destroy', async () => {
    // Add mock implementation for the initial fetch to prevent timeout
    fetchFn.mockResolvedValue('default data');
    await resource.initialize();

    await resource.destroy();

    expect(mockSubscriber.onMessage).toHaveBeenCalledWith('off', expect.any(Function));
    expect(mockSubscriber.onReady).toHaveBeenCalledWith('off', expect.any(Function));
    expect(mockSubscriber.unsubscribe).toHaveBeenCalledWith(channel, expect.any(Function));
  });

  // --- Edge Cases and Error Handling ---

  it('should handle fetchFn rejection and allow retrying', async () => {
    const fetchError = new Error('Fetch failed');
    fetchFn.mockRejectedValueOnce(fetchError);

    await resource.initialize();
    expect(fetchFn).toHaveBeenCalledTimes(1);

    // The first fetch should fail
    await expect(resource.fetch()).rejects.toThrow(fetchError);

    // A subsequent fetch (without a new trigger) should return the same failed promise
    await expect(resource.fetch()).rejects.toThrow(fetchError);

    // Now, trigger a refetch via a pub/sub message, which should succeed
    fetchFn.mockResolvedValueOnce('successful data');
    onMessageListener(channel, 'retry notification');
    expect(fetchFn).toHaveBeenCalledTimes(2);

    // The new fetch should succeed
    await expect(resource.fetch()).resolves.toBe('successful data');
  });

  it('should log an error if the on.loaded handler throws', async () => {
    const handlerError = new Error('Handler failed');
    onLoaded.mockImplementation(() => {
      throw handlerError;
    });
    fetchFn.mockResolvedValue('some data');

    await resource.initialize();

    expect(onLoaded).toHaveBeenCalledWith('some data');
    expect(mockLogger.error).toHaveBeenCalledWith(
      { error: handlerError },
      expect.stringContaining('on.loaded handler thrown unhandled exception')
    );
  });

  it('should handle race conditions by prioritizing the latest fetch', async () => {
    let resolveFetch1: (value: string) => void;
    const fetch1Promise = new Promise<string>(resolve => {
      resolveFetch1 = resolve;
    });

    let resolveFetch2: (value: string) => void;
    const fetch2Promise = new Promise<string>(resolve => {
      resolveFetch2 = resolve;
    });

    fetchFn.mockReturnValueOnce(fetch1Promise);
    const promise1 = resource.fetch(true); // First fetch starts

    fetchFn.mockReturnValueOnce(fetch2Promise);
    const promise2 = resource.fetch(true); // Second fetch starts immediately, replacing the first

    // The resource's internal promise should now be the second one
    expect(resource.fetch()).toBe(promise2);

    // Resolve the second fetch first
    resolveFetch2!('data 2');
    await promise2;

    // Now resolve the first fetch (which is now orphaned)
    resolveFetch1!('data 1');
    // We need to catch the rejection of the orphaned promise, as its `then` block will never be called
    await promise1.catch(() => {});

    // The final data should be from the second (and latest) fetch
    const finalData = await resource.fetch();
    expect(finalData).toBe('data 2');

    // onLoaded should only be called for the winning promise
    expect(onLoaded).toHaveBeenCalledWith('data 2');
    expect(onLoaded).not.toHaveBeenCalledWith('data 1');
  });

  it('should continue notifying subscribers even if one throws an error', async () => {
    fetchFn.mockResolvedValue('default data');
    await resource.initialize();

    const erroringSubscriber = jest.fn(() => {
      throw new Error('Subscriber failed');
    });
    const workingSubscriber = jest.fn();

    resource.subscribe(erroringSubscriber);
    resource.subscribe(workingSubscriber);

    // This will likely fail without a try/catch in the CachedResource subscriber loop
    expect(() => {
      onMessageListener(channel, 'notification');
    }).not.toThrow();

    // Both subscribers should have been called
    expect(erroringSubscriber).toHaveBeenCalledTimes(1);
    expect(workingSubscriber).toHaveBeenCalledTimes(1);
  });
});
