import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskScalarWhereInputObjectSchema } from './UserInTaskScalarWhereInput.schema';
import { UserInTaskUncheckedUpdateManyWithoutParticipantsInputObjectSchema } from './UserInTaskUncheckedUpdateManyWithoutParticipantsInput.schema';
import { UserInTaskUpdateManyMutationInputObjectSchema } from './UserInTaskUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateManyWithWhereWithoutTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => UserInTaskUpdateManyMutationInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedUpdateManyWithoutParticipantsInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskUpdateManyWithWhereWithoutTaskInputObjectSchema = Schema;
