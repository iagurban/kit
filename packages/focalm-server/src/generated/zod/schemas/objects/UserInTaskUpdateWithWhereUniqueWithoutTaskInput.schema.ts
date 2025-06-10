import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskUncheckedUpdateWithoutTaskInputObjectSchema } from './UserInTaskUncheckedUpdateWithoutTaskInput.schema';
import { UserInTaskUpdateWithoutTaskInputObjectSchema } from './UserInTaskUpdateWithoutTaskInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpdateWithWhereUniqueWithoutTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserInTaskUpdateWithoutTaskInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedUpdateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskUpdateWithWhereUniqueWithoutTaskInputObjectSchema = Schema;
