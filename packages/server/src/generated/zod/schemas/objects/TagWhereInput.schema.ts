import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { MenuRelationFilterObjectSchema } from './MenuRelationFilter.schema';
import { MenuWhereInputObjectSchema } from './MenuWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => TagWhereInputObjectSchema), z.lazy(() => TagWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => TagWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => TagWhereInputObjectSchema), z.lazy(() => TagWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    menuId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    menu: z
      .union([z.lazy(() => MenuRelationFilterObjectSchema), z.lazy(() => MenuWhereInputObjectSchema)])
      .optional(),
  })
  .strict();

export const TagWhereInputObjectSchema = Schema;
