import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithoutParentInputObjectSchema } from './ItemUpdateWithoutParentInput.schema';
import { ItemUncheckedUpdateWithoutParentInputObjectSchema } from './ItemUncheckedUpdateWithoutParentInput.schema';

import type { Prisma } from '../../../old-client';

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
