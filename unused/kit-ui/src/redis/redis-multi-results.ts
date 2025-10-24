import Redis, { ChainableCommander } from 'ioredis';

export class RedisMultiResults {
  readonly commands: ((redis: ChainableCommander) => void)[] = [];
  readonly results: [number, (result: unknown, error: Error | null) => void][] = [];
  private done = false;

  command(
    call: (redis: ChainableCommander) => void,
    onResult?: (result: unknown, error: Error | null) => void
  ) {
    if (this.done) {
      throw new Error('builder already executed');
    }
    if (onResult) {
      this.results.push([this.commands.length, onResult]);
    }
    this.commands.push(call);
    return this;
  }

  async call(redis: Redis) {
    if (this.done) {
      throw new Error('builder already executed');
    }
    this.done = true;

    const m = redis.multi();
    for (const c of this.commands) {
      c(m);
    }
    const r = await m.exec();
    if (!r) {
      throw new Error('result is null');
    }
    for (const [i, c] of this.results) {
      const [e, v] = r[i];
      c(v, e);
    }
  }
}
