import { z } from 'zod';

import { TaskIncludeObjectSchema } from './objects/TaskInclude.schema';
import { TaskSelectObjectSchema } from './objects/TaskSelect.schema';
import { TaskWhereUniqueInputObjectSchema } from './objects/TaskWhereUniqueInput.schema';

export const TaskFindUniqueSchema = z.object({
  select: TaskSelectObjectSchema.optional(),
  include: TaskIncludeObjectSchema.optional(),
  where: TaskWhereUniqueInputObjectSchema,
});
