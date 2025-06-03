import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuWhereInputObjectSchema } from './MenuWhereInput.schema';

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
