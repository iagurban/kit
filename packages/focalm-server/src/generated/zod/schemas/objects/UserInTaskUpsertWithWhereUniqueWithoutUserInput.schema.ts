import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateWithoutUserInputObjectSchema } from './UserInTaskCreateWithoutUserInput.schema';
import { UserInTaskUncheckedCreateWithoutUserInputObjectSchema } from './UserInTaskUncheckedCreateWithoutUserInput.schema';
import { UserInTaskUncheckedUpdateWithoutUserInputObjectSchema } from './UserInTaskUncheckedUpdateWithoutUserInput.schema';
import { UserInTaskUpdateWithoutUserInputObjectSchema } from './UserInTaskUpdateWithoutUserInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UserInTaskUpdateWithoutUserInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserInTaskCreateWithoutUserInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
