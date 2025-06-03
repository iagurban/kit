import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenCreateManyUserInputObjectSchema } from './RefreshTokenCreateManyUserInput.schema';

const Schema: z.ZodType<Prisma.RefreshTokenCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => RefreshTokenCreateManyUserInputObjectSchema),
      z.lazy(() => RefreshTokenCreateManyUserInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const RefreshTokenCreateManyUserInputEnvelopeObjectSchema = Schema;
