import { z } from 'zod';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UploadedFileScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UploadedFileScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UploadedFileScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UploadedFileScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => UploadedFileScalarWhereWithAggregatesInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    originalName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    mimetype: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    uploadedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.dateStr()]).optional(),
    uploaderId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    storedFileId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
    menuId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const UploadedFileScalarWhereWithAggregatesInputObjectSchema = Schema;
