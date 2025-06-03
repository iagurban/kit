import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupUncheckedCreateWithoutValuesInput> = z
  .object({
    id: z.string().optional(),
    taskId: z.string(),
    authorId: z.string(),
    localCreatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    createdAtFixReason: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const TaskHistoryGroupUncheckedCreateWithoutValuesInputObjectSchema = Schema;
