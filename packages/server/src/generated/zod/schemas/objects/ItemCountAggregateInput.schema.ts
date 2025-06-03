import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    orderKey: z.literal(true).optional(),
    title: z.literal(true).optional(),
    description: z.literal(true).optional(),
    price: z.literal(true).optional(),
    archived: z.literal(true).optional(),
    imageId: z.literal(true).optional(),
    menuId: z.literal(true).optional(),
    parentId: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ItemCountAggregateInputObjectSchema = Schema;
