import { IReactionDisposer, reaction } from 'mobx';
import { getSnapshot, SnapshotInOf } from 'mobx-keystone';

import { sleep } from '../core/index';

/**
 * A utility class for saving snapshots with throttle control and error handling. The class ensures that snapshots
 * are saved in a controlled manner, with throttled save requests, handling successive save requests efficiently,
 * and retrying in case of failures.
 *
 * @template S - The type of the snapshot data structure to be saved.
 */
export class SnapshotSaver<S> {
  constructor(
    private userId: () => string,
    private throttleTime: number,
    private readonly saveSnapshot: (userId: string, snapshot: SnapshotInOf<S>) => Promise<void>
  ) {}

  private saving: { promise: Promise<void>; key: string } | undefined = undefined;
  private needSave: SnapshotInOf<S> | undefined = undefined;
  private lastSuccessSave = new Date();

  /**
   * Saves a snapshot. Ensures that multiple save requests are throttled and managed to avoid race conditions
   * and excessive save operations. If a save is already in progress, the method queues the latest snapshot to be saved after the current one completes.
   *
   * @param {SnapshotInOf<S>} snapshot - The snapshot data to be saved.
   */
  save(snapshot: SnapshotInOf<S>): void {
    if (this.saving) {
      this.needSave = snapshot;
      return;
    }
    const key = Object.create(null);
    this.saving = {
      promise: (async () => {
        try {
          const now = new Date();
          const passed = +now - +this.lastSuccessSave;
          const needWait = this.throttleTime - passed;
          if (needWait > 0) {
            await sleep(needWait);
            if (key !== this.saving?.key) {
              return;
            }
          }
          await this.saveSnapshot(this.userId(), snapshot);
          if (key === this.saving?.key) {
            this.lastSuccessSave = new Date();
            this.saving = undefined;
            const { needSave } = this;
            if (needSave) {
              this.needSave = undefined;
              this.save(needSave);
            }
          }
        } catch (e) {
          console.error(`save error`, e);
          if (key === this.saving?.key) {
            await sleep(1000);
            if (key === this.saving?.key) {
              this.saving = undefined;
              const { needSave } = this;
              this.needSave = undefined;
              this.save(needSave ?? snapshot);
            }
          }
        }
      })(),
      key,
    };
  }

  /**
   * Creates a reaction that observes changes in the snapshot of the given node
   * and performs an action when changes are detected.
   *
   * @param {S} node - The observable node to watch for changes.
   * @return {IReactionDisposer} Returns a disposer function to stop the reaction.
   */
  public reaction(node: S): IReactionDisposer {
    return reaction(
      () => getSnapshot(node),
      snapshot => this.save(snapshot)
    );
  }
}
