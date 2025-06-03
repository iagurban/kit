import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenWhereInputObjectSchema } from './RefreshTokenWhereInput.schema';

const Schema: z.ZodType<Prisma.RefreshTokenListRelationFilter> = z
  .object({
    every: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
    some: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
    none: z.lazy(() => RefreshTokenWhereInputObjectSchema).optional(),
  })
  .strict();

export const RefreshTokenListRelationFilterObjectSchema = Schema;
