import { z } from 'zod';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemCreateWithoutMenuInputObjectSchema } from './ItemCreateWithoutMenuInput.schema';
import { ItemUncheckedCreateWithoutMenuInputObjectSchema } from './ItemUncheckedCreateWithoutMenuInput.schema';

import type { Prisma } from '../../../old-client';

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
