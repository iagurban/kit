import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateManyMenuInputEnvelopeObjectSchema } from './ItemCreateManyMenuInputEnvelope.schema';
import { ItemCreateOrConnectWithoutMenuInputObjectSchema } from './ItemCreateOrConnectWithoutMenuInput.schema';
import { ItemCreateWithoutMenuInputObjectSchema } from './ItemCreateWithoutMenuInput.schema';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';
import { ItemUncheckedCreateWithoutMenuInputObjectSchema } from './ItemUncheckedCreateWithoutMenuInput.schema';
import { ItemUpdateManyWithWhereWithoutMenuInputObjectSchema } from './ItemUpdateManyWithWhereWithoutMenuInput.schema';
import { ItemUpdateWithWhereUniqueWithoutMenuInputObjectSchema } from './ItemUpdateWithWhereUniqueWithoutMenuInput.schema';
import { ItemUpsertWithWhereUniqueWithoutMenuInputObjectSchema } from './ItemUpsertWithWhereUniqueWithoutMenuInput.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemUncheckedUpdateManyWithoutMenuNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => ItemCreateWithoutMenuInputObjectSchema),
        z.lazy(() => ItemCreateWithoutMenuInputObjectSchema).array(),
        z.lazy(() => ItemUncheckedCreateWithoutMenuInputObjectSchema),
        z.lazy(() => ItemUncheckedCreateWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ItemCreateOrConnectWithoutMenuInputObjectSchema),
        z.lazy(() => ItemCreateOrConnectWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ItemUpsertWithWhereUniqueWithoutMenuInputObjectSchema),
        z.lazy(() => ItemUpsertWithWhereUniqueWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => ItemCreateManyMenuInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => ItemUpdateWithWhereUniqueWithoutMenuInputObjectSchema),
        z.lazy(() => ItemUpdateWithWhereUniqueWithoutMenuInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ItemUpdateManyWithWhereWithoutMenuInputObjectSchema),
        z.lazy(() => ItemUpdateManyWithWhereWithoutMenuInputObjectSchema).array(),
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

export const ItemUncheckedUpdateManyWithoutMenuNestedInputObjectSchema = Schema;
