import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithoutImageInputObjectSchema } from './ItemUpdateWithoutImageInput.schema';
import { ItemUncheckedUpdateWithoutImageInputObjectSchema } from './ItemUncheckedUpdateWithoutImageInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpdateWithWhereUniqueWithoutImageInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => ItemUpdateWithoutImageInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateWithoutImageInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpdateWithWhereUniqueWithoutImageInputObjectSchema = Schema;
