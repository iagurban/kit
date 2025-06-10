import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateNestedOneWithoutParticipantsInputObjectSchema } from './TaskCreateNestedOneWithoutParticipantsInput.schema';
import { UserInTaskTagCreateNestedManyWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateNestedManyWithoutUserInTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateWithoutUserInput> = z
  .object({
    id: z.string().optional(),
    task: z.lazy(() => TaskCreateNestedOneWithoutParticipantsInputObjectSchema),
    tags: z.lazy(() => UserInTaskTagCreateNestedManyWithoutUserInTaskInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskCreateWithoutUserInputObjectSchema = Schema;
