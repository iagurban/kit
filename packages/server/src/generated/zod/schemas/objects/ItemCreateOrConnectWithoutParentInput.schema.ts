import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemCreateWithoutParentInputObjectSchema } from './ItemCreateWithoutParentInput.schema';
import { ItemUncheckedCreateWithoutParentInputObjectSchema } from './ItemUncheckedCreateWithoutParentInput.schema';

import type { Prisma } from '../../../old-client';

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
