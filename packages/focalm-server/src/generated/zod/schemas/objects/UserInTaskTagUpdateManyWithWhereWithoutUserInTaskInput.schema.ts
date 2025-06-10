import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagScalarWhereInputObjectSchema } from './UserInTaskTagScalarWhereInput.schema';
import { UserInTaskTagUncheckedUpdateManyWithoutTagsInputObjectSchema } from './UserInTaskTagUncheckedUpdateManyWithoutTagsInput.schema';
import { UserInTaskTagUpdateManyMutationInputObjectSchema } from './UserInTaskTagUpdateManyMutationInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskTagScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => UserInTaskTagUpdateManyMutationInputObjectSchema),
      z.lazy(() => UserInTaskTagUncheckedUpdateManyWithoutTagsInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskTagUpdateManyWithWhereWithoutUserInTaskInputObjectSchema = Schema;
