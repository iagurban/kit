import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '../../../old-client';

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
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    hash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const RefreshTokenScalarWhereInputObjectSchema = Schema;
