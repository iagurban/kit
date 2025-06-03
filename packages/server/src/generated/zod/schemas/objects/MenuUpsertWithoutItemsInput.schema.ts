import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateWithoutItemsInputObjectSchema } from './MenuCreateWithoutItemsInput.schema';
import { MenuUncheckedCreateWithoutItemsInputObjectSchema } from './MenuUncheckedCreateWithoutItemsInput.schema';
import { MenuUncheckedUpdateWithoutItemsInputObjectSchema } from './MenuUncheckedUpdateWithoutItemsInput.schema';
import { MenuUpdateWithoutItemsInputObjectSchema } from './MenuUpdateWithoutItemsInput.schema';

const Schema: z.ZodType<Prisma.MenuUpsertWithoutItemsInput> = z
  .object({
    update: z.union([
      z.lazy(() => MenuUpdateWithoutItemsInputObjectSchema),
      z.lazy(() => MenuUncheckedUpdateWithoutItemsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MenuCreateWithoutItemsInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutItemsInputObjectSchema),
    ]),
  })
  .strict();

export const MenuUpsertWithoutItemsInputObjectSchema = Schema;
