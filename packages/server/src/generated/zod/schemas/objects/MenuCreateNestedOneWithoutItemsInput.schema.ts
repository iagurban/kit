import { z } from 'zod';
import { MenuCreateWithoutItemsInputObjectSchema } from './MenuCreateWithoutItemsInput.schema';
import { MenuUncheckedCreateWithoutItemsInputObjectSchema } from './MenuUncheckedCreateWithoutItemsInput.schema';
import { MenuCreateOrConnectWithoutItemsInputObjectSchema } from './MenuCreateOrConnectWithoutItemsInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateNestedOneWithoutItemsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutItemsInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutItemsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => MenuCreateOrConnectWithoutItemsInputObjectSchema).optional(),
    connect: z.lazy(() => MenuWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const MenuCreateNestedOneWithoutItemsInputObjectSchema = Schema;
