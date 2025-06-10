import { z } from 'zod';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';
import { ItemUpdateManyMutationInputObjectSchema } from './ItemUpdateManyMutationInput.schema';
import { ItemUncheckedUpdateManyWithoutUsingItemsInputObjectSchema } from './ItemUncheckedUpdateManyWithoutUsingItemsInput.schema';

import type { Prisma } from '../../../old-client';

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
