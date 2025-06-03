import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskStateSchema } from '../enums/TaskState.schema';

const Schema: z.ZodType<Prisma.EnumTaskStateFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => TaskStateSchema).optional(),
  })
  .strict();

export const EnumTaskStateFieldUpdateOperationsInputObjectSchema = Schema;
