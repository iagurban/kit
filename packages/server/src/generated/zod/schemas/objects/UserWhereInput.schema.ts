import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { MenuListRelationFilterObjectSchema } from './MenuListRelationFilter.schema';
import { UploadedFileListRelationFilterObjectSchema } from './UploadedFileListRelationFilter.schema';
import { RefreshTokenListRelationFilterObjectSchema } from './RefreshTokenListRelationFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    passwordHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    menus: z.lazy(() => MenuListRelationFilterObjectSchema).optional(),
    uploadedFiles: z.lazy(() => UploadedFileListRelationFilterObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const UserWhereInputObjectSchema = Schema;
