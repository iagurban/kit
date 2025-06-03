import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutAssignedTasksInputObjectSchema } from './UserCreateWithoutAssignedTasksInput.schema';
import { UserUncheckedCreateWithoutAssignedTasksInputObjectSchema } from './UserUncheckedCreateWithoutAssignedTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutAssignedTasksInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAssignedTasksInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAssignedTasksInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutAssignedTasksInputObjectSchema = Schema;
