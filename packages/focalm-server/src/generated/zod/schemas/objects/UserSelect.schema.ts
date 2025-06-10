import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { RefreshTokenFindManySchema } from '../findManyRefreshToken.schema';
import { TaskFindManySchema } from '../findManyTask.schema';
import { TaskHistoryGroupFindManySchema } from '../findManyTaskHistoryGroup.schema';
import { UploadedFileFindManySchema } from '../findManyUploadedFile.schema';
import { UserInTaskFindManySchema } from '../findManyUserInTask.schema';
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema';

const Schema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    passwordHash: z.boolean().optional(),
    uploadedFiles: z.union([z.boolean(), z.lazy(() => UploadedFileFindManySchema)]).optional(),
    refreshTokens: z.union([z.boolean(), z.lazy(() => RefreshTokenFindManySchema)]).optional(),
    assignedTasks: z.union([z.boolean(), z.lazy(() => TaskFindManySchema)]).optional(),
    authoredTasks: z.union([z.boolean(), z.lazy(() => TaskFindManySchema)]).optional(),
    authoredTaskChanges: z.union([z.boolean(), z.lazy(() => TaskHistoryGroupFindManySchema)]).optional(),
    participatingTasks: z.union([z.boolean(), z.lazy(() => UserInTaskFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UserSelectObjectSchema = Schema;
