import { z } from 'zod';

import { TaskHistoryGroupWhereInputObjectSchema } from './objects/TaskHistoryGroupWhereInput.schema';

export const TaskHistoryGroupDeleteManySchema = z.object({
  where: TaskHistoryGroupWhereInputObjectSchema.optional(),
});
