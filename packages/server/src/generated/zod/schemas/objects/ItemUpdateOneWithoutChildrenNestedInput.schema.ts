import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateOrConnectWithoutChildrenInputObjectSchema } from './ItemCreateOrConnectWithoutChildrenInput.schema';
import { ItemCreateWithoutChildrenInputObjectSchema } from './ItemCreateWithoutChildrenInput.schema';
import { ItemUncheckedCreateWithoutChildrenInputObjectSchema } from './ItemUncheckedCreateWithoutChildrenInput.schema';
import { ItemUncheckedUpdateWithoutChildrenInputObjectSchema } from './ItemUncheckedUpdateWithoutChildrenInput.schema';
import { ItemUpdateWithoutChildrenInputObjectSchema } from './ItemUpdateWithoutChildrenInput.schema';
import { ItemUpsertWithoutChildrenInputObjectSchema } from './ItemUpsertWithoutChildrenInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

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
