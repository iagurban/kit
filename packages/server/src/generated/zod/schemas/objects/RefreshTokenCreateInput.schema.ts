import { z } from 'zod';
import { UserCreateNestedOneWithoutRefreshTokensInputObjectSchema } from './UserCreateNestedOneWithoutRefreshTokensInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    expiresAt: z.coerce.dateStr(),
    hash: z.string(),
    user: z.lazy(() => UserCreateNestedOneWithoutRefreshTokensInputObjectSchema),
  })
  .strict();

export const RefreshTokenCreateInputObjectSchema = Schema;
