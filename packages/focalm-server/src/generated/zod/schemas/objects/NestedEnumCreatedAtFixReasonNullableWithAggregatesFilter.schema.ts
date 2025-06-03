import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { CreatedAtFixReasonSchema } from '../enums/CreatedAtFixReason.schema';
import { NestedEnumCreatedAtFixReasonNullableFilterObjectSchema } from './NestedEnumCreatedAtFixReasonNullableFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';

const Schema: z.ZodType<Prisma.NestedEnumCreatedAtFixReasonNullableWithAggregatesFilter> = z
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
        z.lazy(() => NestedEnumCreatedAtFixReasonNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumCreatedAtFixReasonNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumCreatedAtFixReasonNullableFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumCreatedAtFixReasonNullableWithAggregatesFilterObjectSchema = Schema;
