import { z } from 'zod';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';
import { ItemUpdateManyMutationInputObjectSchema } from './ItemUpdateManyMutationInput.schema';
import { ItemUncheckedUpdateManyWithoutItemsInputObjectSchema } from './ItemUncheckedUpdateManyWithoutItemsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpdateManyWithWhereWithoutMenuInput> = z
  .object({
    where: z.lazy(() => ItemScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ItemUpdateManyMutationInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateManyWithoutItemsInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpdateManyWithWhereWithoutMenuInputObjectSchema = Schema;
