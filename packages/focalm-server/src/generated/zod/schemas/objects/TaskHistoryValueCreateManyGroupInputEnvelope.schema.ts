import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryValueCreateManyGroupInputObjectSchema } from './TaskHistoryValueCreateManyGroupInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryValueCreateManyGroupInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TaskHistoryValueCreateManyGroupInputObjectSchema),
      z.lazy(() => TaskHistoryValueCreateManyGroupInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TaskHistoryValueCreateManyGroupInputEnvelopeObjectSchema = Schema;
