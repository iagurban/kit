import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateOrConnectWithoutTagsInputObjectSchema } from './MenuCreateOrConnectWithoutTagsInput.schema';
import { MenuCreateWithoutTagsInputObjectSchema } from './MenuCreateWithoutTagsInput.schema';
import { MenuUncheckedCreateWithoutTagsInputObjectSchema } from './MenuUncheckedCreateWithoutTagsInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.MenuCreateNestedOneWithoutTagsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutTagsInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutTagsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => MenuCreateOrConnectWithoutTagsInputObjectSchema).optional(),
    connect: z.lazy(() => MenuWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateNestedOneWithoutTagsInputObjectSchema = Schema;
