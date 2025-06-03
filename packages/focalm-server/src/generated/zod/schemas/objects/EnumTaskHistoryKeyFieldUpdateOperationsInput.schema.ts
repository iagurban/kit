import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryKeySchema } from '../enums/TaskHistoryKey.schema';

const Schema: z.ZodType<Prisma.EnumTaskHistoryKeyFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => TaskHistoryKeySchema).optional(),
  })
  .strict();

export const EnumTaskHistoryKeyFieldUpdateOperationsInputObjectSchema = Schema;
