import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateWithoutImageInputObjectSchema } from './ItemCreateWithoutImageInput.schema';
import { ItemUncheckedCreateWithoutImageInputObjectSchema } from './ItemUncheckedCreateWithoutImageInput.schema';
import { ItemUncheckedUpdateWithoutImageInputObjectSchema } from './ItemUncheckedUpdateWithoutImageInput.schema';
import { ItemUpdateWithoutImageInputObjectSchema } from './ItemUpdateWithoutImageInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemUpsertWithWhereUniqueWithoutImageInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ItemUpdateWithoutImageInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateWithoutImageInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ItemCreateWithoutImageInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutImageInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpsertWithWhereUniqueWithoutImageInputObjectSchema = Schema;
