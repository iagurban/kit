import type { NextFont } from '@next/font';
import { computed, makeObservable } from 'mobx';
import { CSSProperties } from 'react';

import type { AccentChooser } from './accent-chooser.ts';
import type { FaceMeasurers } from './face-measurer.ts';
import { mutateCssNum } from './react/css-util.ts';
import { faceSignature } from './text-style.tsx';

const normalFontSize = 16;

type FontInfoOverrides = Partial<
  Pick<CSSProperties, 'fontSize' | 'fontWeight' | 'fontStyle' | 'lineHeight' | 'letterSpacing' | 'color'>
>;

type FontInfoPreferences = { boldValue: number };

export class FontInfo {
  constructor(
    private readonly measurers: FaceMeasurers,
    readonly font: Readonly<NextFont>,
    readonly preferences: Readonly<FontInfoPreferences>,
    readonly accents: AccentChooser,
    readonly overrides?: Readonly<FontInfoOverrides>,
    normal?: FontInfo
  ) {
    this.normal = normal || this;
    makeObservable(this);
  }

  readonly normal: FontInfo;

  adjusted(overrides: FontInfoOverrides | ((font: FontInfo) => FontInfoOverrides)) {
    return new FontInfo(
      this.measurers,
      this.font,
      this.preferences,
      this.accents,
      {
        ...this.overrides,
        ...(typeof overrides === 'function' ? overrides(this) : overrides),
      },
      this.normal
    );
  }

  @computed
  get bold() {
    return this.adjusted({ fontWeight: this.preferences.boldValue });
  }

  @computed
  get italic() {
    return this.adjusted({ fontStyle: 'italic' });
  }

  @computed
  get faceSignature() {
    return faceSignature({
      family: this.font.style.fontFamily,
      weight: this.overrides?.fontWeight ?? this.font.style.fontWeight,
      size: this.overrides?.fontSize ?? normalFontSize,
      letterSpacing: this.overrides?.letterSpacing,
      lineHeight: this.overrides?.lineHeight,
      fontStyle: this.overrides?.fontStyle ?? this.font.style.fontStyle,
    });
  }

  @computed get style() {
    return { fontSize: normalFontSize, ...this.font.style, ...this.overrides };
  }

  @computed.struct get props() {
    return { className: this.font.className, style: this.overrides };
  }

  @computed.struct get muiProps() {
    return { className: this.font.className, sx: this.overrides };
  }

  @computed.struct get typographyProps() {
    return { className: this.font.className, ...this.overrides };
  }

  @computed get gray() {
    return this.adjusted({ color: 'grey.600' });
  }

  @computed get smaller() {
    return this.adjusted(f => ({ fontSize: mutateCssNum(f.style.fontSize, s => Math.floor(s * 0.85)) }));
  }

  @computed get bigger() {
    return this.adjusted(f => ({ fontSize: mutateCssNum(f.style.fontSize, s => Math.ceil(s * 1.4)) }));
  }

  @computed get measurements() {
    return this.measurers.get(this);
  }
}
