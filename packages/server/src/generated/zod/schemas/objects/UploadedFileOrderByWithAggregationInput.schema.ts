import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UploadedFileCountOrderByAggregateInputObjectSchema } from './UploadedFileCountOrderByAggregateInput.schema';
import { UploadedFileMaxOrderByAggregateInputObjectSchema } from './UploadedFileMaxOrderByAggregateInput.schema';
import { UploadedFileMinOrderByAggregateInputObjectSchema } from './UploadedFileMinOrderByAggregateInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    originalName: z.lazy(() => SortOrderSchema).optional(),
    mimetype: z.lazy(() => SortOrderSchema).optional(),
    uploadedAt: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    storedFileId: z.lazy(() => SortOrderSchema).optional(),
    menuId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UploadedFileCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => UploadedFileMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => UploadedFileMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileOrderByWithAggregationInputObjectSchema = Schema;
