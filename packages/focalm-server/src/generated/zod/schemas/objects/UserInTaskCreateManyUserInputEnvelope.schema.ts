import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateManyUserInputObjectSchema } from './UserInTaskCreateManyUserInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UserInTaskCreateManyUserInputObjectSchema),
      z.lazy(() => UserInTaskCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserInTaskCreateManyUserInputEnvelopeObjectSchema = Schema;
