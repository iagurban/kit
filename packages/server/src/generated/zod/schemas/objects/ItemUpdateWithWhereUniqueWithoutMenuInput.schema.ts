import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithoutMenuInputObjectSchema } from './ItemUpdateWithoutMenuInput.schema';
import { ItemUncheckedUpdateWithoutMenuInputObjectSchema } from './ItemUncheckedUpdateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpdateWithWhereUniqueWithoutMenuInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ItemUpdateWithoutMenuInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpdateWithWhereUniqueWithoutMenuInputObjectSchema = Schema;
