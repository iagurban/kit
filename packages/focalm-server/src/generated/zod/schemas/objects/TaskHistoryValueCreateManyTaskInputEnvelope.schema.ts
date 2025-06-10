import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateManyTaskInputObjectSchema } from './TaskHistoryValueCreateManyTaskInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueCreateManyTaskInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TaskHistoryValueCreateManyTaskInputObjectSchema),
      z.lazy(() => TaskHistoryValueCreateManyTaskInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TaskHistoryValueCreateManyTaskInputEnvelopeObjectSchema = Schema;
