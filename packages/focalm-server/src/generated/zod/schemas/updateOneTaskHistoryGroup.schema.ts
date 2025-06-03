import { z } from 'zod';

import { TaskHistoryGroupIncludeObjectSchema } from './objects/TaskHistoryGroupInclude.schema';
import { TaskHistoryGroupSelectObjectSchema } from './objects/TaskHistoryGroupSelect.schema';
import { TaskHistoryGroupUncheckedUpdateInputObjectSchema } from './objects/TaskHistoryGroupUncheckedUpdateInput.schema';
import { TaskHistoryGroupUpdateInputObjectSchema } from './objects/TaskHistoryGroupUpdateInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './objects/TaskHistoryGroupWhereUniqueInput.schema';

export const TaskHistoryGroupUpdateOneSchema = z.object({
  select: TaskHistoryGroupSelectObjectSchema.optional(),
  include: TaskHistoryGroupIncludeObjectSchema.optional(),
  data: z.union([TaskHistoryGroupUpdateInputObjectSchema, TaskHistoryGroupUncheckedUpdateInputObjectSchema]),
  where: TaskHistoryGroupWhereUniqueInputObjectSchema,
});
