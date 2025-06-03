import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemUncheckedCreateWithoutChildrenInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    orderKey: z.string(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    archived: z.boolean().optional(),
    imageId: z.string().optional().nullable(),
    menuId: z.string(),
    parentId: z.string().optional().nullable(),
  })
  .strict();

export const ItemUncheckedCreateWithoutChildrenInputObjectSchema = Schema;
