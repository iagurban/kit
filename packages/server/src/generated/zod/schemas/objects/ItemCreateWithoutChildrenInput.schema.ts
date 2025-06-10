import { z } from 'zod';
import { UploadedFileCreateNestedOneWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateNestedOneWithoutUsingItemsInput.schema';
import { MenuCreateNestedOneWithoutItemsInputObjectSchema } from './MenuCreateNestedOneWithoutItemsInput.schema';
import { ItemCreateNestedOneWithoutChildrenInputObjectSchema } from './ItemCreateNestedOneWithoutChildrenInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCreateWithoutChildrenInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    orderKey: z.string(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    archived: z.boolean().optional(),
    image: z.lazy(() => UploadedFileCreateNestedOneWithoutUsingItemsInputObjectSchema).optional(),
    menu: z.lazy(() => MenuCreateNestedOneWithoutItemsInputObjectSchema),
    parent: z.lazy(() => ItemCreateNestedOneWithoutChildrenInputObjectSchema).optional(),
  })
  .strict();

export const ItemCreateWithoutChildrenInputObjectSchema = Schema;
