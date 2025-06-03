import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';

const Schema: z.ZodType<Prisma.NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput> = z
  .object({
    set: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const NullableEnumCreatedAtFixReasonFieldUpdateOperationsInputObjectSchema = Schema;
