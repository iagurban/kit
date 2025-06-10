import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryOperationSchema } from '../enums/TaskHistoryOperation.schema';

const Schema: z.ZodType<Prisma.EnumTaskHistoryOperationFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => TaskHistoryOperationSchema).optional(),
  })
  .strict();

export const EnumTaskHistoryOperationFieldUpdateOperationsInputObjectSchema = Schema;
