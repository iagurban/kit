import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateManyOwnerInputEnvelopeObjectSchema } from './MenuCreateManyOwnerInputEnvelope.schema';
import { MenuCreateOrConnectWithoutOwnerInputObjectSchema } from './MenuCreateOrConnectWithoutOwnerInput.schema';
import { MenuCreateWithoutOwnerInputObjectSchema } from './MenuCreateWithoutOwnerInput.schema';
import { MenuScalarWhereInputObjectSchema } from './MenuScalarWhereInput.schema';
import { MenuUncheckedCreateWithoutOwnerInputObjectSchema } from './MenuUncheckedCreateWithoutOwnerInput.schema';
import { MenuUpdateManyWithWhereWithoutOwnerInputObjectSchema } from './MenuUpdateManyWithWhereWithoutOwnerInput.schema';
import { MenuUpdateWithWhereUniqueWithoutOwnerInputObjectSchema } from './MenuUpdateWithWhereUniqueWithoutOwnerInput.schema';
import { MenuUpsertWithWhereUniqueWithoutOwnerInputObjectSchema } from './MenuUpsertWithWhereUniqueWithoutOwnerInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './MenuWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.MenuUpdateManyWithoutOwnerNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MenuCreateWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuCreateWithoutOwnerInputObjectSchema).array(),
        z.lazy(() => MenuUncheckedCreateWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuUncheckedCreateWithoutOwnerInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MenuCreateOrConnectWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuCreateOrConnectWithoutOwnerInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => MenuUpsertWithWhereUniqueWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuUpsertWithWhereUniqueWithoutOwnerInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => MenuCreateManyOwnerInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => MenuWhereUniqueInputObjectSchema),
        z.lazy(() => MenuWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => MenuWhereUniqueInputObjectSchema),
        z.lazy(() => MenuWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => MenuWhereUniqueInputObjectSchema),
        z.lazy(() => MenuWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => MenuWhereUniqueInputObjectSchema),
        z.lazy(() => MenuWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => MenuUpdateWithWhereUniqueWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuUpdateWithWhereUniqueWithoutOwnerInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => MenuUpdateManyWithWhereWithoutOwnerInputObjectSchema),
        z.lazy(() => MenuUpdateManyWithWhereWithoutOwnerInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => MenuScalarWhereInputObjectSchema),
        z.lazy(() => MenuScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const MenuUpdateManyWithoutOwnerNestedInputObjectSchema = Schema;
