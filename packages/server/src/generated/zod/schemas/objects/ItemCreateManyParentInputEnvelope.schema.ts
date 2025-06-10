import { z } from 'zod';
import { ItemCreateManyParentInputObjectSchema } from './ItemCreateManyParentInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCreateManyParentInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => ItemCreateManyParentInputObjectSchema),
      z.lazy(() => ItemCreateManyParentInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const ItemCreateManyParentInputEnvelopeObjectSchema = Schema;
