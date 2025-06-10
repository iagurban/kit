import { z } from 'zod';
import { ItemCreateWithoutParentInputObjectSchema } from './ItemCreateWithoutParentInput.schema';
import { ItemUncheckedCreateWithoutParentInputObjectSchema } from './ItemUncheckedCreateWithoutParentInput.schema';
import { ItemCreateOrConnectWithoutParentInputObjectSchema } from './ItemCreateOrConnectWithoutParentInput.schema';
import { ItemCreateManyParentInputEnvelopeObjectSchema } from './ItemCreateManyParentInputEnvelope.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUncheckedCreateNestedManyWithoutParentInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ItemCreateWithoutParentInputObjectSchema),
        z.lazy(() => ItemCreateWithoutParentInputObjectSchema).array(),
        z.lazy(() => ItemUncheckedCreateWithoutParentInputObjectSchema),
        z.lazy(() => ItemUncheckedCreateWithoutParentInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ItemCreateOrConnectWithoutParentInputObjectSchema),
        z.lazy(() => ItemCreateOrConnectWithoutParentInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ItemCreateManyParentInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => ItemWhereUniqueInputObjectSchema),
        z.lazy(() => ItemWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ItemUncheckedCreateNestedManyWithoutParentInputObjectSchema = Schema;
