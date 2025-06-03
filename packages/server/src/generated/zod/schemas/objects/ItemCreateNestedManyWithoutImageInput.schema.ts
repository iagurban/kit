import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateManyImageInputEnvelopeObjectSchema } from './ItemCreateManyImageInputEnvelope.schema';
import { ItemCreateOrConnectWithoutImageInputObjectSchema } from './ItemCreateOrConnectWithoutImageInput.schema';
import { ItemCreateWithoutImageInputObjectSchema } from './ItemCreateWithoutImageInput.schema';
import { ItemUncheckedCreateWithoutImageInputObjectSchema } from './ItemUncheckedCreateWithoutImageInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateNestedManyWithoutImageInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ItemCreateWithoutImageInputObjectSchema),
        z.lazy(() => ItemCreateWithoutImageInputObjectSchema).array(),
        z.lazy(() => ItemUncheckedCreateWithoutImageInputObjectSchema),
        z.lazy(() => ItemUncheckedCreateWithoutImageInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ItemCreateOrConnectWithoutImageInputObjectSchema),
        z.lazy(() => ItemCreateOrConnectWithoutImageInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ItemCreateManyImageInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => ItemWhereUniqueInputObjectSchema),
        z.lazy(() => ItemWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ItemCreateNestedManyWithoutImageInputObjectSchema = Schema;
