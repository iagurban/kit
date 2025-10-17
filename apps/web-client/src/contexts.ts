import { createUsableContext } from '@gurban/kit/react/react';

import type { RootStorage } from './storage.ts';

export const { use: useStorage, provider: ProvideRootStorage } =
  createUsableContext<RootStorage>(`RootStorageContext`);
