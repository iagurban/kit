import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
  })
  .strict();

export const StoredFileWhereUniqueInputObjectSchema = Schema;
