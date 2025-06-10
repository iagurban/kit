import { z } from 'zod';
import { ItemUpdateWithoutChildrenInputObjectSchema } from './ItemUpdateWithoutChildrenInput.schema';
import { ItemUncheckedUpdateWithoutChildrenInputObjectSchema } from './ItemUncheckedUpdateWithoutChildrenInput.schema';
import { ItemCreateWithoutChildrenInputObjectSchema } from './ItemCreateWithoutChildrenInput.schema';
import { ItemUncheckedCreateWithoutChildrenInputObjectSchema } from './ItemUncheckedCreateWithoutChildrenInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpsertWithoutChildrenInput> = z
  .object({
    update: z.union([
      z.lazy(() => ItemUpdateWithoutChildrenInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateWithoutChildrenInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ItemCreateWithoutChildrenInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutChildrenInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpsertWithoutChildrenInputObjectSchema = Schema;
