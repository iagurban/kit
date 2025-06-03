import { z } from 'zod';

import { TaskCreateManyInputObjectSchema } from './objects/TaskCreateManyInput.schema';

export const TaskCreateManySchema = z.object({
  data: z.union([TaskCreateManyInputObjectSchema, z.array(TaskCreateManyInputObjectSchema)]),
  skipDuplicates: z.boolean().optional(),
});
