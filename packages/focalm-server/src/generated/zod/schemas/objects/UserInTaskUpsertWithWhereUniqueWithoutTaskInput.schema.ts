import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateWithoutTaskInputObjectSchema } from './UserInTaskCreateWithoutTaskInput.schema';
import { UserInTaskUncheckedCreateWithoutTaskInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTaskInput.schema';
import { UserInTaskUncheckedUpdateWithoutTaskInputObjectSchema } from './UserInTaskUncheckedUpdateWithoutTaskInput.schema';
import { UserInTaskUpdateWithoutTaskInputObjectSchema } from './UserInTaskUpdateWithoutTaskInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUpsertWithWhereUniqueWithoutTaskInput> = z
  .object({
    where: z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UserInTaskUpdateWithoutTaskInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedUpdateWithoutTaskInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserInTaskCreateWithoutTaskInputObjectSchema),
      z.lazy(() => UserInTaskUncheckedCreateWithoutTaskInputObjectSchema),
    ]),
  })
  .strict();

export const UserInTaskUpsertWithWhereUniqueWithoutTaskInputObjectSchema = Schema;
