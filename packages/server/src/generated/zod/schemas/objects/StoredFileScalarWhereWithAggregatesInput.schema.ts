import { z } from 'zod';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => StoredFileScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    hash: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    size: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.dateStr()]).optional(),
  })
  .strict();

export const StoredFileScalarWhereWithAggregatesInputObjectSchema = Schema;
