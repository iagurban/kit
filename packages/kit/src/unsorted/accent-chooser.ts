import { action, computed, makeObservable, observable } from 'mobx';
import { CSSProperties } from 'react';

import type { AccentType } from './accent-utils';

type AccentDefIn = string | { c: string; style?: Partial<CSSProperties>; shift?: number; shiftUp?: number };
export type AccentDef = { c: string; style?: Partial<CSSProperties>; shift: number; shiftUp: number };

const prepareDefs = (
  available: Record<AccentType, readonly [number, readonly AccentDefIn[]]>,
  k: AccentType
): AccentDef[] => {
  const [, d] = available[k];
  if (d.length < 1) {
    throw new Error(`accent symbols for ${k} not provided`);
  }
  return d.map(d =>
    typeof d === 'string'
      ? { c: d, shift: 0, shiftUp: 0 }
      : {
          ...d,
          shift: d.shift ?? d.shiftUp ?? 0,
          shiftUp: d.shiftUp ?? d.shift ?? 0,
        }
  );
};

export class AccentChooser {
  constructor(d: Record<AccentType, readonly [number, readonly AccentDefIn[]]>) {
    this.available = {
      lu: prepareDefs(d, 'lu'),
      ld: prepareDefs(d, 'ld'),
      su: prepareDefs(d, 'su'),
      sd: prepareDefs(d, 'sd'),
      l: prepareDefs(d, 'l'),
    };

    this.current = {
      lu: d.lu[0],
      ld: d.ld[0],
      su: d.su[0],
      sd: d.sd[0],
      l: d.l[0],
    };

    makeObservable(this);
  }

  readonly available: Record<AccentType, readonly AccentDef[]>;

  @observable current: Record<AccentType, number>;

  private getIdx(type: AccentType) {
    const a = this.available[type];
    return a[Math.min(this.current[type], a.length - 1)];
  }

  @computed get sd() {
    return this.getIdx('sd');
  }

  @computed get su() {
    return this.getIdx('su');
  }

  @computed get ld() {
    return this.getIdx('ld');
  }

  @computed get lu() {
    return this.getIdx('lu');
  }

  @computed get l() {
    return this.getIdx('l');
  }

  @action
  set(type: AccentType, n: number) {
    this.current[type] = Math.max(n, 0);
    return this;
  }
}
