import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema } from './TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUncheckedCreateWithoutAuthorInput> = z
  .object({
    id: z.string().optional(),
    taskId: z.string(),
    localCreatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    createdAtFixReason: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
    values: z.lazy(() => TaskHistoryValueUncheckedCreateNestedManyWithoutGroupInputObjectSchema).optional(),
  })
  .strict();

export const TaskHistoryGroupUncheckedCreateWithoutAuthorInputObjectSchema = Schema;
