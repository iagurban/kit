import { z } from 'zod';

import { TaskHistoryGroupScalarFieldEnumSchema } from './enums/TaskHistoryGroupScalarFieldEnum.schema';
import { TaskHistoryGroupIncludeObjectSchema } from './objects/TaskHistoryGroupInclude.schema';
import { TaskHistoryGroupOrderByWithRelationInputObjectSchema } from './objects/TaskHistoryGroupOrderByWithRelationInput.schema';
import { TaskHistoryGroupSelectObjectSchema } from './objects/TaskHistoryGroupSelect.schema';
import { TaskHistoryGroupWhereInputObjectSchema } from './objects/TaskHistoryGroupWhereInput.schema';
import { TaskHistoryGroupWhereUniqueInputObjectSchema } from './objects/TaskHistoryGroupWhereUniqueInput.schema';

export const TaskHistoryGroupFindFirstSchema = z.object({
  select: TaskHistoryGroupSelectObjectSchema.optional(),
  include: TaskHistoryGroupIncludeObjectSchema.optional(),
  orderBy: z
    .union([
      TaskHistoryGroupOrderByWithRelationInputObjectSchema,
      TaskHistoryGroupOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: TaskHistoryGroupWhereInputObjectSchema.optional(),
  cursor: TaskHistoryGroupWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(TaskHistoryGroupScalarFieldEnumSchema).optional(),
});
