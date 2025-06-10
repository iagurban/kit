import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { UserCreateNestedOneWithoutAuthoredTaskChangesInputObjectSchema } from './UserCreateNestedOneWithoutAuthoredTaskChangesInput.schema';

const Schema: z.ZodType<Prisma.TaskHistoryGroupCreateWithoutValuesInput> = z
  .object({
    id: z.string().optional(),
    localCreatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    createdAtFixReason: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
    author: z.lazy(() => UserCreateNestedOneWithoutAuthoredTaskChangesInputObjectSchema),
  })
  .strict();

export const TaskHistoryGroupCreateWithoutValuesInputObjectSchema = Schema;
