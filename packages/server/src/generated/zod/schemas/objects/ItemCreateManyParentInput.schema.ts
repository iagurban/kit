import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCreateManyParentInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.dateStr().optional(),
    orderKey: z.string(),
    title: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.number().optional().nullable(),
    archived: z.boolean().optional(),
    imageId: z.string().optional().nullable(),
    menuId: z.string(),
  })
  .strict();

export const ItemCreateManyParentInputObjectSchema = Schema;
