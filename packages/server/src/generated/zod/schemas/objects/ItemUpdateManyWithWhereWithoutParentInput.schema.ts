import { z } from 'zod';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';
import { ItemUpdateManyMutationInputObjectSchema } from './ItemUpdateManyMutationInput.schema';
import { ItemUncheckedUpdateManyWithoutChildrenInputObjectSchema } from './ItemUncheckedUpdateManyWithoutChildrenInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpdateManyWithWhereWithoutParentInput> = z
  .object({
    where: z.lazy(() => ItemScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ItemUpdateManyMutationInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateManyWithoutChildrenInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpdateManyWithWhereWithoutParentInputObjectSchema = Schema;
