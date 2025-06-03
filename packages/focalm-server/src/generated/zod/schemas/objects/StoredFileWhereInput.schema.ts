import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UploadedFileListRelationFilterObjectSchema } from './UploadedFileListRelationFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.StoredFileWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => StoredFileWhereInputObjectSchema),
        z.lazy(() => StoredFileWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => StoredFileWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => StoredFileWhereInputObjectSchema),
        z.lazy(() => StoredFileWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    hash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    size: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    uploads: z.lazy(() => UploadedFileListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const StoredFileWhereInputObjectSchema = Schema;
