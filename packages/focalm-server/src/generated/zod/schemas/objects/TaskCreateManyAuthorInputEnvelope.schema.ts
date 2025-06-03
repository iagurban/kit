import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TaskCreateManyAuthorInputObjectSchema } from './TaskCreateManyAuthorInput.schema';

const Schema: z.ZodType<Prisma.TaskCreateManyAuthorInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TaskCreateManyAuthorInputObjectSchema),
      z.lazy(() => TaskCreateManyAuthorInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const TaskCreateManyAuthorInputEnvelopeObjectSchema = Schema;
