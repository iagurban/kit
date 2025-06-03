import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutAuthoredTasksInputObjectSchema } from './UserCreateWithoutAuthoredTasksInput.schema';
import { UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTasksInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthoredTasksInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthoredTasksInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthoredTasksInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutAuthoredTasksInputObjectSchema = Schema;
