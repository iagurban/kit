import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskArgsObjectSchema } from './UserInTaskArgs.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagInclude> = z
  .object({
    userInTask: z.union([z.boolean(), z.lazy(() => UserInTaskArgsObjectSchema)]).optional(),
  })
  .strict();

export const UserInTaskTagIncludeObjectSchema = Schema;
