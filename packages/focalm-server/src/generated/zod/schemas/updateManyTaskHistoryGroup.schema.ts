import { z } from 'zod';

import { TaskHistoryGroupUpdateManyMutationInputObjectSchema } from './objects/TaskHistoryGroupUpdateManyMutationInput.schema';
import { TaskHistoryGroupWhereInputObjectSchema } from './objects/TaskHistoryGroupWhereInput.schema';

export const TaskHistoryGroupUpdateManySchema = z.object({
  data: TaskHistoryGroupUpdateManyMutationInputObjectSchema,
  where: TaskHistoryGroupWhereInputObjectSchema.optional(),
});
