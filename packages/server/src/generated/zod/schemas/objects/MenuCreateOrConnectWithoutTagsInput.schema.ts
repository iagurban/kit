import { z } from 'zod';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuCreateWithoutTagsInputObjectSchema } from './MenuCreateWithoutTagsInput.schema';
import { MenuUncheckedCreateWithoutTagsInputObjectSchema } from './MenuUncheckedCreateWithoutTagsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateOrConnectWithoutTagsInput> = z
  .object({
    where: z.lazy(() => MenuWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MenuCreateWithoutTagsInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutTagsInputObjectSchema),
    ]),
  })
  .strict();

export const MenuCreateOrConnectWithoutTagsInputObjectSchema = Schema;
