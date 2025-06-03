import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { TaskCreateNestedOneWithoutHistoryGroupsInputObjectSchema } from './TaskCreateNestedOneWithoutHistoryGroupsInput.schema';
import { TaskHistoryValueCreateNestedManyWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateNestedManyWithoutGroupInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateWithoutAuthorInput> = z
  .object({
    id: z.string().optional(),
    localCreatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    createdAtFixReason: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
    task: z.lazy(() => TaskCreateNestedOneWithoutHistoryGroupsInputObjectSchema),
    values: z.lazy(() => TaskHistoryValueCreateNestedManyWithoutGroupInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupCreateWithoutAuthorInputObjectSchema = Schema;
