import { z } from 'zod';

import { TaskCreateInputObjectSchema } from './objects/TaskCreateInput.schema';
import { TaskIncludeObjectSchema } from './objects/TaskInclude.schema';
import { TaskSelectObjectSchema } from './objects/TaskSelect.schema';
import { TaskUncheckedCreateInputObjectSchema } from './objects/TaskUncheckedCreateInput.schema';
import { TaskUncheckedUpdateInputObjectSchema } from './objects/TaskUncheckedUpdateInput.schema';
import { TaskUpdateInputObjectSchema } from './objects/TaskUpdateInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './objects/TaskWhereUniqueInput.schema';

export const TaskUpsertSchema = z.object({
  select: TaskSelectObjectSchema.optional(),
  include: TaskIncludeObjectSchema.optional(),
  where: TaskWhereUniqueInputObjectSchema,
  create: z.union([TaskCreateInputObjectSchema, TaskUncheckedCreateInputObjectSchema]),
  update: z.union([TaskUpdateInputObjectSchema, TaskUncheckedUpdateInputObjectSchema]),
});
