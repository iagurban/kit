import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateOrConnectWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateOrConnectWithoutAuthoredTaskChangesInput.schema';
import { UserCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateWithoutAuthoredTaskChangesInput.schema';
import { UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema } from './UserUncheckedCreateWithoutAuthoredTaskChangesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuthoredTaskChangesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAuthoredTaskChangesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutAuthoredTaskChangesInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuthoredTaskChangesInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutAuthoredTaskChangesInputObjectSchema = Schema;
