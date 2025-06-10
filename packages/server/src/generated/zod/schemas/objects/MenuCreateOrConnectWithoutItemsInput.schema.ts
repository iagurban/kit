import { z } from 'zod';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';
import { MenuCreateWithoutItemsInputObjectSchema } from './MenuCreateWithoutItemsInput.schema';
import { MenuUncheckedCreateWithoutItemsInputObjectSchema } from './MenuUncheckedCreateWithoutItemsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuCreateOrConnectWithoutItemsInput> = z
  .object({
    where: z.lazy(() => MenuWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MenuCreateWithoutItemsInputObjectSchema),
      z.lazy(() => MenuUncheckedCreateWithoutItemsInputObjectSchema),
    ]),
  })
  .strict();

export const MenuCreateOrConnectWithoutItemsInputObjectSchema = Schema;
