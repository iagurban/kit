import { z } from 'zod';

import { TaskHistoryValueCreateInputObjectSchema } from './objects/TaskHistoryValueCreateInput.schema';
import { TaskHistoryValueIncludeObjectSchema } from './objects/TaskHistoryValueInclude.schema';
import { TaskHistoryValueSelectObjectSchema } from './objects/TaskHistoryValueSelect.schema';
import { TaskHistoryValueUncheckedCreateInputObjectSchema } from './objects/TaskHistoryValueUncheckedCreateInput.schema';

export const TaskHistoryValueCreateOneSchema = z.object({
  select: TaskHistoryValueSelectObjectSchema.optional(),
  include: TaskHistoryValueIncludeObjectSchema.optional(),
  data: z.union([TaskHistoryValueCreateInputObjectSchema, TaskHistoryValueUncheckedCreateInputObjectSchema]),
});
