import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateManyImageInputEnvelopeObjectSchema } from './ItemCreateManyImageInputEnvelope.schema';
import { ItemCreateOrConnectWithoutImageInputObjectSchema } from './ItemCreateOrConnectWithoutImageInput.schema';
import { ItemCreateWithoutImageInputObjectSchema } from './ItemCreateWithoutImageInput.schema';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';
import { ItemUncheckedCreateWithoutImageInputObjectSchema } from './ItemUncheckedCreateWithoutImageInput.schema';
import { ItemUpdateManyWithWhereWithoutImageInputObjectSchema } from './ItemUpdateManyWithWhereWithoutImageInput.schema';
import { ItemUpdateWithWhereUniqueWithoutImageInputObjectSchema } from './ItemUpdateWithWhereUniqueWithoutImageInput.schema';
import { ItemUpsertWithWhereUniqueWithoutImageInputObjectSchema } from './ItemUpsertWithWhereUniqueWithoutImageInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemUpdateManyWithoutImageNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => ItemUpsertWithWhereUniqueWithoutImageInputObjectSchema),
        z.lazy(() => ItemUpsertWithWhereUniqueWithoutImageInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ItemCreateManyImageInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => ItemUpdateWithWhereUniqueWithoutImageInputObjectSchema),
        z.lazy(() => ItemUpdateWithWhereUniqueWithoutImageInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ItemUpdateManyWithWhereWithoutImageInputObjectSchema),
        z.lazy(() => ItemUpdateManyWithWhereWithoutImageInputObjectSchema).array(),
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

export const ItemUpdateManyWithoutImageNestedInputObjectSchema = Schema;
