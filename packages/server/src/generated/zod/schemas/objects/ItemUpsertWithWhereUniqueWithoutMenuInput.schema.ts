import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateWithoutMenuInputObjectSchema } from './ItemCreateWithoutMenuInput.schema';
import { ItemUncheckedCreateWithoutMenuInputObjectSchema } from './ItemUncheckedCreateWithoutMenuInput.schema';
import { ItemUncheckedUpdateWithoutMenuInputObjectSchema } from './ItemUncheckedUpdateWithoutMenuInput.schema';
import { ItemUpdateWithoutMenuInputObjectSchema } from './ItemUpdateWithoutMenuInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

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
