import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateManyTaskInputEnvelopeObjectSchema } from './UserInTaskCreateManyTaskInputEnvelope.schema';
import { UserInTaskCreateOrConnectWithoutTaskInputObjectSchema } from './UserInTaskCreateOrConnectWithoutTaskInput.schema';
import { UserInTaskCreateWithoutTaskInputObjectSchema } from './UserInTaskCreateWithoutTaskInput.schema';
import { UserInTaskUncheckedCreateWithoutTaskInputObjectSchema } from './UserInTaskUncheckedCreateWithoutTaskInput.schema';
import { UserInTaskWhereUniqueInputObjectSchema } from './UserInTaskWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskUncheckedCreateNestedManyWithoutTaskInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserInTaskCreateWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskCreateWithoutTaskInputObjectSchema).array(),
        z.lazy(() => UserInTaskUncheckedCreateWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskUncheckedCreateWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserInTaskCreateOrConnectWithoutTaskInputObjectSchema),
        z.lazy(() => UserInTaskCreateOrConnectWithoutTaskInputObjectSchema).array(),
      ])
      .optional(),
    createMany: z.lazy(() => UserInTaskCreateManyTaskInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema),
        z.lazy(() => UserInTaskWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserInTaskUncheckedCreateNestedManyWithoutTaskInputObjectSchema = Schema;
