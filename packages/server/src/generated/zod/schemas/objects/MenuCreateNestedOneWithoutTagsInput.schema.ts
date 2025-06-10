import { z } from 'zod';
import { MenuCreateWithoutTagsInputObjectSchema } from './MenuCreateWithoutTagsInput.schema';
import { MenuUncheckedCreateWithoutTagsInputObjectSchema } from './MenuUncheckedCreateWithoutTagsInput.schema';
import { MenuCreateOrConnectWithoutTagsInputObjectSchema } from './MenuCreateOrConnectWithoutTagsInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

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
