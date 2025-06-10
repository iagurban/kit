import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutParticipatingTasksInputObjectSchema } from './UserCreateWithoutParticipatingTasksInput.schema';
import { UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema } from './UserUncheckedCreateWithoutParticipatingTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutParticipatingTasksInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutParticipatingTasksInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutParticipatingTasksInputObjectSchema = Schema;
