import { z } from 'zod';

import { TaskHistoryValueScalarFieldEnumSchema } from './enums/TaskHistoryValueScalarFieldEnum.schema';
import { TaskHistoryValueIncludeObjectSchema } from './objects/TaskHistoryValueInclude.schema';
import { TaskHistoryValueOrderByWithRelationInputObjectSchema } from './objects/TaskHistoryValueOrderByWithRelationInput.schema';
import { TaskHistoryValueSelectObjectSchema } from './objects/TaskHistoryValueSelect.schema';
import { TaskHistoryValueWhereInputObjectSchema } from './objects/TaskHistoryValueWhereInput.schema';
import { TaskHistoryValueWhereUniqueInputObjectSchema } from './objects/TaskHistoryValueWhereUniqueInput.schema';

export const TaskHistoryValueFindFirstSchema = z.object({
  select: TaskHistoryValueSelectObjectSchema.optional(),
  include: TaskHistoryValueIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      TaskHistoryValueOrderByWithRelationInputObjectSchema,
      TaskHistoryValueOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: TaskHistoryValueWhereInputObjectSchema.optional(),
  cursor: TaskHistoryValueWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(TaskHistoryValueScalarFieldEnumSchema).optional(),
});
