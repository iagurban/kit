import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';
import { ItemUncheckedUpdateManyWithoutChildrenInputObjectSchema } from './ItemUncheckedUpdateManyWithoutChildrenInput.schema';
import { ItemUpdateManyMutationInputObjectSchema } from './ItemUpdateManyMutationInput.schema';

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
