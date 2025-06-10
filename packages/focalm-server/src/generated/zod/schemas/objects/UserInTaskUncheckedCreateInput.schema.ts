import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
    taskId: z.string(),
    tags: z.lazy(() => UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskUncheckedCreateInputObjectSchema = Schema;
