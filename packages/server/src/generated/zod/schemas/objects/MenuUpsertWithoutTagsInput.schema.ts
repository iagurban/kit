import { z } from 'zod';
import { MenuUpdateWithoutTagsInputObjectSchema } from './MenuUpdateWithoutTagsInput.schema';
import { MenuUncheckedUpdateWithoutTagsInputObjectSchema } from './MenuUncheckedUpdateWithoutTagsInput.schema';
import { MenuCreateWithoutTagsInputObjectSchema } from './MenuCreateWithoutTagsInput.schema';
import { MenuUncheckedCreateWithoutTagsInputObjectSchema } from './MenuUncheckedCreateWithoutTagsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuUpsertWithoutTagsInput> = z
  .object({
    update: z.union([
      z.lazy(() => MenuUpdateWithoutTagsInputObjectSchema),
      z.lazy(() => MenuUncheckedUpdateWithoutTagsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => MenuCreateWithoutTagsInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutTagsInputObjectSchema),
    ]),
  })
  .strict();

export const MenuUpsertWithoutTagsInputObjectSchema = Schema;
