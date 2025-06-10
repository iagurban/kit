import { z } from 'zod';
import { ItemCreateManyMenuInputObjectSchema } from './ItemCreateManyMenuInput.schema';

import type { Prisma } from '../../../old-client';

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
