import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemUncheckedUpdateWithoutImageInputObjectSchema } from './ItemUncheckedUpdateWithoutImageInput.schema';
import { ItemUpdateWithoutImageInputObjectSchema } from './ItemUpdateWithoutImageInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

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
