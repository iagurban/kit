import { ILogger, IPubSubSubscriberService } from '../core';
import { RedisPubsubSubscription } from './redis-pubsub-subscription';

// Mock implementation of IPubSubSubscriberService for testing
class MockSubscriber implements IPubSubSubscriberService {
  private messageListeners: Set<(channel: string, message: string) => void> = new Set();
  private readyListeners: Set<() => void> = new Set();
  public subscriptions: Map<string, Set<(error: Error | null, message: unknown) => void>> = new Map();

  onMessage(
    event: 'on' | 'off',
    listener: (channel: string, message: string) => void
  ): IPubSubSubscriberService {
    if (event === 'on') {
      this.messageListeners.add(listener);
    } else {
      this.messageListeners.delete(listener);
    }
    return this;
  }

  onReady(event: 'on' | 'off', listener: () => void): IPubSubSubscriberService {
    if (event === 'on') {
      this.readyListeners.add(listener);
    } else {
      this.readyListeners.delete(listener);
    }
    return this;
  }

  subscribe(
    ...args: [...channels: (string | Buffer)[], callback: (error: Error | null, message: unknown) => void]
  ): Promise<unknown> {
    const channels = args.slice(0, -1) as (string | Buffer)[];
    const callback = args.at(-1) as (error: Error | null, message: unknown) => void;
    for (const channel of channels) {
      const c = typeof channel === `string` ? channel : channel.toString();
      if (!this.subscriptions.has(c)) {
        this.subscriptions.set(c, new Set());
      }
      this.subscriptions.get(c)!.add(callback);
    }
    return Promise.resolve();
  }

  unsubscribe(
    ...args: [...channels: (string | Buffer)[], callback: (error: Error | null, message: unknown) => void]
  ): Promise<unknown> {
    const channels = args.slice(0, -1) as (string | Buffer)[];
    const callback = args.at(-1) as (error: Error | null, message: unknown) => void;
    for (const channel of channels) {
      const c = typeof channel === `string` ? channel : channel.toString();
      if (this.subscriptions.has(c)) {
        this.subscriptions.get(c)!.delete(callback);
      }
    }
    return Promise.resolve();
  }

  // --- Test helpers ---
  simulateMessage(channel: string, message: any) {
    this.messageListeners.forEach(listener => listener(channel, message as string));
  }

  simulateReady() {
    this.readyListeners.forEach(listener => listener());
  }

  simulateSubscriptionError(channel: string, error: Error) {
    const callbacks = this.subscriptions.get(channel);
    if (callbacks) {
      callbacks.forEach(cb => cb(error, null));
    }
  }
}

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

describe('RedisPubsubSubscription', () => {
  let subscriber: MockSubscriber;
  let subscription: RedisPubsubSubscription;
  const channel = 'test-channel';

  beforeEach(() => {
    jest.useFakeTimers();
    subscriber = new MockSubscriber();
    // Clear mocks before each test to have clean assertions
    Object.values(mockLogger).forEach(mockFn => (mockFn as jest.Mock).mockClear());
  });

  afterEach(async () => {
    if (subscription) {
      await subscription.deactivate();
    }
    jest.useRealTimers();
  });

  it('should subscribe on activation and unsubscribe on deactivation', async () => {
    const onSubscribed = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, {
      onSubscribed,
      onMessage: jest.fn(),
    });

    await subscription.activate();
    expect(subscriber.subscriptions.has(channel)).toBe(true);
    expect(onSubscribed).toHaveBeenCalled();

    await subscription.deactivate();
    expect(subscriber.subscriptions.get(channel)?.size ?? 0).toBe(0);
  });

  it('should handle string messages', async () => {
    const onMessage = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage });
    await subscription.activate();

    const message = 'hello world';
    subscriber.simulateMessage(channel, message);

    expect(onMessage).toHaveBeenCalledWith(message);
  });

  it('should handle buffer messages with onBuffer handler', async () => {
    const onBuffer = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, {
      onMessage: jest.fn(),
      onBuffer,
    });
    await subscription.activate();

    const buffer = Buffer.from('hello buffer');
    subscriber.simulateMessage(channel, buffer);

    expect(onBuffer).toHaveBeenCalledWith(buffer);
  });

  it('should handle buffer messages with onMessage if onBuffer is not provided', async () => {
    const onMessage = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage });
    await subscription.activate();

    const buffer = Buffer.from('hello buffer');
    subscriber.simulateMessage(channel, buffer);

    expect(onMessage).toHaveBeenCalledWith('hello buffer');
  });

  it('should call onError when message handling fails', async () => {
    const error = new Error('Processing failed');
    const onMessage = jest.fn(() => {
      throw error;
    });
    const onError = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage, onError });
    await subscription.activate();

    const message = 'test message';
    subscriber.simulateMessage(channel, message);

    expect(onError).toHaveBeenCalledWith(error, message);
  });

  it('should attempt to resubscribe on connection ready event', async () => {
    const onSubscribed = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, {
      onSubscribed,
      onMessage: jest.fn(),
    });
    await subscription.activate();
    expect(onSubscribed).toHaveBeenCalledTimes(1);

    // Simulate a reconnect
    subscriber.simulateReady();
    await Promise.resolve(); // allow promises to resolve

    expect(onSubscribed).toHaveBeenCalledTimes(2);
  });

  it('should retry subscription on failure', async () => {
    const subscribeSpy = jest.spyOn(subscriber, 'subscribe');
    const error = new Error('Subscription failed');
    subscribeSpy.mockRejectedValueOnce(error);

    const onSubscribed = jest.fn();
    const onError = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, {
      onSubscribed,
      onMessage: jest.fn(),
      onError,
    });

    const activationPromise = subscription.activate();

    // Initial attempt fails
    await jest.advanceTimersByTimeAsync(1);
    expect(mockLogger.error).toHaveBeenCalledWith({ error }, expect.stringContaining('Failed to subscribe'));

    // Second attempt succeeds
    subscribeSpy.mockResolvedValueOnce(undefined);
    await jest.advanceTimersByTimeAsync(5000);

    await activationPromise;

    expect(onSubscribed).toHaveBeenCalled();
    expect(subscribeSpy).toHaveBeenCalledTimes(2);
  });

  // --- Edge Cases ---

  it('should handle errors in onSubscribed and attempt to retry', async () => {
    const error = new Error('onSubscribed failed');
    const onSubscribed = jest.fn().mockImplementation(() => {
      // Fail only on the first attempt
      if (onSubscribed.mock.calls.length === 1) {
        throw error;
      }
    });
    const unsubscribeSpy = jest.spyOn(subscriber, 'unsubscribe');
    const subscribeSpy = jest.spyOn(subscriber, 'subscribe');

    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, {
      onSubscribed,
      onMessage: jest.fn(),
    });

    const activationPromise = subscription.activate();

    // Let the first attempt fail
    await jest.advanceTimersByTimeAsync(1);
    expect(onSubscribed).toHaveBeenCalledTimes(1);
    expect(unsubscribeSpy).toHaveBeenCalledTimes(1); // It should unsubscribe after the failed onSubscribed
    expect(mockLogger.error).toHaveBeenCalledWith({ error }, expect.stringContaining('Failed to subscribe'));

    // Let the second attempt succeed
    await jest.advanceTimersByTimeAsync(5000);
    await activationPromise;

    expect(onSubscribed).toHaveBeenCalledTimes(2);
    expect(subscribeSpy).toHaveBeenCalledTimes(2);
  });

  it('should log an error if onError handler is not provided', async () => {
    const error = new Error('Processing failed');
    const onMessage = jest.fn(() => {
      throw error;
    });
    // No onError handler provided
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage });
    await subscription.activate();

    const message = 'test message';
    subscriber.simulateMessage(channel, message);

    expect(mockLogger.error).toHaveBeenCalledWith(
      { error, message },
      'Unhandled Redis subscription error (onError is not defined)'
    );
  });

  it('should be idempotent on multiple activate calls', async () => {
    const onReadySpy = jest.spyOn(subscriber, 'onReady');
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage: jest.fn() });

    await subscription.activate();
    await subscription.activate();

    // onReady and onMessage should only be registered once
    expect(onReadySpy).toHaveBeenCalledTimes(1);
  });

  it('should be idempotent on multiple deactivate calls', async () => {
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage: jest.fn() });
    await subscription.activate();

    const offReadySpy = jest.spyOn(subscriber, 'onReady');
    await subscription.deactivate();
    await subscription.deactivate();

    // Listeners should only be removed once
    expect(offReadySpy).toHaveBeenCalledTimes(1);
  });

  it('should gracefully deactivate while in a retry loop', async () => {
    const subscribeSpy = jest.spyOn(subscriber, 'subscribe');
    const error = new Error('Subscription failed');
    subscribeSpy.mockRejectedValue(error); // Always fail

    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage: jest.fn() });
    const activationPromise = subscription.activate();

    // Let it fail once
    await jest.advanceTimersByTimeAsync(1);
    expect(mockLogger.error).toHaveBeenCalledTimes(1);

    // Deactivate while it's waiting to retry
    await subscription.deactivate();

    // Advance time past the retry delay
    await jest.advanceTimersByTimeAsync(5000);

    // It should not have retried
    expect(subscribeSpy).toHaveBeenCalledTimes(1);
    await activationPromise; // The initial promise should resolve without error
  });

  it('should ignore messages from other channels', async () => {
    const onMessage = jest.fn();
    subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage });
    await subscription.activate();

    subscriber.simulateMessage('another-channel', 'some other message');

    expect(onMessage).not.toHaveBeenCalled();
  });

  describe('Coverage-specific Tests', () => {
    it('should call onError when a subscription error is received', async () => {
      const error = new Error('Subscription error');
      const onError = jest.fn();

      subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, {
        onMessage: jest.fn(),
        onError,
      });
      await subscription.activate();

      // Simulate an error being passed to the callback from the subscriber
      subscriber.simulateSubscriptionError(channel, error);

      expect(onError).toHaveBeenCalledWith(error, null);
    });

    it('should warn on unknown message types', async () => {
      const onMessage = jest.fn();
      subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage });
      await subscription.activate();

      const message = { data: 'some object' };
      subscriber.simulateMessage(channel, message);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        { message },
        'Unknown message type has come to subscription'
      );
      expect(onMessage).not.toHaveBeenCalled();
    });

    it('should ignore integer message type', async () => {
      const onMessage = jest.fn();
      subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage });
      await subscription.activate();

      const message = 1;
      subscriber.simulateMessage(channel, message);

      expect(mockLogger.warn).not.toHaveBeenCalled();
      expect(onMessage).not.toHaveBeenCalled();
    });

    it('should unsubscribe immediately if deactivated during subscription', async () => {
      let resolveSubscribe: () => void;
      const subscribePromise = new Promise<void>(resolve => (resolveSubscribe = resolve));
      const subscribeSpy = jest.spyOn(subscriber, 'subscribe').mockReturnValue(subscribePromise);
      const unsubscribeSpy = jest.spyOn(subscriber, 'unsubscribe');

      subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage: jest.fn() });
      const activationPromise = subscription.activate();

      // Wait for subscribe to be called, but it will be hanging
      await jest.advanceTimersByTimeAsync(1);
      expect(subscribeSpy).toHaveBeenCalledTimes(1);

      // Deactivate while subscribe is in progress
      const deactivationPromise = subscription.deactivate();

      // Now let the subscription resolve
      resolveSubscribe!();

      await activationPromise;
      await deactivationPromise;

      // Unsubscribe is called by `deactivate` AND by the `resubscribe` cleanup logic.
      expect(unsubscribeSpy).toHaveBeenCalledTimes(2);
    });

    it('should not subscribe if resubscribe is called on an inactive instance', async () => {
      const subscribeSpy = jest.spyOn(subscriber, 'subscribe');
      subscription = new RedisPubsubSubscription(mockLogger, subscriber, channel, { onMessage: jest.fn() });

      // Activate and immediately deactivate to set `active` to false
      await subscription.activate();
      await subscription.deactivate();

      // Reset the spy to ignore the call from the initial activation
      subscribeSpy.mockClear();

      // Manually call the private method after deactivation
      await (subscription as any).resubscribe();

      // The `resubscribe` method should have exited early
      expect(subscribeSpy).not.toHaveBeenCalled();
    });
  });
});
