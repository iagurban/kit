import { z } from 'zod';
import { MenuUpdateWithoutItemsInputObjectSchema } from './MenuUpdateWithoutItemsInput.schema';
import { MenuUncheckedUpdateWithoutItemsInputObjectSchema } from './MenuUncheckedUpdateWithoutItemsInput.schema';
import { MenuCreateWithoutItemsInputObjectSchema } from './MenuCreateWithoutItemsInput.schema';
import { MenuUncheckedCreateWithoutItemsInputObjectSchema } from './MenuUncheckedCreateWithoutItemsInput.schema';

import type { Prisma } from '../../../old-client';

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
