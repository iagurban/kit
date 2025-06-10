import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagCreateManyUserInTaskInputEnvelopeObjectSchema } from './UserInTaskTagCreateManyUserInTaskInputEnvelope.schema';
import { UserInTaskTagCreateOrConnectWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateOrConnectWithoutUserInTaskInput.schema';
import { UserInTaskTagCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema } from './UserInTaskTagUncheckedCreateWithoutUserInTaskInput.schema';
import { UserInTaskTagWhereUniqueInputObjectSchema } from './UserInTaskTagWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagCreateNestedManyWithoutUserInTaskInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskTagCreateWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagCreateWithoutUserInTaskInputObjectSchema).array(),
        z.lazy(() => UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagUncheckedCreateWithoutUserInTaskInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserInTaskTagCreateOrConnectWithoutUserInTaskInputObjectSchema),
        z.lazy(() => UserInTaskTagCreateOrConnectWithoutUserInTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserInTaskTagCreateManyUserInTaskInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskTagWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserInTaskTagCreateNestedManyWithoutUserInTaskInputObjectSchema = Schema;
