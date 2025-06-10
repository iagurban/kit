import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateNestedOneWithoutParticipantsInputObjectSchema } from './TaskCreateNestedOneWithoutParticipantsInput.schema';
import { UserCreateNestedOneWithoutParticipatingTasksInputObjectSchema } from './UserCreateNestedOneWithoutParticipatingTasksInput.schema';
import { UserInTaskTagCreateNestedManyWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateNestedManyWithoutUserInTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateInput> = z
  .object({
    id: z.string().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutParticipatingTasksInputObjectSchema),
    task: z.lazy(() => TaskCreateNestedOneWithoutParticipantsInputObjectSchema),
    tags: z.lazy(() => UserInTaskTagCreateNestedManyWithoutUserInTaskInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskCreateInputObjectSchema = Schema;
