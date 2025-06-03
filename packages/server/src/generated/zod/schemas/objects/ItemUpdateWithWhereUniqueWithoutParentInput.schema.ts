import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemUncheckedUpdateWithoutParentInputObjectSchema } from './ItemUncheckedUpdateWithoutParentInput.schema';
import { ItemUpdateWithoutParentInputObjectSchema } from './ItemUpdateWithoutParentInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemUpdateWithWhereUniqueWithoutParentInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ItemUpdateWithoutParentInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateWithoutParentInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpdateWithWhereUniqueWithoutParentInputObjectSchema = Schema;
