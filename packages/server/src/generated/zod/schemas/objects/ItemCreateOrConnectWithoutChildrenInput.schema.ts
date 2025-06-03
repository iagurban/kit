import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateWithoutChildrenInputObjectSchema } from './ItemCreateWithoutChildrenInput.schema';
import { ItemUncheckedCreateWithoutChildrenInputObjectSchema } from './ItemUncheckedCreateWithoutChildrenInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateOrConnectWithoutChildrenInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ItemCreateWithoutChildrenInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutChildrenInputObjectSchema),
    ]),
  })
  .strict();

export const ItemCreateOrConnectWithoutChildrenInputObjectSchema = Schema;
