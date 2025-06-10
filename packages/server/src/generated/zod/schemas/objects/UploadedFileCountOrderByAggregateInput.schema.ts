import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    originalName: z.lazy(() => SortOrderSchema).optional(),
    mimetype: z.lazy(() => SortOrderSchema).optional(),
    uploadedAt: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    storedFileId: z.lazy(() => SortOrderSchema).optional(),
    menuId: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UploadedFileCountOrderByAggregateInputObjectSchema = Schema;
