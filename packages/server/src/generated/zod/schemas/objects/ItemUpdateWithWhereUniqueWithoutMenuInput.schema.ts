import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemUncheckedUpdateWithoutMenuInputObjectSchema } from './ItemUncheckedUpdateWithoutMenuInput.schema';
import { ItemUpdateWithoutMenuInputObjectSchema } from './ItemUpdateWithoutMenuInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

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
