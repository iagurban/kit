import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutParticipatingTasksInputObjectSchema } from './UserCreateWithoutParticipatingTasksInput.schema';
import { UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema } from './UserUncheckedCreateWithoutParticipatingTasksInput.schema';
import { UserUncheckedUpdateWithoutParticipatingTasksInputObjectSchema } from './UserUncheckedUpdateWithoutParticipatingTasksInput.schema';
import { UserUpdateWithoutParticipatingTasksInputObjectSchema } from './UserUpdateWithoutParticipatingTasksInput.schema';

const Schema: z.ZodType<Prisma.UserUpsertWithoutParticipatingTasksInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutParticipatingTasksInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutParticipatingTasksInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutParticipatingTasksInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutParticipatingTasksInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutParticipatingTasksInputObjectSchema = Schema;
