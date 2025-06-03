import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateManyParentInputObjectSchema } from './ItemCreateManyParentInput.schema';

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
