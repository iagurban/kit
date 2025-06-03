import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateNestedManyWithoutParentInputObjectSchema } from './ItemCreateNestedManyWithoutParentInput.schema';
import { ItemCreateNestedOneWithoutChildrenInputObjectSchema } from './ItemCreateNestedOneWithoutChildrenInput.schema';
import { MenuCreateNestedOneWithoutItemsInputObjectSchema } from './MenuCreateNestedOneWithoutItemsInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateWithoutImageInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    orderKey: z.string(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    archived: z.boolean().optional(),
    menu: z.lazy(() => MenuCreateNestedOneWithoutItemsInputObjectSchema),
    parent: z.lazy(() => ItemCreateNestedOneWithoutChildrenInputObjectSchema).optional(),
    children: z.lazy(() => ItemCreateNestedManyWithoutParentInputObjectSchema).optional(),
  })
  .strict();

export const ItemCreateWithoutImageInputObjectSchema = Schema;
