import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UserCreateNestedOneWithoutRefreshTokensInputObjectSchema } from './UserCreateNestedOneWithoutRefreshTokensInput.schema';

const Schema: z.ZodType<Prisma.RefreshTokenCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date(),
    hash: z.string(),
    user: z.lazy(() => UserCreateNestedOneWithoutRefreshTokensInputObjectSchema),
  })
  .strict();

export const RefreshTokenCreateInputObjectSchema = Schema;
