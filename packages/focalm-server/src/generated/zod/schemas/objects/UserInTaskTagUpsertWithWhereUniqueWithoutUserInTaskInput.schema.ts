import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagUncheckedUpdateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedUpdateWithoutUserInTaskInput.schema';
import { UserInTaskTagUpdateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUpdateWithoutUserInTaskInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './UserInTaskTagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UserInTaskTagUpdateWithoutUserInTaskInputObjectSchema),
      z.lazy(() => UserInTaskTagUncheckedUpdateWithoutUserInTaskInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserInTaskTagCreateWithoutUserInTaskInputObjectSchema),
      z.lazy(() => UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskTagUpsertWithWhereUniqueWithoutUserInTaskInputObjectSchema = Schema;
