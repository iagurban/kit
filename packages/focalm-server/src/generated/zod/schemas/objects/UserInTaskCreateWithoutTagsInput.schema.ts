import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateNestedOneWithoutParticipantsInputObjectSchema } from './TaskCreateNestedOneWithoutParticipantsInput.schema';
import { UserCreateNestedOneWithoutParticipatingTasksInputObjectSchema } from './UserCreateNestedOneWithoutParticipatingTasksInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateWithoutTagsInput> = z
  .object({
    id: z.string().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutParticipatingTasksInputObjectSchema),
    task: z.lazy(() => TaskCreateNestedOneWithoutParticipantsInputObjectSchema),
  })
  .strict();

export const UserInTaskCreateWithoutTagsInputObjectSchema = Schema;
