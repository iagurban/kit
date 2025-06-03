import { z } from 'zod';

import { TaskCreateInputObjectSchema } from './objects/TaskCreateInput.schema';
import { TaskIncludeObjectSchema } from './objects/TaskInclude.schema';
import { TaskSelectObjectSchema } from './objects/TaskSelect.schema';
import { TaskUncheckedCreateInputObjectSchema } from './objects/TaskUncheckedCreateInput.schema';

export const TaskCreateOneSchema = z.object({
  select: TaskSelectObjectSchema.optional(),
  include: TaskIncludeObjectSchema.optional(),
  data: z.union([TaskCreateInputObjectSchema, TaskUncheckedCreateInputObjectSchema]),
});
