import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateManyUserInputEnvelopeObjectSchema } from './UserInTaskCreateManyUserInputEnvelope.schema';
import { UserInTaskCreateOrConnectWithoutUserInputObjectSchema } from './UserInTaskCreateOrConnectWithoutUserInput.schema';
import { UserInTaskCreateWithoutUserInputObjectSchema } from './UserInTaskCreateWithoutUserInput.schema';
import { UserInTaskUncheckedCreateWithoutUserInputObjectSchema } from './UserInTaskUncheckedCreateWithoutUserInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => UserInTaskUncheckedCreateWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskUncheckedCreateWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserInTaskCreateOrConnectWithoutUserInputObjectSchema),
        z.lazy(() => UserInTaskCreateOrConnectWithoutUserInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserInTaskCreateManyUserInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserInTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema = Schema;
