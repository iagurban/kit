import { z } from 'zod';

import { TaskAvgAggregateInputObjectSchema } from './objects/TaskAvgAggregateInput.schema';
import { TaskCountAggregateInputObjectSchema } from './objects/TaskCountAggregateInput.schema';
import { TaskMaxAggregateInputObjectSchema } from './objects/TaskMaxAggregateInput.schema';
import { TaskMinAggregateInputObjectSchema } from './objects/TaskMinAggregateInput.schema';
import { TaskOrderByWithRelationInputObjectSchema } from './objects/TaskOrderByWithRelationInput.schema';
import { TaskSumAggregateInputObjectSchema } from './objects/TaskSumAggregateInput.schema';
import { TaskWhereInputObjectSchema } from './objects/TaskWhereInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './objects/TaskWhereUniqueInput.schema';

export const TaskAggregateSchema = z.object({
  orderBy: z
    .union([TaskOrderByWithRelationInputObjectSchema, TaskOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: TaskWhereInputObjectSchema.optional(),
  cursor: TaskWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), TaskCountAggregateInputObjectSchema]).optional(),
  _min: TaskMinAggregateInputObjectSchema.optional(),
  _max: TaskMaxAggregateInputObjectSchema.optional(),
  _avg: TaskAvgAggregateInputObjectSchema.optional(),
  _sum: TaskSumAggregateInputObjectSchema.optional(),
});
