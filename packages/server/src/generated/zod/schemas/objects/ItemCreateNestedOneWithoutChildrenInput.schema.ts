import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateOrConnectWithoutChildrenInputObjectSchema } from './ItemCreateOrConnectWithoutChildrenInput.schema';
import { ItemCreateWithoutChildrenInputObjectSchema } from './ItemCreateWithoutChildrenInput.schema';
import { ItemUncheckedCreateWithoutChildrenInputObjectSchema } from './ItemUncheckedCreateWithoutChildrenInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateNestedOneWithoutChildrenInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ItemCreateWithoutChildrenInputObjectSchema),
        z.lazy(() => ItemUncheckedCreateWithoutChildrenInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => ItemCreateOrConnectWithoutChildrenInputObjectSchema).optional(),
    connect: z.lazy(() => ItemWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const ItemCreateNestedOneWithoutChildrenInputObjectSchema = Schema;
