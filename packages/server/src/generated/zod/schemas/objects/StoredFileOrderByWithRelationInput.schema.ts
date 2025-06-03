import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UploadedFileOrderByRelationAggregateInputObjectSchema } from './UploadedFileOrderByRelationAggregateInput.schema';

const Schema: z.ZodType<Prisma.StoredFileOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    hash: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    uploads: z.lazy(() => UploadedFileOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const StoredFileOrderByWithRelationInputObjectSchema = Schema;
