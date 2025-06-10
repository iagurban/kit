import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagFindManySchema } from '../findManyUserInTaskTag.schema';
import { TaskArgsObjectSchema } from './TaskArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { UserInTaskCountOutputTypeArgsObjectSchema } from './UserInTaskCountOutputTypeArgs.schema';

const Schema: z.ZodType<Prisma.UserInTaskInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    task: z.union([z.boolean(), z.lazy(() => TaskArgsObjectSchema)]).optional(),
    tags: z.union([z.boolean(), z.lazy(() => UserInTaskTagFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserInTaskCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UserInTaskIncludeObjectSchema = Schema;
