import { z } from 'zod';
import { RefreshTokenCreateManyUserInputObjectSchema } from './RefreshTokenCreateManyUserInput.schema';

import type { Prisma } from '../../../old-client';

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
