import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemCreateWithoutChildrenInputObjectSchema } from './ItemCreateWithoutChildrenInput.schema';
import { ItemUncheckedCreateWithoutChildrenInputObjectSchema } from './ItemUncheckedCreateWithoutChildrenInput.schema';

import type { Prisma } from '../../../old-client';

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
