import { z } from 'zod';

import { TaskHistoryGroupCreateManyInputObjectSchema } from './objects/TaskHistoryGroupCreateManyInput.schema';

export const TaskHistoryGroupCreateManySchema = z.object({
  data: z.union([
    TaskHistoryGroupCreateManyInputObjectSchema,
    z.array(TaskHistoryGroupCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
