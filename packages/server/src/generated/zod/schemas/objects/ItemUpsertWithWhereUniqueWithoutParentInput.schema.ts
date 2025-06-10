import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithoutParentInputObjectSchema } from './ItemUpdateWithoutParentInput.schema';
import { ItemUncheckedUpdateWithoutParentInputObjectSchema } from './ItemUncheckedUpdateWithoutParentInput.schema';
import { ItemCreateWithoutParentInputObjectSchema } from './ItemCreateWithoutParentInput.schema';
import { ItemUncheckedCreateWithoutParentInputObjectSchema } from './ItemUncheckedCreateWithoutParentInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUpsertWithWhereUniqueWithoutParentInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => ItemUpdateWithoutParentInputObjectSchema),
      z.lazy(() => ItemUncheckedUpdateWithoutParentInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => ItemCreateWithoutParentInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutParentInputObjectSchema),
    ]),
  })
  .strict();

export const ItemUpsertWithWhereUniqueWithoutParentInputObjectSchema = Schema;
