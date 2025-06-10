import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagUncheckedUpdateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedUpdateWithoutUserInTaskInput.schema';
import { UserInTaskTagUpdateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUpdateWithoutUserInTaskInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './UserInTaskTagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserInTaskTagUpdateWithoutUserInTaskInputObjectSchema),
      z.lazy(() => UserInTaskTagUncheckedUpdateWithoutUserInTaskInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskTagUpdateWithWhereUniqueWithoutUserInTaskInputObjectSchema = Schema;
