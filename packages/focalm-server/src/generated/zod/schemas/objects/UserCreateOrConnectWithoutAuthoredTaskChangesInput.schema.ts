import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateWithoutAuthoredTaskChangesInput.schema';
import { UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTaskChangesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuthoredTaskChangesInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthoredTaskChangesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutAuthoredTaskChangesInputObjectSchema = Schema;
