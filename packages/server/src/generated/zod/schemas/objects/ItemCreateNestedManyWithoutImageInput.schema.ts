import { z } from 'zod';
import { ItemCreateWithoutImageInputObjectSchema } from './ItemCreateWithoutImageInput.schema';
import { ItemUncheckedCreateWithoutImageInputObjectSchema } from './ItemUncheckedCreateWithoutImageInput.schema';
import { ItemCreateOrConnectWithoutImageInputObjectSchema } from './ItemCreateOrConnectWithoutImageInput.schema';
import { ItemCreateManyImageInputEnvelopeObjectSchema } from './ItemCreateManyImageInputEnvelope.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

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
