import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '../../../old-client';

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
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    ownerId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  })
  .strict();

export const MenuScalarWhereInputObjectSchema = Schema;
