import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCreateManyTaskInputObjectSchema } from './UserInTaskCreateManyTaskInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskCreateManyTaskInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UserInTaskCreateManyTaskInputObjectSchema),
      z.lazy(() => UserInTaskCreateManyTaskInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserInTaskCreateManyTaskInputEnvelopeObjectSchema = Schema;
