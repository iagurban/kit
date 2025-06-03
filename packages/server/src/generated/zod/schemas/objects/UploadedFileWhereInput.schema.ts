import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { ItemListRelationFilterObjectSchema } from './ItemListRelationFilter.schema';
import { MenuRelationFilterObjectSchema } from './MenuRelationFilter.schema';
import { MenuWhereInputObjectSchema } from './MenuWhereInput.schema';
import { StoredFileRelationFilterObjectSchema } from './StoredFileRelationFilter.schema';
import { StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.UploadedFileWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UploadedFileWhereInputObjectSchema),
        z.lazy(() => UploadedFileWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UploadedFileWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UploadedFileWhereInputObjectSchema),
        z.lazy(() => UploadedFileWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    originalName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    mimetype: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    uploadedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    uploaderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    storedFileId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    menuId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    uploader: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional(),
    storedFile: z
      .union([
        z.lazy(() => StoredFileRelationFilterObjectSchema),
        z.lazy(() => StoredFileWhereInputObjectSchema),
      ])
      .optional(),
    menu: z
      .union([z.lazy(() => MenuRelationFilterObjectSchema), z.lazy(() => MenuWhereInputObjectSchema)])
      .optional(),
    usingItems: z.lazy(() => ItemListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const UploadedFileWhereInputObjectSchema = Schema;
