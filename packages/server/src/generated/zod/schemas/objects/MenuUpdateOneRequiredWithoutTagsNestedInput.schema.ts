import { z } from 'zod';
import { MenuCreateWithoutTagsInputObjectSchema } from './MenuCreateWithoutTagsInput.schema';
import { MenuUncheckedCreateWithoutTagsInputObjectSchema } from './MenuUncheckedCreateWithoutTagsInput.schema';
import { MenuCreateOrConnectWithoutTagsInputObjectSchema } from './MenuCreateOrConnectWithoutTagsInput.schema';
import { MenuUpsertWithoutTagsInputObjectSchema } from './MenuUpsertWithoutTagsInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuUpdateWithoutTagsInputObjectSchema } from './MenuUpdateWithoutTagsInput.schema';
import { MenuUncheckedUpdateWithoutTagsInputObjectSchema } from './MenuUncheckedUpdateWithoutTagsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUpdateOneRequiredWithoutTagsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutTagsInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutTagsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => MenuCreateOrConnectWithoutTagsInputObjectSchema).optional(),
    upsert: z.lazy(() => MenuUpsertWithoutTagsInputObjectSchema).optional(),
    connect: z.lazy(() => MenuWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => MenuUpdateWithoutTagsInputObjectSchema),
        z.lazy(() => MenuUncheckedUpdateWithoutTagsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const MenuUpdateOneRequiredWithoutTagsNestedInputObjectSchema = Schema;
