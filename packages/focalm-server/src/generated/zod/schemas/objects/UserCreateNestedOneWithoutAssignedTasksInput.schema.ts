import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutAssignedTasksInputObjectSchema } from './UserCreateOrConnectWithoutAssignedTasksInput.schema';
import { UserCreateWithoutAssignedTasksInputObjectSchema } from './UserCreateWithoutAssignedTasksInput.schema';
import { UserUncheckedCreateWithoutAssignedTasksInputObjectSchema } from './UserUncheckedCreateWithoutAssignedTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutAssignedTasksInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAssignedTasksInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAssignedTasksInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAssignedTasksInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutAssignedTasksInputObjectSchema = Schema;
