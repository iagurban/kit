import { z } from 'zod';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ItemScalarWhereInputObjectSchema),
        z.lazy(() => ItemScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ItemScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ItemScalarWhereInputObjectSchema),
        z.lazy(() => ItemScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.dateStr()]).optional(),
    orderKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    title: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    price: z
      .union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()])
      .optional()
      .nullable(),
    archived: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
    imageId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    menuId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    parentId: z
      .union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const ItemScalarWhereInputObjectSchema = Schema;
