export class PromiseController {
  private _aborted = false;

  private readonly onAborts = new Map<unknown, () => void>();

  get aborted() {
    return this._aborted;
  }

  abort() {
    if (!this._aborted) {
      this._aborted = true;
      for (const v of this.onAborts.values()) {
        v();
      }
      this.onAborts.clear();
    }
  }

  onAbort(fn: () => void): () => void {
    const id = Object.create(null);
    this.onAborts.set(id, fn);
    return () => void this.onAborts.delete(id);
  }
}

const patch =
  <A>(fn0: () => void, fn1: (a: A) => void) =>
  (a: A) => {
    fn0();
    return fn1(a);
  };

export const patchRR = <V>(
  fn: () => void,
  resolve: (v: V | PromiseLike<V>) => void,
  reject: (e: unknown) => void
) => {
  return [patch(fn, resolve), patch(fn, reject)] as const;
};
