import { z } from 'zod';
import { MenuWhereInputObjectSchema } from './MenuWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuRelationFilter> = z
  .object({
    is: z
      .lazy(() => MenuWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => MenuWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const MenuRelationFilterObjectSchema = Schema;
