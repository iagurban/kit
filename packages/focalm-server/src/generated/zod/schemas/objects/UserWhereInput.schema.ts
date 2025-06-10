import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RefreshTokenListRelationFilterObjectSchema } from './RefreshTokenListRelationFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { TaskHistoryGroupListRelationFilterObjectSchema } from './TaskHistoryGroupListRelationFilter.schema';
import { TaskListRelationFilterObjectSchema } from './TaskListRelationFilter.schema';
import { UploadedFileListRelationFilterObjectSchema } from './UploadedFileListRelationFilter.schema';
import { UserInTaskListRelationFilterObjectSchema } from './UserInTaskListRelationFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

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
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    passwordHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    uploadedFiles: z.lazy(() => UploadedFileListRelationFilterObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenListRelationFilterObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskListRelationFilterObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskListRelationFilterObjectSchema).optional(),
    authoredTaskChanges: z.lazy(() => TaskHistoryGroupListRelationFilterObjectSchema).optional(),
    participatingTasks: z.lazy(() => UserInTaskListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const UserWhereInputObjectSchema = Schema;
