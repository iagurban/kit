import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutParticipatingTasksInputObjectSchema } from './UserCreateOrConnectWithoutParticipatingTasksInput.schema';
import { UserCreateWithoutParticipatingTasksInputObjectSchema } from './UserCreateWithoutParticipatingTasksInput.schema';
import { UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema } from './UserUncheckedCreateWithoutParticipatingTasksInput.schema';
import { UserUncheckedUpdateWithoutParticipatingTasksInputObjectSchema } from './UserUncheckedUpdateWithoutParticipatingTasksInput.schema';
import { UserUpdateWithoutParticipatingTasksInputObjectSchema } from './UserUpdateWithoutParticipatingTasksInput.schema';
import { UserUpsertWithoutParticipatingTasksInputObjectSchema } from './UserUpsertWithoutParticipatingTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutParticipatingTasksNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutParticipatingTasksInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutParticipatingTasksInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutParticipatingTasksInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutParticipatingTasksInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutParticipatingTasksInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutParticipatingTasksNestedInputObjectSchema = Schema;
