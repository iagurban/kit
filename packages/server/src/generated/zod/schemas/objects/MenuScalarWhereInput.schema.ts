import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';

const Schema: z.ZodType<Prisma.MenuScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MenuScalarWhereInputObjectSchema),
        z.lazy(() => MenuScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MenuScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MenuScalarWhereInputObjectSchema),
        z.lazy(() => MenuScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    ownerId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const MenuScalarWhereInputObjectSchema = Schema;
