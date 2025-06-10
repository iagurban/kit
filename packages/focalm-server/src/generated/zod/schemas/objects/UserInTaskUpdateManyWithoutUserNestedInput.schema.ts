import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateManyUserInputEnvelopeObjectSchema } from './UserInTaskCreateManyUserInputEnvelope.schema';
import { UserInTaskCreateOrConnectWithoutUserInputObjectSchema } from './UserInTaskCreateOrConnectWithoutUserInput.schema';
import { UserInTaskCreateWithoutUserInputObjectSchema } from './UserInTaskCreateWithoutUserInput.schema';
import { UserInTaskScalarWhereInputObjectSchema } from './UserInTaskScalarWhereInput.schema';
import { UserInTaskUncheckedCreateWithoutUserInputObjectSchema } from './UserInTaskUncheckedCreateWithoutUserInput.schema';
import { UserInTaskUpdateManyWithWhereWithoutUserInputObjectSchema } from './UserInTaskUpdateManyWithWhereWithoutUserInput.schema';
import { UserInTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './UserInTaskUpdateWithWhereUniqueWithoutUserInput.schema';
import { UserInTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './UserInTaskUpsertWithWhereUniqueWithoutUserInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateManyWithoutUserNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => UserInTaskUncheckedCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskUncheckedCreateWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserInTaskCreateOrConnectWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskCreateOrConnectWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UserInTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserInTaskCreateManyUserInputEnvelopeObjectSchema).optional(),
    set: z
      .union([
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserInTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserInTaskUpdateManyWithWhereWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskUpdateManyWithWhereWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => UserInTaskScalarWhereInputObjectSchema),
        z.lazy(() => UserInTaskScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserInTaskUpdateManyWithoutUserNestedInputObjectSchema = Schema;
