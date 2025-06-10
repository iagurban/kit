import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagFindManySchema } from '../findManyUserInTaskTag.schema';
import { TaskArgsObjectSchema } from './TaskArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { UserInTaskCountOutputTypeArgsObjectSchema } from './UserInTaskCountOutputTypeArgs.schema';

const Schema: z.ZodType<Prisma.UserInTaskSelect> = z
  .object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    taskId: z.boolean().optional(),
    task: z.union([z.boolean(), z.lazy(() => TaskArgsObjectSchema)]).optional(),
    tags: z.union([z.boolean(), z.lazy(() => UserInTaskTagFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserInTaskCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UserInTaskSelectObjectSchema = Schema;
