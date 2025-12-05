import { mapOwnEntries } from '../core';
import { UniversalSelection } from './decorators/universal-selection.decorator';

export type SomePrismaSelection = Record<string, boolean | { select: SomePrismaSelection }>;

export const universalSelectionToPrisma = (selection: UniversalSelection): SomePrismaSelection =>
  mapOwnEntries(selection, v =>
    typeof v === `boolean` ? v : v ? { select: universalSelectionToPrisma(v) } : false
  );
