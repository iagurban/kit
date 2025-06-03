import { z } from 'zod';

import { TaskIncludeObjectSchema } from './objects/TaskInclude.schema';
import { TaskSelectObjectSchema } from './objects/TaskSelect.schema';
import { TaskUncheckedUpdateInputObjectSchema } from './objects/TaskUncheckedUpdateInput.schema';
import { TaskUpdateInputObjectSchema } from './objects/TaskUpdateInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './objects/TaskWhereUniqueInput.schema';

export const TaskUpdateOneSchema = z.object({
  select: TaskSelectObjectSchema.optional(),
  include: TaskIncludeObjectSchema.optional(),
  data: z.union([TaskUpdateInputObjectSchema, TaskUncheckedUpdateInputObjectSchema]),
  where: TaskWhereUniqueInputObjectSchema,
});
