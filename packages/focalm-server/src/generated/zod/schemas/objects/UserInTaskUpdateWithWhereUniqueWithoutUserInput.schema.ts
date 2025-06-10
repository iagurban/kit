import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskUncheckedUpdateWithoutUserInputObjectSchema } from './UserInTaskUncheckedUpdateWithoutUserInput.schema';
import { UserInTaskUpdateWithoutUserInputObjectSchema } from './UserInTaskUpdateWithoutUserInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserInTaskUpdateWithoutUserInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
