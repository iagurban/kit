import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UserRelationFilterObjectSchema } from './UserRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.RefreshTokenWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RefreshTokenWhereInputObjectSchema),
        z.lazy(() => RefreshTokenWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RefreshTokenWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RefreshTokenWhereInputObjectSchema),
        z.lazy(() => RefreshTokenWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    hash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    user: z
      .union([z.lazy(() => UserRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)])
      .optional(),
  })
  .strict();

export const RefreshTokenWhereInputObjectSchema = Schema;
