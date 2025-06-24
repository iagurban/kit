import { ExMap } from '@gurban/kit/collections/ex-map';
import { svgNS } from '@gurban/kit/core/string-const';
import { mergeFunctions } from '@gurban/kit/utils/functions-utils';
import {
  _isComputingDerivation,
  computed,
  IObservableValue,
  makeObservable,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';

import type { FontInfo } from './font-info';

export class MeasuredWord {
  constructor(
    readonly value: string,
    readonly parent: FontDraft
  ) {
    makeObservable(this);
  }

  private _draftNode?: SVGTextElement;

  get draftNode() {
    if (!this._draftNode) {
      // console.log('creating draft for', this.value);

      const node = document.createElementNS(svgNS, 'text');
      for (const [key, value] of Object.entries({
        x: '0',
        y: '0',
      })) {
        node.setAttributeNS(null, key, value);
      }

      for (const [key, value] of Object.entries(this.parent.fontProps)) {
        node.setAttributeNS(null, key, value);
      }

      node.style.whiteSpace = 'pre';
      node.innerHTML = this.value;
      this.parent.draftSvg.append(node);
      this._draftNode = node;
    }
    return this._draftNode;
  }

  destroy() {
    // console.log('deleting draft for', this.value);
    this._draftNode?.remove();
  }

  @observable measurement?: { width: number; height: number; top: number } = undefined;

  @computed.struct
  get measure() {
    if (!this.measurement) {
      // console.log('getBoundingClientRect');
      const r = this.draftNode.getBoundingClientRect();
      this.measurement = {
        width: +r.width,
        height: +r.height,
        top: -r.top,
      };
    }
    return this.measurement;
  }

  @computed get width() {
    return this.measure.width;
  }
  @computed get height() {
    return this.measure.height;
  }
  @computed get ascent() {
    return this.measure.top;
  }
  @computed get ascender() {
    return this.height - this.ascent;
  }
}

class PendingAutoDestroy<T> {
  constructor(
    readonly o: IObservableValue<T>,
    readonly delay: number,
    readonly onDestroy: () => void
  ) {}

  readonly destructors = mergeFunctions(
    onBecomeObserved(this.o, () => {
      this.setObserved(true);
    }),
    onBecomeUnobserved(this.o, () => {
      this.setObserved(false);
    })
  );

  destroy() {
    this.destructors();
    this.onDestroy();
  }

  timeout?: ReturnType<typeof setTimeout>;

  observed = false;

  setObserved(observed: boolean) {
    this.observed = observed;
    if (observed) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    } else {
      this.timeout = setTimeout(() => this.destroy(), this.delay);
    }
  }
}

export class FontDraft {
  constructor(
    readonly font: FontInfo,
    readonly rootNode: HTMLElement = document.body
  ) {
    makeObservable(this);
  }

  @computed get fontProps() {
    const { font } = this;
    return {
      'font-family': font.style.fontFamily,
      'font-size': `${font.style.fontSize}`,
      ...(font.style.fontWeight == null ? undefined : { 'font-weight': `${font.style.fontWeight}` }),
      ...(font.style.letterSpacing == null ? undefined : { 'letter-spacing': `${font.style.letterSpacing}` }),
      ...(font.style.lineHeight == null ? undefined : { 'line-height': `${font.style.lineHeight}` }),
      ...(font.style.fontStyle == null ? undefined : { 'font-style': `${font.style.fontStyle}` }),
    };
  }

  _draftSvg?: SVGSVGElement;

  get draftSvg() {
    if (!this._draftSvg) {
      const e = document.createElementNS(svgNS, 'svg');
      Object.assign(e.style, {
        position: 'fixed',
        top: 0, // `${Math.random() * 100}`,
        left: 0, // `${Math.random() * 100}`,
        overflow: 'visible',
        pointerEvents: 'none',
        opacity: 0,
      });

      this.rootNode.append(e);
      this._draftSvg = e;
    }

    return this._draftSvg;
  }

  destroy() {
    if (this._draftSvg) {
      this._draftSvg.remove();
    }
  }

  readonly cache = new ExMap<string, PendingAutoDestroy<MeasuredWord>>();

  getTextDraft(text: string) {
    const cached = this.cache.get(text);
    if (cached) {
      return cached.o.get();
    }

    const mw = new MeasuredWord(text, this);
    const c = observable.box(mw);
    const obj = new PendingAutoDestroy(c, 1000, () => {
      mw.destroy();
      this.cache.delete(text);
    });
    this.cache.set(text, obj);

    return c.get();
  }

  @computed
  get space() {
    return this.getTextDraft(' ');
  }

  @computed
  get digit() {
    return this.getTextDraft('0');
  }
}

// class FaceMeasurer {
//   constructor(private readonly font: FontInfo) {}
//
//   _draft?: FontDraft;
//   get draft() {
//     if (!this._draft) {
//       this._draft = new FontDraft(this.font);
//     }
//     return this._draft;
//   }
//
//   measure(text: string): IObservableValue<MeasuredWord> {
//     return this.draft.getTextDraft(text);
//   }
//
//   @computed.struct get space() {
//     return this.measure(' ');
//   }
//
//   @computed.struct get digit() {
//     console.log('measure digit');
//     return this.measure('0');
//   }
//
//   private predictSymbolsForWidth(width: number) {
//     return Math.ceil(width / this.digit.get().width);
//   }
//
//   // readonly fittingStart = computedFn(function (this: FaceMeasurer, text: string, width: number) {
//   //   if (width !== width || width < 1) {
//   //     return null;
//   //   }
//   //
//   //   let prev = this.measure(text.slice(0, this.predictSymbolsForWidth(width)));
//   //   if (prev.width < width) {
//   //     for (;;) {
//   //       if (prev.value.length === text.length) {
//   //         return prev;
//   //       }
//   //
//   //       const curr = this.measure(text.slice(0, prev.value.length + 1));
//   //       if (curr.width >= width) {
//   //         return prev;
//   //       }
//   //
//   //       prev = curr;
//   //     }
//   //   } else {
//   //     for (;;) {
//   //       if (prev.value.length < 2) {
//   //         return null;
//   //       }
//   //
//   //       const curr = this.measure(text.slice(0, prev.value.length - 1));
//   //       if (curr.width < width) {
//   //         return curr;
//   //       }
//   //
//   //       prev = curr;
//   //     }
//   //   }
//   // });
// }

export class FaceMeasurers {
  constructor(readonly node: HTMLElement = document.body) {}

  readonly measurers = new ExMap<string, PendingAutoDestroy<FontDraft>>();

  get(font: FontInfo) {
    if (!_isComputingDerivation()) {
      throw new Error('not computing derivation');
    }

    const cache = this.measurers.get(font.faceSignature);
    if (cache) {
      return cache.o.get();
    }

    // console.log('observed', font.faceSignature);
    const draft = new FontDraft(font, this.node);
    const c = observable.box(draft);

    const obj = new PendingAutoDestroy(c, 1000, () => {
      // console.log('destructing', font.faceSignature);
      draft.destroy();
      this.measurers.delete(font.faceSignature);
    });
    this.measurers.set(font.faceSignature, obj);

    return c.get();
  }

  //   fixedWidthTextWrapper(title: () => string, width: () => number, style: TextStyle) {
  //     return new FixedWidthWrappedText(this, title, width, style);
  //   }
}
