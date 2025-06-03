import { z } from 'zod';

import { TaskHistoryValueIncludeObjectSchema } from './objects/TaskHistoryValueInclude.schema';
import { TaskHistoryValueSelectObjectSchema } from './objects/TaskHistoryValueSelect.schema';
import { TaskHistoryValueUncheckedUpdateInputObjectSchema } from './objects/TaskHistoryValueUncheckedUpdateInput.schema';
import { TaskHistoryValueUpdateInputObjectSchema } from './objects/TaskHistoryValueUpdateInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './objects/TaskHistoryValueWhereUniqueInput.schema';

export const TaskHistoryValueUpdateOneSchema = z.object({
  select: TaskHistoryValueSelectObjectSchema.optional(),
  include: TaskHistoryValueIncludeObjectSchema.optional(),
  data: z.union([TaskHistoryValueUpdateInputObjectSchema, TaskHistoryValueUncheckedUpdateInputObjectSchema]),
  where: TaskHistoryValueWhereUniqueInputObjectSchema,
});
