import { uidGenerator } from '@gurban/kit/core/uid-generator';
import { computed, IComputedValue, onBecomeUnobserved } from 'mobx';
import { CSSProperties } from 'react';

function stableStringify(obj: unknown): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }
  if (Array.isArray(obj)) {
    return `[${obj.map(stableStringify).join(',')}]`;
  }
  const entries = Object.entries(obj)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `"${k}":${stableStringify(v)}`);
  return `{${entries.join(',')}}`;
}

export class KeyframesBuilder {
  private static readonly usedNames = new Set<string>();

  private readonly computedCache = new Map<string, IComputedValue<string>>();

  inject(label: string, steps: Record<`${number}%`, CSSProperties>): IComputedValue<string> {
    const key = stableStringify(steps);
    const cached = this.computedCache.get(key);
    if (cached) {
      return cached;
    }

    // Генерация уникального имени
    let animationName: string;
    do {
      animationName = `${label}-${uidGenerator()}`;
    } while (KeyframesBuilder.usedNames.has(animationName));
    KeyframesBuilder.usedNames.add(animationName);

    const rule = this.buildKeyframes(animationName, steps);
    const styleEl = document.createElement('style');
    styleEl.textContent = rule;
    styleEl.dataset.name = animationName;
    document.head.appendChild(styleEl);

    const computedAnim = computed(() => animationName);
    onBecomeUnobserved(computedAnim, () => {
      styleEl.remove();
      KeyframesBuilder.usedNames.delete(animationName);
      this.computedCache.delete(key);
    });

    this.computedCache.set(key, computedAnim);
    return computedAnim;
  }

  private buildKeyframes(name: string, steps: Record<`${number}%`, CSSProperties>): string {
    const blocks = Object.entries(steps).map(([percent, style]) => {
      const css = Object.entries(style)
        .map(([k, v]) => `${k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${v};`)
        .join(' ');
      return `  ${percent} { ${css} }`;
    });

    return `@keyframes ${name} {\n${blocks.join('\n')}\n}`;
  }
}

export function enhanceStepsEvenly(
  steps: readonly CSSProperties[],
  o: { cycle?: boolean } = {}
): Record<`${number}%`, CSSProperties> {
  if (steps.length < 2) {
    throw new Error(`enhanceStepsEvenly: steps.length < 2`);
  }
  if (o.cycle) {
    steps = steps.concat(steps[0]);
  }
  const result: Record<`${number}%`, CSSProperties> = {};
  const lastIndex = steps.length - 1;

  steps.forEach((style, index) => {
    const percent = Math.round((index / lastIndex) * 100);
    result[`${percent}%`] = style;
  });

  return result;
}

export const keyframesBuilder = new KeyframesBuilder();
