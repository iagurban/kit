import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';

const Schema: z.ZodType<Prisma.NestedEnumCreatedAtFixReasonNullableFilter> = z
  .object({
    equals: z
      .lazy(() => CreatedAtFixReasonSchema)
      .optional()
      .nullable(),
    in: z
      .union([z.lazy(() => CreatedAtFixReasonSchema).array(), z.lazy(() => CreatedAtFixReasonSchema)])
      .optional()
      .nullable(),
    notIn: z
      .union([z.lazy(() => CreatedAtFixReasonSchema).array(), z.lazy(() => CreatedAtFixReasonSchema)])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => CreatedAtFixReasonSchema),
        z.lazy(() => NestedEnumCreatedAtFixReasonNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumCreatedAtFixReasonNullableFilterObjectSchema = Schema;
