import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateWithoutTaskInputObjectSchema } from './UserInTaskCreateWithoutTaskInput.schema';
import { UserInTaskUncheckedCreateWithoutTaskInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTaskInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateOrConnectWithoutTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserInTaskCreateWithoutTaskInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedCreateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskCreateOrConnectWithoutTaskInputObjectSchema = Schema;
