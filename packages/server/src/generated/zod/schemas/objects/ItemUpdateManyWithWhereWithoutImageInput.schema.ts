import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';
import { ItemUncheckedUpdateManyWithoutUsingItemsInputObjectSchema } from './ItemUncheckedUpdateManyWithoutUsingItemsInput.schema';
import { ItemUpdateManyMutationInputObjectSchema } from './ItemUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.ItemUpdateManyWithWhereWithoutImageInput> = z
  .object({
    where: z.lazy(() => ItemScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ItemUpdateManyMutationInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateManyWithoutUsingItemsInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpdateManyWithWhereWithoutImageInputObjectSchema = Schema;
