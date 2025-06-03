import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemUncheckedCreateNestedManyWithoutParentInputObjectSchema } from './ItemUncheckedCreateNestedManyWithoutParentInput.schema';

const Schema: z.ZodType<Prisma.ItemUncheckedCreateWithoutImageInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    orderKey: z.string(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    archived: z.boolean().optional(),
    menuId: z.string(),
    parentId: z.string().optional().nullable(),
    children: z.lazy(() => ItemUncheckedCreateNestedManyWithoutParentInputObjectSchema).optional(),
  })
  .strict();

export const ItemUncheckedCreateWithoutImageInputObjectSchema = Schema;
