import { z } from 'zod';

import { TaskHistoryValueIncludeObjectSchema } from './objects/TaskHistoryValueInclude.schema';
import { TaskHistoryValueSelectObjectSchema } from './objects/TaskHistoryValueSelect.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './objects/TaskHistoryValueWhereUniqueInput.schema';

export const TaskHistoryValueFindUniqueSchema = z.object({
  select: TaskHistoryValueSelectObjectSchema.optional(),
  include: TaskHistoryValueIncludeObjectSchema.optional(),
  where: TaskHistoryValueWhereUniqueInputObjectSchema,
});
