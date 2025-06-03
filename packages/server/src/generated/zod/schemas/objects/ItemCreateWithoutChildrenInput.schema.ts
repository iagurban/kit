import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateNestedOneWithoutChildrenInputObjectSchema } from './ItemCreateNestedOneWithoutChildrenInput.schema';
import { MenuCreateNestedOneWithoutItemsInputObjectSchema } from './MenuCreateNestedOneWithoutItemsInput.schema';
import { UploadedFileCreateNestedOneWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateNestedOneWithoutUsingItemsInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateWithoutChildrenInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
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
