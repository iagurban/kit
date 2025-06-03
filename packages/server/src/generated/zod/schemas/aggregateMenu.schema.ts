import { z } from 'zod';

import { MenuCountAggregateInputObjectSchema } from './objects/MenuCountAggregateInput.schema';
import { MenuMaxAggregateInputObjectSchema } from './objects/MenuMaxAggregateInput.schema';
import { MenuMinAggregateInputObjectSchema } from './objects/MenuMinAggregateInput.schema';
import { MenuOrderByWithRelationInputObjectSchema } from './objects/MenuOrderByWithRelationInput.schema';
import { MenuWhereInputObjectSchema } from './objects/MenuWhereInput.schema';
import { MenuWhereUniqueInputObjectSchema } from './objects/MenuWhereUniqueInput.schema';

export const MenuAggregateSchema = z.object({
  orderBy: z
    .union([MenuOrderByWithRelationInputObjectSchema, MenuOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: MenuWhereInputObjectSchema.optional(),
  cursor: MenuWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), MenuCountAggregateInputObjectSchema]).optional(),
  _min: MenuMinAggregateInputObjectSchema.optional(),
  _max: MenuMaxAggregateInputObjectSchema.optional(),
});
