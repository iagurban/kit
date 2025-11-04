import { once } from './once';

type ListenerArgs<T> = T extends readonly any[] ? T : [T];

export interface Listener<T> {
  (...args: ListenerArgs<T>): void;
}

export class Emitter<T extends Record<string, unknown>> {
  private subs: { [K in keyof T]?: Listener<T[K]>[] } = {};
  private onces: { [K in keyof T]?: Listener<T[K]>[] } = {};

  get ro() {
    return this as Omit<this, 'emit'>;
  }

  on = <E extends keyof T>(e: E, listener: Listener<T[E]>): (() => void) => {
    const l = this.subs[e];
    if (l) {
      l.push(listener);
    } else {
      this.subs[e] = [listener];
    }
    return () => this.off<E>(e, listener);
  };

  once = <E extends keyof T>(e: E, listener: Listener<T[E]>): void => {
    const ls = this.onces[e];
    if (ls) {
      ls.push(listener);
    } else {
      this.onces[e] = [listener];
    }
  };

  off = <E extends keyof T>(e: E, listener: Listener<T[E]>) => {
    const ls = this.subs[e];
    if (!ls) {
      return;
    }
    const callbackIndex = ls.indexOf(listener);
    if (callbackIndex > -1) {
      ls.splice(callbackIndex, 1);
    }
  };

  emit = <E extends keyof T>(e: E, ...data: ListenerArgs<T[E]>) => {
    {
      const ls = this.subs[e];
      if (ls) {
        for (const l of ls) {
          l(...data);
        }
      }
    }

    {
      const ls = this.onces[e];
      if (ls?.length) {
        delete this.onces[e];
        for (const l of ls) {
          l(...data);
        }
      }
    }
  };

  @once
  get subscriberInterface(): {
    on: <E extends keyof T>(e: E, listener: Listener<T[E]>) => () => void;
    off: <E extends keyof T>(e: E, listener: Listener<T[E]>) => void;
    once: <E extends keyof T>(e: E, listener: Listener<T[E]>) => void;
    ro: Omit<Emitter<T>, 'emit'>;
  } {
    return {
      on: this.on,
      off: this.off,
      once: this.once,
      ro: this.ro,
    };
  }
}
