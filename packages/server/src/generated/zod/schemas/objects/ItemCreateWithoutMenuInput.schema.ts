import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemCreateNestedManyWithoutParentInputObjectSchema } from './ItemCreateNestedManyWithoutParentInput.schema';
import { ItemCreateNestedOneWithoutChildrenInputObjectSchema } from './ItemCreateNestedOneWithoutChildrenInput.schema';
import { UploadedFileCreateNestedOneWithoutUsingItemsInputObjectSchema } from './UploadedFileCreateNestedOneWithoutUsingItemsInput.schema';

const Schema: z.ZodType<Prisma.ItemCreateWithoutMenuInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    orderKey: z.string(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    archived: z.boolean().optional(),
    image: z.lazy(() => UploadedFileCreateNestedOneWithoutUsingItemsInputObjectSchema).optional(),
    parent: z.lazy(() => ItemCreateNestedOneWithoutChildrenInputObjectSchema).optional(),
    children: z.lazy(() => ItemCreateNestedManyWithoutParentInputObjectSchema).optional(),
  })
  .strict();

export const ItemCreateWithoutMenuInputObjectSchema = Schema;
