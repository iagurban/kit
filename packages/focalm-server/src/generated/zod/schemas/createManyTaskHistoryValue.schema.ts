import { z } from 'zod';

import { TaskHistoryValueCreateManyInputObjectSchema } from './objects/TaskHistoryValueCreateManyInput.schema';

export const TaskHistoryValueCreateManySchema = z.object({
  data: z.union([
    TaskHistoryValueCreateManyInputObjectSchema,
    z.array(TaskHistoryValueCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
