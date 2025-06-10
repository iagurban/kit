import { z } from 'zod';
import { ItemCreateWithoutParentInputObjectSchema } from './ItemCreateWithoutParentInput.schema';
import { ItemUncheckedCreateWithoutParentInputObjectSchema } from './ItemUncheckedCreateWithoutParentInput.schema';
import { ItemCreateOrConnectWithoutParentInputObjectSchema } from './ItemCreateOrConnectWithoutParentInput.schema';
import { ItemUpsertWithWhereUniqueWithoutParentInputObjectSchema } from './ItemUpsertWithWhereUniqueWithoutParentInput.schema';
import { ItemCreateManyParentInputEnvelopeObjectSchema } from './ItemCreateManyParentInputEnvelope.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithWhereUniqueWithoutParentInputObjectSchema } from './ItemUpdateWithWhereUniqueWithoutParentInput.schema';
import { ItemUpdateManyWithWhereWithoutParentInputObjectSchema } from './ItemUpdateManyWithWhereWithoutParentInput.schema';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutParentNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => ItemUpsertWithWhereUniqueWithoutParentInputObjectSchema),
        z.lazy(() => ItemUpsertWithWhereUniqueWithoutParentInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ItemCreateManyParentInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => ItemWhereUniqueInputObjectSchema),
        z.lazy(() => ItemWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ItemWhereUniqueInputObjectSchema),
        z.lazy(() => ItemWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ItemWhereUniqueInputObjectSchema),
        z.lazy(() => ItemWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ItemWhereUniqueInputObjectSchema),
        z.lazy(() => ItemWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ItemUpdateWithWhereUniqueWithoutParentInputObjectSchema),
        z.lazy(() => ItemUpdateWithWhereUniqueWithoutParentInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ItemUpdateManyWithWhereWithoutParentInputObjectSchema),
        z.lazy(() => ItemUpdateManyWithWhereWithoutParentInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ItemScalarWhereInputObjectSchema),
        z.lazy(() => ItemScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ItemUncheckedUpdateManyWithoutParentNestedInputObjectSchema = Schema;
