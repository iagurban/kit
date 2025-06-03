import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskHistoryGroupCreateManyAuthorInputObjectSchema } from './TaskHistoryGroupCreateManyAuthorInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateManyAuthorInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TaskHistoryGroupCreateManyAuthorInputObjectSchema),
      z.lazy(() => TaskHistoryGroupCreateManyAuthorInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TaskHistoryGroupCreateManyAuthorInputEnvelopeObjectSchema = Schema;
