import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuWhereInputObjectSchema } from './MenuWhereInput.schema';

const Schema: z.ZodType<Prisma.MenuListRelationFilter> = z
  .object({
    every: z.lazy(() => MenuWhereInputObjectSchema).optional(),
    some: z.lazy(() => MenuWhereInputObjectSchema).optional(),
    none: z.lazy(() => MenuWhereInputObjectSchema).optional(),
  })
  .strict();

export const MenuListRelationFilterObjectSchema = Schema;
