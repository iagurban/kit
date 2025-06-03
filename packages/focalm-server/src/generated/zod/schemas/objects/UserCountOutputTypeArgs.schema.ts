import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCountOutputTypeSelectObjectSchema } from './UserCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => UserCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsObjectSchema = Schema;
