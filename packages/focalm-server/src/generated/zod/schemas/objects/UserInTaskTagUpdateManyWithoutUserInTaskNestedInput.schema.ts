import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagCreateManyUserInTaskInputEnvelopeObjectSchema } from './UserInTaskTagCreateManyUserInTaskInputEnvelope.schema';
import { UserInTaskTagCreateOrConnectWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateOrConnectWithoutUserInTaskInput.schema';
import { UserInTaskTagCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagScalarWhereInputObjectSchema } from './UserInTaskTagScalarWhereInput.schema';
import { UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput.schema';
import { UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInput.schema';
import { UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './UserInTaskTagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagUpdateManyWithoutUserInTaskNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskTagCreateWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagCreateWithoutUserInTaskInputObjectSchema).array(),
        z.lazy(() => UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserInTaskTagCreateOrConnectWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagCreateOrConnectWithoutUserInTaskInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserInTaskTagCreateManyUserInTaskInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => UserInTaskTagScalarWhereInputObjectSchema),
        z.lazy(() => UserInTaskTagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserInTaskTagUpdateManyWithoutUserInTaskNestedInputObjectSchema = Schema;
