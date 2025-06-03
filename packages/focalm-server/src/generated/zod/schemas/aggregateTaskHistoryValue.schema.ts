import { z } from 'zod';

import { TaskHistoryValueCountAggregateInputObjectSchema } from './objects/TaskHistoryValueCountAggregateInput.schema';
import { TaskHistoryValueMaxAggregateInputObjectSchema } from './objects/TaskHistoryValueMaxAggregateInput.schema';
import { TaskHistoryValueMinAggregateInputObjectSchema } from './objects/TaskHistoryValueMinAggregateInput.schema';
import { TaskHistoryValueOrderByWithRelationInputObjectSchema } from './objects/TaskHistoryValueOrderByWithRelationInput.schema';
import { TaskHistoryValueWhereInputObjectSchema } from './objects/TaskHistoryValueWhereInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './objects/TaskHistoryValueWhereUniqueInput.schema';

export const TaskHistoryValueAggregateSchema = z.object({
  orderBy: z
    .union([
      TaskHistoryValueOrderByWithRelationInputObjectSchema,
      TaskHistoryValueOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: TaskHistoryValueWhereInputObjectSchema.optional(),
  cursor: TaskHistoryValueWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), TaskHistoryValueCountAggregateInputObjectSchema]).optional(),
  _min: TaskHistoryValueMinAggregateInputObjectSchema.optional(),
  _max: TaskHistoryValueMaxAggregateInputObjectSchema.optional(),
});
