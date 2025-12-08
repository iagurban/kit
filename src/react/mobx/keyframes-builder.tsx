import { computed, IComputedValue, onBecomeUnobserved } from 'mobx';
import { CSSProperties } from 'react';

import { uidGenerator } from '../../core';

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

/**
 * The KeyframesBuilder class provides functionality to dynamically create CSS keyframes
 * and manage them in the document's styles through unique naming and caching mechanisms.
 * This ensures animations have unique names and are efficiently reused when their steps
 * are identical, while also cleaning up unused styles.
 */
export class KeyframesBuilder {
  private static readonly usedNames = new Set<string>();

  private readonly computedCache = new Map<string, IComputedValue<string>>();

  /**
   * Injects a CSS animation keyframes rule into the DOM and returns a computed value representing the animation name.
   *
   * @param {string} label - A descriptive label used for creating a unique animation name.
   * @param {Record<`${number}%`, CSSProperties>} steps - An object representing the keyframes for the animation.
   * Each key is a percentage of the animation's duration, and its value is a CSSProperties object defining the styles.
   * @return {IComputedValue<string>} A computed observable value that holds the name of the created animation.
   * When the computed value is no longer observed, the animation styles are automatically removed from the DOM.
   */
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

    // console.log(`create animation ${animationName}`);

    const rule = this.buildKeyframes(animationName, steps);
    const styleEl = document.createElement('style');
    styleEl.textContent = rule;
    styleEl.dataset.name = animationName;
    document.head.appendChild(styleEl);

    const computedAnim = computed(() => animationName);
    onBecomeUnobserved(computedAnim, () => {
      // console.log(`destroy animation ${animationName}`);
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

/**
 * Generates a mapping of percentages to CSS properties, evenly distributing the provided steps.
 * Optionally completes a cycle by repeating the first step at the end.
 *
 * @param {readonly CSSProperties[]} steps - An array of CSS properties representing animation steps.
 * @param {object} [o] - An options-object.
 * @param {boolean} [o.cycle] - If true, appends the first step to the end to create a seamless loop.
 * @return {Record<`${number}%`, CSSProperties>} A record where keys are percentage strings and values are CSS properties.
 */
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

/**
 * A variable that holds an instance of the KeyframesBuilder class.
 * The KeyframesBuilder is used to programmatically create CSS keyframes
 * that define animations for HTML elements. It provides methods for
 * adding keyframes and managing animations dynamically.
 */
export const keyframesBuilder = new KeyframesBuilder();
