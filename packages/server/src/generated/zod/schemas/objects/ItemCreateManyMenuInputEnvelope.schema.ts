import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateManyMenuInputObjectSchema } from './ItemCreateManyMenuInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateManyMenuInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ItemCreateManyMenuInputObjectSchema),
      z.lazy(() => ItemCreateManyMenuInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ItemCreateManyMenuInputEnvelopeObjectSchema = Schema;
