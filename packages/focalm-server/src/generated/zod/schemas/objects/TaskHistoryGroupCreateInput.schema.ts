import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { TaskHistoryValueCreateNestedManyWithoutGroupInputObjectSchema } from './TaskHistoryValueCreateNestedManyWithoutGroupInput.schema';
import { UserCreateNestedOneWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateNestedOneWithoutAuthoredTaskChangesInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateInput> = z
  .object({
    id: z.string().optional(),
    localCreatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    createdAtFixReason: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
    values: z.lazy(() => TaskHistoryValueCreateNestedManyWithoutGroupInputObjectSchema).optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutAuthoredTaskChangesInputObjectSchema),
  })
  .strict();

export const TaskHistoryGroupCreateInputObjectSchema = Schema;
