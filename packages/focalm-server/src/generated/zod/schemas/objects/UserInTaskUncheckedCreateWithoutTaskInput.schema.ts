import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedCreateWithoutTaskInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
    tags: z.lazy(() => UserInTaskTagUncheckedCreateNestedManyWithoutUserInTaskInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskUncheckedCreateWithoutTaskInputObjectSchema = Schema;
