import { z } from 'zod';

import { TaskScalarFieldEnumSchema } from './enums/TaskScalarFieldEnum.schema';
import { TaskIncludeObjectSchema } from './objects/TaskInclude.schema';
import { TaskOrderByWithRelationInputObjectSchema } from './objects/TaskOrderByWithRelationInput.schema';
import { TaskSelectObjectSchema } from './objects/TaskSelect.schema';
import { TaskWhereInputObjectSchema } from './objects/TaskWhereInput.schema';
import { TaskWhereUniqueInputObjectSchema } from './objects/TaskWhereUniqueInput.schema';

export const TaskFindManySchema = z.object({
  select: z.lazy(() => TaskSelectObjectSchema.optional()),
  include: z.lazy(() => TaskIncludeObjectSchema.optional()),
  orderBy: z
    .union([TaskOrderByWithRelationInputObjectSchema, TaskOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: TaskWhereInputObjectSchema.optional(),
  cursor: TaskWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(TaskScalarFieldEnumSchema).optional(),
});
