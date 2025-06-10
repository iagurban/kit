import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateWithoutUserInputObjectSchema } from './UserInTaskCreateWithoutUserInput.schema';
import { UserInTaskUncheckedCreateWithoutUserInputObjectSchema } from './UserInTaskUncheckedCreateWithoutUserInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserInTaskCreateWithoutUserInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskCreateOrConnectWithoutUserInputObjectSchema = Schema;
