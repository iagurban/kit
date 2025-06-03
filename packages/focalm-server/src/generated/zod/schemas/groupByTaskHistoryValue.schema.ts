import { z } from 'zod';

import { TaskHistoryValueScalarFieldEnumSchema } from './enums/TaskHistoryValueScalarFieldEnum.schema';
import { TaskHistoryValueOrderByWithAggregationInputObjectSchema } from './objects/TaskHistoryValueOrderByWithAggregationInput.schema';
import { TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema } from './objects/TaskHistoryValueScalarWhereWithAggregatesInput.schema';
import { TaskHistoryValueWhereInputObjectSchema } from './objects/TaskHistoryValueWhereInput.schema';

export const TaskHistoryValueGroupBySchema = z.object({
  where: TaskHistoryValueWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      TaskHistoryValueOrderByWithAggregationInputObjectSchema,
      TaskHistoryValueOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: TaskHistoryValueScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(TaskHistoryValueScalarFieldEnumSchema),
});
