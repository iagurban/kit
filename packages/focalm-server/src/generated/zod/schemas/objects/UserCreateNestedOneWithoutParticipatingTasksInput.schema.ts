import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutParticipatingTasksInputObjectSchema } from './UserCreateOrConnectWithoutParticipatingTasksInput.schema';
import { UserCreateWithoutParticipatingTasksInputObjectSchema } from './UserCreateWithoutParticipatingTasksInput.schema';
import { UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema } from './UserUncheckedCreateWithoutParticipatingTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutParticipatingTasksInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutParticipatingTasksInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutParticipatingTasksInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutParticipatingTasksInputObjectSchema = Schema;
