import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TagScalarWhereInputObjectSchema),
        z.lazy(() => TagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TagScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TagScalarWhereInputObjectSchema),
        z.lazy(() => TagScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    menuId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const TagScalarWhereInputObjectSchema = Schema;
