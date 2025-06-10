import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserInTaskCountOutputTypeSelectObjectSchema } from './UserInTaskCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.UserInTaskCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => UserInTaskCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const UserInTaskCountOutputTypeArgsObjectSchema = Schema;
