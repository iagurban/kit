export class FunctionsQueue {
  constructor(...fns: readonly (() => void)[]) {
    this.fns = [...fns];
  }

  private readonly fns: (() => void)[];

  readonly add = (...fns: readonly (() => void)[]) => {
    this.fns.push(...fns);
    return this;
  };

  readonly remove = (fn: () => void) => {
    const idx = this.fns.indexOf(fn);
    if (idx < 0) {
      return false;
    }
    this.fns.splice(idx, 1);
    return true;
  };

  readonly clear = () => {
    this.fns.splice(0, this.fns.length);
  };

  readonly fire = (clear = true) => {
    const old = [...this.fns];
    clear && this.clear();

    for (const [i, v] of old.entries()) {
      try {
        v();
      } catch (error) {
        // copy rest back to queue
        this.fns.splice(0, 0, ...old.slice(i));
        throw error;
      }
    }
  };

  readonly execute = () => {
    return this.fire(false);
  };

  get size() {
    return this.fns.length;
  }
}

export const callableFunctionsQueue = (method: `fire` | `execute`, ...fns: readonly (() => void)[]) => {
  const queue = new FunctionsQueue(...fns);
  return Object.assign(() => queue[method](), { queue });
};
