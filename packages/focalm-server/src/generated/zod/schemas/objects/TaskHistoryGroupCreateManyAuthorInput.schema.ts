import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateManyAuthorInput> = z
  .object({
    id: z.string().optional(),
    localCreatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    createdAtFixReason: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const TaskHistoryGroupCreateManyAuthorInputObjectSchema = Schema;
