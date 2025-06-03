import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateWithoutParentInputObjectSchema } from './ItemCreateWithoutParentInput.schema';
import { ItemUncheckedCreateWithoutParentInputObjectSchema } from './ItemUncheckedCreateWithoutParentInput.schema';
import { ItemUncheckedUpdateWithoutParentInputObjectSchema } from './ItemUncheckedUpdateWithoutParentInput.schema';
import { ItemUpdateWithoutParentInputObjectSchema } from './ItemUpdateWithoutParentInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

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
