type Callback<T> = (err?: Error | null, result?: T) => void;

/**
 * Interface representing a Pub/Sub subscriber service.
 */
export interface IPubSubSubscriberService {
  subscribe(...args: [...channels: (string | Buffer)[], callback: Callback<unknown>]): Promise<unknown>;
  unsubscribe(...args: [...channels: (string | Buffer)[], callback: Callback<unknown>]): Promise<unknown>;
  onReady(action: `on` | `off`, fn: () => void): IPubSubSubscriberService;
  onMessage(action: `on` | `off`, fn: (channel: string, message: string) => void): IPubSubSubscriberService;
}
