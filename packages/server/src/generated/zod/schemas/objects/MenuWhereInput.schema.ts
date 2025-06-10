import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ItemListRelationFilterObjectSchema } from './ItemListRelationFilter.schema';
import { TagListRelationFilterObjectSchema } from './TagListRelationFilter.schema';
import { UploadedFileListRelationFilterObjectSchema } from './UploadedFileListRelationFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.MenuWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => MenuWhereInputObjectSchema), z.lazy(() => MenuWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => MenuWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => MenuWhereInputObjectSchema), z.lazy(() => MenuWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    ownerId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    owner: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional(),
    items: z.lazy(() => ItemListRelationFilterObjectSchema).optional(),
    tags: z.lazy(() => TagListRelationFilterObjectSchema).optional(),
    files: z.lazy(() => UploadedFileListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const MenuWhereInputObjectSchema = Schema;
