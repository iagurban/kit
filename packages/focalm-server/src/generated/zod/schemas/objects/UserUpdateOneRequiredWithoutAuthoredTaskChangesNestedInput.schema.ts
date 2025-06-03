import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateOrConnectWithoutAuthoredTaskChangesInput.schema';
import { UserCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateWithoutAuthoredTaskChangesInput.schema';
import { UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTaskChangesInput.schema';
import { UserUncheckedUpdateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUncheckedUpdateWithoutAuthoredTaskChangesInput.schema';
import { UserUpdateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUpdateWithoutAuthoredTaskChangesInput.schema';
import { UserUpsertWithoutAuthoredTaskChangesInputObjectSchema } from './UserUpsertWithoutAuthoredTaskChangesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAuthoredTaskChangesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthoredTaskChangesInputObjectSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutAuthoredTaskChangesInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutAuthoredTaskChangesInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAuthoredTaskChangesInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInputObjectSchema = Schema;
