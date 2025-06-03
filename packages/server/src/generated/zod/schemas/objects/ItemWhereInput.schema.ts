import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { ItemListRelationFilterObjectSchema } from './ItemListRelationFilter.schema';
import { ItemRelationFilterObjectSchema } from './ItemRelationFilter.schema';
import { MenuRelationFilterObjectSchema } from './MenuRelationFilter.schema';
import { MenuWhereInputObjectSchema } from './MenuWhereInput.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UploadedFileRelationFilterObjectSchema } from './UploadedFileRelationFilter.schema';
import { UploadedFileWhereInputObjectSchema } from './UploadedFileWhereInput.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';

const Schema: z.ZodType<Prisma.ItemWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => ItemWhereInputObjectSchema), z.lazy(() => ItemWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => ItemWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => ItemWhereInputObjectSchema), z.lazy(() => ItemWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
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
    image: z
      .union([
        z.lazy(() => UploadedFileRelationFilterObjectSchema),
        z.lazy(() => UploadedFileWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
    menu: z
      .union([z.lazy(() => MenuRelationFilterObjectSchema), z.lazy(() => MenuWhereInputObjectSchema)])
      .optional(),
    parent: z
      .union([z.lazy(() => ItemRelationFilterObjectSchema), z.lazy(() => ItemWhereInputObjectSchema)])
      .optional()
      .nullable(),
    children: z.lazy(() => ItemListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const ItemWhereInputObjectSchema = Schema;
