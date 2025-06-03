import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateManyImageInputObjectSchema } from './ItemCreateManyImageInput.schema';

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
