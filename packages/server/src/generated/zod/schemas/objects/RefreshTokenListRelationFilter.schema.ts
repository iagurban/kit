import { z } from 'zod';
import { RefreshTokenWhereInputObjectSchema } from './RefreshTokenWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenListRelationFilter> = z
  .object({
    every: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
    some: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
    none: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
  })
  .strict();

export const RefreshTokenListRelationFilterObjectSchema = Schema;
