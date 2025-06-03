import { z } from 'zod';

import { TaskHistoryValueCreateInputObjectSchema } from './objects/TaskHistoryValueCreateInput.schema';
import { TaskHistoryValueIncludeObjectSchema } from './objects/TaskHistoryValueInclude.schema';
import { TaskHistoryValueSelectObjectSchema } from './objects/TaskHistoryValueSelect.schema';
import { TaskHistoryValueUncheckedCreateInputObjectSchema } from './objects/TaskHistoryValueUncheckedCreateInput.schema';
import { TaskHistoryValueUncheckedUpdateInputObjectSchema } from './objects/TaskHistoryValueUncheckedUpdateInput.schema';
import { TaskHistoryValueUpdateInputObjectSchema } from './objects/TaskHistoryValueUpdateInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './objects/TaskHistoryValueWhereUniqueInput.schema';

export const TaskHistoryValueUpsertSchema = z.object({
  select: TaskHistoryValueSelectObjectSchema.optional(),
  include: TaskHistoryValueIncludeObjectSchema.optional(),
  where: TaskHistoryValueWhereUniqueInputObjectSchema,
  create: z.union([
    TaskHistoryValueCreateInputObjectSchema,
    TaskHistoryValueUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    TaskHistoryValueUpdateInputObjectSchema,
    TaskHistoryValueUncheckedUpdateInputObjectSchema,
  ]),
});
