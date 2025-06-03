import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyResponsibleInputObjectSchema } from './TaskCreateManyResponsibleInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateManyResponsibleInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TaskCreateManyResponsibleInputObjectSchema),
      z.lazy(() => TaskCreateManyResponsibleInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TaskCreateManyResponsibleInputEnvelopeObjectSchema = Schema;
