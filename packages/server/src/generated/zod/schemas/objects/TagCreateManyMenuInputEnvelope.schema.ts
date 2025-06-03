import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagCreateManyMenuInputObjectSchema } from './TagCreateManyMenuInput.schema';

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
