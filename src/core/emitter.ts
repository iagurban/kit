import { Errors } from './errors/errors';
import { catching } from './flow/catching';

type ListenerArgs<T> = T extends readonly unknown[] ? T : [T];

export interface Listener<T> {
  (...args: ListenerArgs<T>): void;
}

type Listeners<T extends Record<string, readonly unknown[]>> = { [K in keyof T]?: Listener<T[K]>[] };

/**
 * A generic Emitter class that implements an event emitter pattern.
 * This class allows adding event listeners for specific events, emitting events, and managing listeners.
 *
 * @template T A record type where keys represent event names, and values are tuple types describing
 *            the arguments expected by listeners for that event.
 */
export class Emitter<T extends Record<string, readonly unknown[]>> {
  private subs: Listeners<T> = {};
  private onces: Listeners<T> = {};

  get ro() {
    return this as Omit<this, 'emit'>;
  }

  private addHandler<E extends keyof T>(src: Listeners<T>, e: E, listener: Listener<T[E]>) {
    const l = src[e];
    if (l) {
      l.push(listener);
    } else {
      src[e] = [listener];
    }
    return () => this.removeHandler<E>(src, e, listener);
  }

  private removeHandler<E extends keyof T>(src: Listeners<T>, e: E, listener: Listener<T[E]>) {
    const ls = src[e];
    if (!ls) {
      return;
    }
    const callbackIndex = ls.indexOf(listener);
    if (callbackIndex > -1) {
      if (ls.length > 1) {
        ls.splice(callbackIndex, 1);
      } else {
        delete src[e];
      }
    }
  }

  /**
   * Registers an event listener for a specified event type and returns a function to remove the listener.
   *
   * @template E - The type of the event key.
   * @template T - The type of the event mappings object.
   * @param {E} e - The event type to listen for.
   * @param {Listener<T[E]>} listener - The callback function to invoke when the event is emitted.
   * @returns {() => void} A function that, when executed, removes the registered event listener.
   */
  on = <E extends keyof T>(e: E, listener: Listener<T[E]>): (() => void) =>
    this.addHandler(this.subs, e, listener);

  /**
   * Registers a one-time event listener for a specific event type. The listener will be automatically
   * removed after its first invocation. Returns a function to manually remove the listener before it
   * is triggered.
   *
   * @template T - The type representing the events and their corresponding data.
   * @template E - The name of the specific event to listen to.
   * @param {E} e - The event name to register the listener for.
   * @param {Listener<T[E]>} listener - The listener function to execute when the event is triggered.
   * @returns {() => void} A function to manually remove this listener.
   */
  once = <E extends keyof T>(e: E, listener: Listener<T[E]>): (() => void) =>
    this.addHandler(this.onces, e, listener);

  /**
   * Removes the specified event listener for the given event from both persistent
   * and one-time listener collections. This method ensures that the listener is
   * no longer invoked when the specified event is emitted.
   *
   * @template E - The type of event key within the event map.
   * @param {E} e - The event key for which the listener should be removed.
   * @param {Listener<T[E]>} listener - The listener function to remove.
   */
  off = <E extends keyof T>(e: E, listener: Listener<T[E]>): void => {
    for (const src of [this.subs, this.onces]) {
      this.removeHandler(src, e, listener);
    }
  };

  /**
   * Emits an event of the specified type, passing along any additional data to the registered listeners.
   * It invokes both persistent and one-time listeners for the given event.
   * If any listener throws an error during execution, those errors are collected and thrown as a group.
   *
   * @template T - The event map type, where keys represent event names and values specify the argument types for those events.
   * @template E - A specific event name, constrained to the keys of the event map T.
   *
   * @param {E} e - The name of the event to emit.
   * @param {...ListenerArgs<T[E]>} data - The additional arguments to pass to the listeners of the specified event.
   * @throws {Errors} If any of the listeners throw an error, those errors are collected and thrown together as a single error instance.
   */
  emit = <E extends keyof T>(e: E, ...data: ListenerArgs<T[E]>) => {
    const errors: unknown[] = [];

    {
      const ls = this.subs[e];
      if (ls) {
        for (const l of [...ls]) {
          catching(
            () => l(...data),
            error => void errors.push(error)
          );
        }
      }
    }

    {
      const ls = this.onces[e];
      if (ls?.length) {
        delete this.onces[e];
        for (const l of [...ls]) {
          catching(
            () => l(...data),
            error => void errors.push(error)
          );
        }
      }
    }

    if (errors.length) {
      throw new Errors(errors);
    }
  };
}
