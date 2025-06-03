import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutAuthoredTasksInputObjectSchema } from './UserCreateOrConnectWithoutAuthoredTasksInput.schema';
import { UserCreateWithoutAuthoredTasksInputObjectSchema } from './UserCreateWithoutAuthoredTasksInput.schema';
import { UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTasksInput.schema';
import { UserUncheckedUpdateWithoutAuthoredTasksInputObjectSchema } from './UserUncheckedUpdateWithoutAuthoredTasksInput.schema';
import { UserUpdateWithoutAuthoredTasksInputObjectSchema } from './UserUpdateWithoutAuthoredTasksInput.schema';
import { UserUpsertWithoutAuthoredTasksInputObjectSchema } from './UserUpsertWithoutAuthoredTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthoredTasksNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAuthoredTasksInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthoredTasksInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutAuthoredTasksInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutAuthoredTasksInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAuthoredTasksInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutAuthoredTasksNestedInputObjectSchema = Schema;
