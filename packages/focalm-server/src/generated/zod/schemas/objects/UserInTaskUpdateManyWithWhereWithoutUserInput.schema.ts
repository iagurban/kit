import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskScalarWhereInputObjectSchema } from './UserInTaskScalarWhereInput.schema';
import { UserInTaskUncheckedUpdateManyWithoutParticipatingTasksInputObjectSchema } from './UserInTaskUncheckedUpdateManyWithoutParticipatingTasksInput.schema';
import { UserInTaskUpdateManyMutationInputObjectSchema } from './UserInTaskUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => UserInTaskScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => UserInTaskUpdateManyMutationInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedUpdateManyWithoutParticipatingTasksInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskUpdateManyWithWhereWithoutUserInputObjectSchema = Schema;
