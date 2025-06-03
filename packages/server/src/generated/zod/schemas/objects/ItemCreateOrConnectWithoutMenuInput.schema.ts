import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateWithoutMenuInputObjectSchema } from './ItemCreateWithoutMenuInput.schema';
import { ItemUncheckedCreateWithoutMenuInputObjectSchema } from './ItemUncheckedCreateWithoutMenuInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateOrConnectWithoutMenuInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ItemCreateWithoutMenuInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutMenuInputObjectSchema),
    ]),
  })
  .strict();

export const ItemCreateOrConnectWithoutMenuInputObjectSchema = Schema;
