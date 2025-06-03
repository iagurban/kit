import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagWhereInputObjectSchema } from './TagWhereInput.schema';

const Schema: z.ZodType<Prisma.TagListRelationFilter> = z
  .object({
    every: z.lazy(() => TagWhereInputObjectSchema).optional(),
    some: z.lazy(() => TagWhereInputObjectSchema).optional(),
    none: z.lazy(() => TagWhereInputObjectSchema).optional(),
  })
  .strict();

export const TagListRelationFilterObjectSchema = Schema;
