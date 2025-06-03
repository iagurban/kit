import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateManyTaskInputObjectSchema } from './TaskHistoryGroupCreateManyTaskInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateManyTaskInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TaskHistoryGroupCreateManyTaskInputObjectSchema),
      z.lazy(() => TaskHistoryGroupCreateManyTaskInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TaskHistoryGroupCreateManyTaskInputEnvelopeObjectSchema = Schema;
