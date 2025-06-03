import { z } from 'zod';

import { TaskHistoryValueUpdateManyMutationInputObjectSchema } from './objects/TaskHistoryValueUpdateManyMutationInput.schema';
import { TaskHistoryValueWhereInputObjectSchema } from './objects/TaskHistoryValueWhereInput.schema';

export const TaskHistoryValueUpdateManySchema = z.object({
  data: TaskHistoryValueUpdateManyMutationInputObjectSchema,
  where: TaskHistoryValueWhereInputObjectSchema.optional(),
});
