import { z } from 'zod';

import { TaskHistoryGroupCreateInputObjectSchema } from './objects/TaskHistoryGroupCreateInput.schema';
import { TaskHistoryGroupIncludeObjectSchema } from './objects/TaskHistoryGroupInclude.schema';
import { TaskHistoryGroupSelectObjectSchema } from './objects/TaskHistoryGroupSelect.schema';
import { TaskHistoryGroupUncheckedCreateInputObjectSchema } from './objects/TaskHistoryGroupUncheckedCreateInput.schema';

export const TaskHistoryGroupCreateOneSchema = z.object({
  select: TaskHistoryGroupSelectObjectSchema.optional(),
  include: TaskHistoryGroupIncludeObjectSchema.optional(),
  data: z.union([TaskHistoryGroupCreateInputObjectSchema, TaskHistoryGroupUncheckedCreateInputObjectSchema]),
});
