import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutAuthoredTasksInputObjectSchema } from './UserCreateOrConnectWithoutAuthoredTasksInput.schema';
import { UserCreateWithoutAuthoredTasksInputObjectSchema } from './UserCreateWithoutAuthoredTasksInput.schema';
import { UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthoredTasksInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAuthoredTasksInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthoredTasksInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutAuthoredTasksInputObjectSchema = Schema;
