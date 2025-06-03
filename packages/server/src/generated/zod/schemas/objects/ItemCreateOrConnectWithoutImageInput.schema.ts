import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateWithoutImageInputObjectSchema } from './ItemCreateWithoutImageInput.schema';
import { ItemUncheckedCreateWithoutImageInputObjectSchema } from './ItemUncheckedCreateWithoutImageInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateOrConnectWithoutImageInput> = z
  .object({
    where: z.lazy(() => ItemWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ItemCreateWithoutImageInputObjectSchema),
      z.lazy(() => ItemUncheckedCreateWithoutImageInputObjectSchema),
    ]),
  })
  .strict();

export const ItemCreateOrConnectWithoutImageInputObjectSchema = Schema;
