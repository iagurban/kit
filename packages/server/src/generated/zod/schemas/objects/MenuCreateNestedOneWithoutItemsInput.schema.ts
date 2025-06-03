import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateOrConnectWithoutItemsInputObjectSchema } from './MenuCreateOrConnectWithoutItemsInput.schema';
import { MenuCreateWithoutItemsInputObjectSchema } from './MenuCreateWithoutItemsInput.schema';
import { MenuUncheckedCreateWithoutItemsInputObjectSchema } from './MenuUncheckedCreateWithoutItemsInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

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
