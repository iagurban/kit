import { useCallback, useEffect, useRef } from 'react';

import { once } from '../../core/once';

class GraphNodeViewStore {
  callback: ((e: ResizeObserverEntry) => void) | null = null;

  setCallback(callback: typeof this.callback) {
    this.callback = callback;
  }

  @once
  get observer() {
    return new ResizeObserver(entries => this.observed(entries));
  }

  readonly ref = {
    observer: () => this.observer,
    _current: null as HTMLDivElement | null,
    get current() {
      return this._current;
    },
    set current(c: HTMLDivElement | null) {
      if (this._current === c) {
        return;
      }

      this._current && this.observer().unobserve(this._current);
      this._current = c;
      c && this.observer().observe(c);
    },
  };

  observed(entries: readonly ResizeObserverEntry[]) {
    if (!this.callback) {
      return;
    }
    const found = entries.find(e => e.target === this.ref.current);
    found && this.callback(found);
  }

  destroy() {
    this.ref.current = null;
  }
}

/**
 * useResizeObserver is a custom hook that creates a reference to a `GraphNodeViewStore`
 * instance for handling resize events using a provided callback function.
 *
 * @param {function} callback - A function that will be triggered when a resize event occurs.
 *                              It receives a single parameter of type `ResizeObserverEntry`,
 *                              which contains details of the resize event.
 * @returns {GraphNodeViewStore} Returns an instance of `GraphNodeViewStore` that manages
 *                               the resize observer and its lifecycle.
 */
export const useResizeObserver = (callback: (e: ResizeObserverEntry) => void): GraphNodeViewStore => {
  const watchingRef = useRef<GraphNodeViewStore>(undefined);
  watchingRef.current ||= new GraphNodeViewStore();
  watchingRef.current.callback = callback;

  useEffect(() => {
    return () => {
      if (watchingRef.current) {
        watchingRef.current.destroy();
        watchingRef.current = undefined;
      }
    };
  }, []);

  return watchingRef.current;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useResizeObserverWithCallback = <T extends (e: ResizeObserverEntry) => any>(
  ...cb: Parameters<typeof useCallback<T>>
) => {
  const onResize = useCallback(...cb);
  return useResizeObserver(onResize);
};
