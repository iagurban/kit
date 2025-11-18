import { reaction } from 'mobx';
import { getSnapshot, SnapshotInOf } from 'mobx-keystone';

import { sleep } from '../core/index';

export class SnapshotSaver<S> {
  constructor(
    private userId: () => string,
    private throttleTime: number,
    private readonly saveSnapshot: (userId: string, snapshot: SnapshotInOf<S>) => Promise<void>
  ) {}

  private saving: { promise: Promise<void>; key: string } | undefined = undefined;
  private needSave: SnapshotInOf<S> | undefined = undefined;
  private lastSuccessSave = new Date();

  save(snapshot: SnapshotInOf<S>) {
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

  reaction(node: S) {
    return reaction(
      () => getSnapshot(node),
      snapshot => this.save(snapshot)
    );
  }
}
