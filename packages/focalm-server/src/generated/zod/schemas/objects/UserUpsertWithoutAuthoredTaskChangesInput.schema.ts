import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateWithoutAuthoredTaskChangesInput.schema';
import { UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTaskChangesInput.schema';
import { UserUncheckedUpdateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUncheckedUpdateWithoutAuthoredTaskChangesInput.schema';
import { UserUpdateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUpdateWithoutAuthoredTaskChangesInput.schema';

const Schema: z.ZodType<Prisma.UserUpsertWithoutAuthoredTaskChangesInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAuthoredTaskChangesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAuthoredTaskChangesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAuthoredTaskChangesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutAuthoredTaskChangesInputObjectSchema = Schema;
