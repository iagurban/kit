import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagCreateManyUserInTaskInputObjectSchema } from './UserInTaskTagCreateManyUserInTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagCreateManyUserInTaskInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UserInTaskTagCreateManyUserInTaskInputObjectSchema),
      z.lazy(() => UserInTaskTagCreateManyUserInTaskInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserInTaskTagCreateManyUserInTaskInputEnvelopeObjectSchema = Schema;
