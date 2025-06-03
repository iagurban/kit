import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateOrConnectWithoutItemsInputObjectSchema } from './MenuCreateOrConnectWithoutItemsInput.schema';
import { MenuCreateWithoutItemsInputObjectSchema } from './MenuCreateWithoutItemsInput.schema';
import { MenuUncheckedCreateWithoutItemsInputObjectSchema } from './MenuUncheckedCreateWithoutItemsInput.schema';
import { MenuUncheckedUpdateWithoutItemsInputObjectSchema } from './MenuUncheckedUpdateWithoutItemsInput.schema';
import { MenuUpdateWithoutItemsInputObjectSchema } from './MenuUpdateWithoutItemsInput.schema';
import { MenuUpsertWithoutItemsInputObjectSchema } from './MenuUpsertWithoutItemsInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.MenuUpdateOneRequiredWithoutItemsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutItemsInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutItemsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => MenuCreateOrConnectWithoutItemsInputObjectSchema).optional(),
    upsert: z.lazy(() => MenuUpsertWithoutItemsInputObjectSchema).optional(),
    connect: z.lazy(() => MenuWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => MenuUpdateWithoutItemsInputObjectSchema),
        z.lazy(() => MenuUncheckedUpdateWithoutItemsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const MenuUpdateOneRequiredWithoutItemsNestedInputObjectSchema = Schema;
