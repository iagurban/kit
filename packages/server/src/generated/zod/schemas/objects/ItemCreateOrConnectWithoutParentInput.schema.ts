import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateWithoutParentInputObjectSchema } from './ItemCreateWithoutParentInput.schema';
import { ItemUncheckedCreateWithoutParentInputObjectSchema } from './ItemUncheckedCreateWithoutParentInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateOrConnectWithoutParentInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ItemCreateWithoutParentInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutParentInputObjectSchema),
    ]),
  })
  .strict();

export const ItemCreateOrConnectWithoutParentInputObjectSchema = Schema;
