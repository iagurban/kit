import { z } from 'zod';
import { ItemCreateManyImageInputObjectSchema } from './ItemCreateManyImageInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCreateManyImageInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ItemCreateManyImageInputObjectSchema),
      z.lazy(() => ItemCreateManyImageInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ItemCreateManyImageInputEnvelopeObjectSchema = Schema;
