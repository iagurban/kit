import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithoutMenuInputObjectSchema } from './ItemUpdateWithoutMenuInput.schema';
import { ItemUncheckedUpdateWithoutMenuInputObjectSchema } from './ItemUncheckedUpdateWithoutMenuInput.schema';
import { ItemCreateWithoutMenuInputObjectSchema } from './ItemCreateWithoutMenuInput.schema';
import { ItemUncheckedCreateWithoutMenuInputObjectSchema } from './ItemUncheckedCreateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpsertWithWhereUniqueWithoutMenuInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ItemUpdateWithoutMenuInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateWithoutMenuInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ItemCreateWithoutMenuInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpsertWithWhereUniqueWithoutMenuInputObjectSchema = Schema;
