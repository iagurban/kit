import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateManyTaskInputEnvelopeObjectSchema } from './UserInTaskCreateManyTaskInputEnvelope.schema';
import { UserInTaskCreateOrConnectWithoutTaskInputObjectSchema } from './UserInTaskCreateOrConnectWithoutTaskInput.schema';
import { UserInTaskCreateWithoutTaskInputObjectSchema } from './UserInTaskCreateWithoutTaskInput.schema';
import { UserInTaskScalarWhereInputObjectSchema } from './UserInTaskScalarWhereInput.schema';
import { UserInTaskUncheckedCreateWithoutTaskInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTaskInput.schema';
import { UserInTaskUpdateManyWithWhereWithoutTaskInputObjectSchema } from './UserInTaskUpdateManyWithWhereWithoutTaskInput.schema';
import { UserInTaskUpdateWithWhereUniqueWithoutTaskInputObjectSchema } from './UserInTaskUpdateWithWhereUniqueWithoutTaskInput.schema';
import { UserInTaskUpsertWithWhereUniqueWithoutTaskInputObjectSchema } from './UserInTaskUpsertWithWhereUniqueWithoutTaskInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedUpdateManyWithoutTaskNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskCreateWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskCreateWithoutTaskInputObjectSchema).array(),
        z.lazy(() => UserInTaskUncheckedCreateWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskUncheckedCreateWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserInTaskCreateOrConnectWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskCreateOrConnectWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UserInTaskUpsertWithWhereUniqueWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskUpsertWithWhereUniqueWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserInTaskCreateManyTaskInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => UserInTaskUpdateWithWhereUniqueWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskUpdateWithWhereUniqueWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserInTaskUpdateManyWithWhereWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskUpdateManyWithWhereWithoutTaskInputObjectSchema).array(),
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

export const UserInTaskUncheckedUpdateManyWithoutTaskNestedInputObjectSchema = Schema;
