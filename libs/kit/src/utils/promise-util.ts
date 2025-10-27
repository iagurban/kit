import { ExMap } from '../collections/ex-map';
import { Errors } from '../core/errors';

export class CancelledError extends Error {
  constructor(reason: string) {
    super(`Cancelled with reason: ${reason}`);
  }
}

export class PromiseController {
  private _aborted = false;

  private readonly onAborts = new ExMap<(reason: string) => void, number>();

  get aborted() {
    return this._aborted;
  }

  abort(reason: string) {
    if (this._aborted) {
      return;
    }
    this._aborted = true;
    const errors: unknown[] = [];
    for (const v of this.onAborts.keys()) {
      try {
        v(reason);
      } catch (e) {
        errors.push(e);
      }
    }
    this.onAborts.clear();
    if (errors.length > 0) {
      throw new Errors(errors);
    }
  }

  on(fn: (reason: string) => void): void {
    this.onAborts.update(fn, n => (n || 0) + 1);
  }

  off(fn: (reason: string) => void, all = false): void {
    const count = this.onAborts.get(fn);
    if (count === undefined) {
      return;
    }
    if (all || count === 1) {
      this.onAborts.delete(fn);
    } else {
      this.onAborts.set(fn, count - 1);
    }
  }
}
