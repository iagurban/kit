import { computed, makeObservable } from 'mobx';
import { CSSProperties } from 'react';

export class DynamicRect {
  constructor(protected readonly _get: () => { cx: number; cy: number; w: number; h: number }) {
    makeObservable(this);
  }

  @computed.struct get coords() {
    return this._get();
  }

  @computed get cx() {
    return this.coords.cx;
  }
  @computed get cy() {
    return this.coords.cy;
  }
  @computed get w() {
    return this.coords.w;
  }
  @computed get h() {
    return this.coords.h;
  }

  @computed get x0() {
    return this.cx - this.w / 2;
  }

  @computed get x1() {
    return this.cx + this.w / 2;
  }

  @computed get y0() {
    return this.cy - this.h / 2;
  }

  @computed get y1() {
    return this.cy + this.h / 2;
  }

  @computed get array() {
    return [this.cx, this.cy, this.w, this.h];
  }

  @computed get rect() {
    return [this.x0, this.y0, this.w, this.h];
  }

  @computed get bounds() {
    return [this.x0, this.y0, this.x1, this.y1];
  }

  @computed get svgXywh() {
    return { x: this.x0, y: this.y0, width: this.w, height: this.h };
  }

  @computed get wh() {
    return { width: this.w, height: this.h };
  }

  @computed get style() {
    return {
      transform: `translate(${this.x0}px, ${this.y0}px)`,
      width: this.w,
      height: this.h,
    };
  }

  // inset(trbl: TrblAccess) {
  //   return new DynamicRect(() => ({
  //     cx: this.x0 + trbl.l + (this.w - trbl.hSum) / 2,
  //     cy: this.y0 + trbl.t + (this.h - trbl.vSum) / 2,
  //     r: this.w - trbl.hSum,
  //     b: this.h - trbl.vSum,
  //   }));
  // }
}

export type InputSize = { w: number | (() => number); h: number | (() => number) };

export type InputCoords = Pick<DynamicRect, 'cx' | 'cy'> & InputSize;

export class TrblAccess {
  constructor(
    public t: number,
    public r: number,
    public b: number,
    public l: number
  ) {}

  get hSum() {
    return this.l + this.r;
  }

  get vSum() {
    return this.t + this.b;
  }

  get array() {
    return [this.t, this.r, this.b, this.l];
  }

  get cssPadding(): CSSProperties {
    return {
      paddingTop: this.t,
      paddingRight: this.r,
      paddingBottom: this.b,
      paddingLeft: this.l,
    };
  }

  get cssMargin(): CSSProperties {
    return {
      marginTop: this.t,
      marginRight: this.r,
      marginBottom: this.b,
      marginLeft: this.l,
    };
  }

  inset(o: TrblAccess) {
    return new TrblAccess(this.t + o.t, this.r - o.r, this.b - o.b, this.l + o.l);
  }

  map(fn: (n: number) => number) {
    return new TrblAccess(fn(this.t), fn(this.r), fn(this.b), fn(this.l));
  }
}

class TrblAccessNull extends TrblAccess {
  constructor() {
    super(0, 0, 0, 0);
  }

  get cssPadding(): CSSProperties {
    return {};
  }

  get cssMargin(): CSSProperties {
    return {};
  }
}

export type TRBL =
  | TrblAccess
  | [number, number, number, number]
  | [number, number, number]
  | [number, number]
  | number
  | { v: number; h: number }
  | { t: number; r: number; b: number; l: number };

export const trblAccess = (trbl?: TRBL) =>
  trbl
    ? trbl instanceof TrblAccess
      ? trbl
      : Array.isArray(trbl)
        ? trbl.length === 4
          ? new TrblAccess(trbl[0], trbl[1], trbl[2], trbl[3])
          : trbl.length === 3
            ? new TrblAccess(trbl[0], trbl[1], trbl[2], trbl[1])
            : new TrblAccess(trbl[0], trbl[1], trbl[0], trbl[1])
        : typeof trbl === 'number'
          ? new TrblAccess(trbl, trbl, trbl, trbl)
          : 'v' in trbl
            ? new TrblAccess(trbl.v, trbl.h, trbl.v, trbl.h)
            : new TrblAccess(trbl.t, trbl.r, trbl.b, trbl.l)
    : new TrblAccessNull();
