import { z } from 'zod';
import { TagCreateManyMenuInputObjectSchema } from './TagCreateManyMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagCreateManyMenuInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TagCreateManyMenuInputObjectSchema),
      z.lazy(() => TagCreateManyMenuInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TagCreateManyMenuInputEnvelopeObjectSchema = Schema;
