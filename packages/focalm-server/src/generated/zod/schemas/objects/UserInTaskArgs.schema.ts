import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskIncludeObjectSchema } from './UserInTaskInclude.schema';
import { UserInTaskSelectObjectSchema } from './UserInTaskSelect.schema';

const Schema: z.ZodType<Prisma.UserInTaskArgs> = z
  .object({
    select: z.lazy(() => UserInTaskSelectObjectSchema).optional(),
    include: z.lazy(() => UserInTaskIncludeObjectSchema).optional(),
  })
  .strict();

export const UserInTaskArgsObjectSchema = Schema;
