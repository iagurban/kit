import { z } from 'zod';
import { ItemCreateWithoutChildrenInputObjectSchema } from './ItemCreateWithoutChildrenInput.schema';
import { ItemUncheckedCreateWithoutChildrenInputObjectSchema } from './ItemUncheckedCreateWithoutChildrenInput.schema';
import { ItemCreateOrConnectWithoutChildrenInputObjectSchema } from './ItemCreateOrConnectWithoutChildrenInput.schema';
import { ItemUpsertWithoutChildrenInputObjectSchema } from './ItemUpsertWithoutChildrenInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithoutChildrenInputObjectSchema } from './ItemUpdateWithoutChildrenInput.schema';
import { ItemUncheckedUpdateWithoutChildrenInputObjectSchema } from './ItemUncheckedUpdateWithoutChildrenInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpdateOneWithoutChildrenNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ItemCreateWithoutChildrenInputObjectSchema),
        z.lazy(() => ItemUncheckedCreateWithoutChildrenInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => ItemCreateOrConnectWithoutChildrenInputObjectSchema).optional(),
    upsert: z.lazy(() => ItemUpsertWithoutChildrenInputObjectSchema).optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => ItemWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => ItemUpdateWithoutChildrenInputObjectSchema),
        z.lazy(() => ItemUncheckedUpdateWithoutChildrenInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const ItemUpdateOneWithoutChildrenNestedInputObjectSchema = Schema;
