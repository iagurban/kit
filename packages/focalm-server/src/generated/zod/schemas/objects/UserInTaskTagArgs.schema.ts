import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskTagIncludeObjectSchema } from './UserInTaskTagInclude.schema';
import { UserInTaskTagSelectObjectSchema } from './UserInTaskTagSelect.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagArgs> = z
  .object({
    select: z.lazy(() => UserInTaskTagSelectObjectSchema).optional(),
    include: z.lazy(() => UserInTaskTagIncludeObjectSchema).optional(),
  })
  .strict();

export const UserInTaskTagArgsObjectSchema = Schema;
