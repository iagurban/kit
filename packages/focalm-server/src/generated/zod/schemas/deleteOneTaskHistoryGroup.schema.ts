import { z } from 'zod';

import { TaskHistoryGroupIncludeObjectSchema } from './objects/TaskHistoryGroupInclude.schema';
import { TaskHistoryGroupSelectObjectSchema } from './objects/TaskHistoryGroupSelect.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './objects/TaskHistoryGroupWhereUniqueInput.schema';

export const TaskHistoryGroupDeleteOneSchema = z.object({
  select: TaskHistoryGroupSelectObjectSchema.optional(),
  include: TaskHistoryGroupIncludeObjectSchema.optional(),
  where: TaskHistoryGroupWhereUniqueInputObjectSchema,
});
