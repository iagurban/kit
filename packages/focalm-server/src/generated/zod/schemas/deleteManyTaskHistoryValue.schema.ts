import { z } from 'zod';

import { TaskHistoryValueWhereInputObjectSchema } from './objects/TaskHistoryValueWhereInput.schema';

export const TaskHistoryValueDeleteManySchema = z.object({
  where: TaskHistoryValueWhereInputObjectSchema.optional(),
});
