import { z } from 'zod';

import { TaskHistoryGroupCreateInputObjectSchema } from './objects/TaskHistoryGroupCreateInput.schema';
import { TaskHistoryGroupIncludeObjectSchema } from './objects/TaskHistoryGroupInclude.schema';
import { TaskHistoryGroupSelectObjectSchema } from './objects/TaskHistoryGroupSelect.schema';
import { TaskHistoryGroupUncheckedCreateInputObjectSchema } from './objects/TaskHistoryGroupUncheckedCreateInput.schema';
import { TaskHistoryGroupUncheckedUpdateInputObjectSchema } from './objects/TaskHistoryGroupUncheckedUpdateInput.schema';
import { TaskHistoryGroupUpdateInputObjectSchema } from './objects/TaskHistoryGroupUpdateInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './objects/TaskHistoryGroupWhereUniqueInput.schema';

export const TaskHistoryGroupUpsertSchema = z.object({
  select: TaskHistoryGroupSelectObjectSchema.optional(),
  include: TaskHistoryGroupIncludeObjectSchema.optional(),
  where: TaskHistoryGroupWhereUniqueInputObjectSchema,
  create: z.union([
    TaskHistoryGroupCreateInputObjectSchema,
    TaskHistoryGroupUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    TaskHistoryGroupUpdateInputObjectSchema,
    TaskHistoryGroupUncheckedUpdateInputObjectSchema,
  ]),
});
