import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyParentInputObjectSchema } from './TaskCreateManyParentInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateManyParentInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TaskCreateManyParentInputObjectSchema),
      z.lazy(() => TaskCreateManyParentInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TaskCreateManyParentInputEnvelopeObjectSchema = Schema;
