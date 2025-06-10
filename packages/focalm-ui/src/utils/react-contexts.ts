import { createUsableContext } from '@freyja/kit-ui/react/react';

export const { use: useAnimationConfig, provider: AnimationConfigProvider } = createUsableContext<{
  timeMs: number;
  transitionAllEaseFull: string;
  transitionAllEase(timeMs: number | ((old: number) => number)): string;
}>(`AnimationConfig`);

export const { use: useDatesFormats, provider: ProvideDatesFormats } = createUsableContext<{
  dateFormat: string;
  timeFormat: string;
}>(`DatesFormatsContext`);
