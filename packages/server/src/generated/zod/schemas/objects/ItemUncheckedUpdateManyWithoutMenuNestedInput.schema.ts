import { z } from 'zod';
import { ItemCreateWithoutMenuInputObjectSchema } from './ItemCreateWithoutMenuInput.schema';
import { ItemUncheckedCreateWithoutMenuInputObjectSchema } from './ItemUncheckedCreateWithoutMenuInput.schema';
import { ItemCreateOrConnectWithoutMenuInputObjectSchema } from './ItemCreateOrConnectWithoutMenuInput.schema';
import { ItemUpsertWithWhereUniqueWithoutMenuInputObjectSchema } from './ItemUpsertWithWhereUniqueWithoutMenuInput.schema';
import { ItemCreateManyMenuInputEnvelopeObjectSchema } from './ItemCreateManyMenuInputEnvelope.schema';
import { ItemWhereUniqueInputObjectSchema } from './ItemWhereUniqueInput.schema';
import { ItemUpdateWithWhereUniqueWithoutMenuInputObjectSchema } from './ItemUpdateWithWhereUniqueWithoutMenuInput.schema';
import { ItemUpdateManyWithWhereWithoutMenuInputObjectSchema } from './ItemUpdateManyWithWhereWithoutMenuInput.schema';
import { ItemScalarWhereInputObjectSchema } from './ItemScalarWhereInput.schema';

import type { Prisma } from '../../../old-client';

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
