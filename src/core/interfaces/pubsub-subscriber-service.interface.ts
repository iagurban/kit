type Callback<T> = (err?: Error | null, result?: T) => void;

export interface IPubSubSubscriberService {
  subscribe(...args: [...channels: (string | Buffer)[], callback: Callback<unknown>]): Promise<unknown>;
  unsubscribe(...args: [...channels: (string | Buffer)[], callback: Callback<unknown>]): Promise<unknown>;
  onMessage(action: `on` | `off`, fn: (channel: string, message: string) => void): IPubSubSubscriberService;
  onReady(action: `on` | `off`, fn: () => void): IPubSubSubscriberService;
}
