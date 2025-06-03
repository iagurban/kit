import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.UploadedFileScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UploadedFileScalarWhereInputObjectSchema),
        z.lazy(() => UploadedFileScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UploadedFileScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UploadedFileScalarWhereInputObjectSchema),
        z.lazy(() => UploadedFileScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    originalName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    mimetype: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    uploadedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    uploaderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    storedFileId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const UploadedFileScalarWhereInputObjectSchema = Schema;
