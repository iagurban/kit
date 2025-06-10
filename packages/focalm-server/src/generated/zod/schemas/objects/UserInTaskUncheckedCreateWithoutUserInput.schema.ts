import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.string().optional(),
    taskId: z.string(),
    tags: z.lazy(() => UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskUncheckedCreateWithoutUserInputObjectSchema = Schema;
