import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuCreateManyOwnerInputObjectSchema } from './MenuCreateManyOwnerInput.schema';

const Schema: z.ZodType<Prisma.MenuCreateManyOwnerInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => MenuCreateManyOwnerInputObjectSchema),
      z.lazy(() => MenuCreateManyOwnerInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const MenuCreateManyOwnerInputEnvelopeObjectSchema = Schema;
