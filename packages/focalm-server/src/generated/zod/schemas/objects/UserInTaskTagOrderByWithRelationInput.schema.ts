import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserInTaskOrderByWithRelationInputObjectSchema } from './UserInTaskOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.UserInTaskTagOrderByWithRelationInput> = z
  .object({
    userInTaskId: z.lazy(() => SortOrderSchema).optional(),
    tag: z.lazy(() => SortOrderSchema).optional(),
    userInTask: z.lazy(() => UserInTaskOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const UserInTaskTagOrderByWithRelationInputObjectSchema = Schema;
