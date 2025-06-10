import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateNestedOneWithoutParticipatingTasksInputObjectSchema } from './UserCreateNestedOneWithoutParticipatingTasksInput.schema';
import { UserInTaskTagCreateNestedManyWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateNestedManyWithoutUserInTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateWithoutTaskInput> = z
  .object({
    id: z.string().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutParticipatingTasksInputObjectSchema),
    tags: z.lazy(() => UserInTaskTagCreateNestedManyWithoutUserInTaskInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskCreateWithoutTaskInputObjectSchema = Schema;
