import { z } from 'zod';

import { TaskHistoryGroupScalarFieldEnumSchema } from './enums/TaskHistoryGroupScalarFieldEnum.schema';
import { TaskHistoryGroupOrderByWithAggregationInputObjectSchema } from './objects/TaskHistoryGroupOrderByWithAggregationInput.schema';
import { TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema } from './objects/TaskHistoryGroupScalarWhereWithAggregatesInput.schema';
import { TaskHistoryGroupWhereInputObjectSchema } from './objects/TaskHistoryGroupWhereInput.schema';

export const TaskHistoryGroupGroupBySchema = z.object({
  where: TaskHistoryGroupWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      TaskHistoryGroupOrderByWithAggregationInputObjectSchema,
      TaskHistoryGroupOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: TaskHistoryGroupScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(TaskHistoryGroupScalarFieldEnumSchema),
});
