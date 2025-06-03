import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.RefreshTokenScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RefreshTokenScalarWhereInputObjectSchema),
        z.lazy(() => RefreshTokenScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RefreshTokenScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RefreshTokenScalarWhereInputObjectSchema),
        z.lazy(() => RefreshTokenScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    hash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const RefreshTokenScalarWhereInputObjectSchema = Schema;
