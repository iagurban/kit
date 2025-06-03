import { z } from 'zod';

import { TaskHistoryGroupCountAggregateInputObjectSchema } from './objects/TaskHistoryGroupCountAggregateInput.schema';
import { TaskHistoryGroupMaxAggregateInputObjectSchema } from './objects/TaskHistoryGroupMaxAggregateInput.schema';
import { TaskHistoryGroupMinAggregateInputObjectSchema } from './objects/TaskHistoryGroupMinAggregateInput.schema';
import { TaskHistoryGroupOrderByWithRelationInputObjectSchema } from './objects/TaskHistoryGroupOrderByWithRelationInput.schema';
import { TaskHistoryGroupWhereInputObjectSchema } from './objects/TaskHistoryGroupWhereInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './objects/TaskHistoryGroupWhereUniqueInput.schema';

export const TaskHistoryGroupAggregateSchema = z.object({
  orderBy: z
    .union([
      TaskHistoryGroupOrderByWithRelationInputObjectSchema,
      TaskHistoryGroupOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: TaskHistoryGroupWhereInputObjectSchema.optional(),
  cursor: TaskHistoryGroupWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), TaskHistoryGroupCountAggregateInputObjectSchema]).optional(),
  _min: TaskHistoryGroupMinAggregateInputObjectSchema.optional(),
  _max: TaskHistoryGroupMaxAggregateInputObjectSchema.optional(),
});
