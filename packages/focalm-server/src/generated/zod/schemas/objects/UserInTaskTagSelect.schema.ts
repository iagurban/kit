import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskArgsObjectSchema } from './UserInTaskArgs.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagSelect> = z
  .object({
    userInTaskId: z.boolean().optional(),
    userInTask: z.union([z.boolean(), z.lazy(() => UserInTaskArgsObjectSchema)]).optional(),
    tag: z.boolean().optional(),
  })
  .strict();

export const UserInTaskTagSelectObjectSchema = Schema;
