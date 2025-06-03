import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { StoredFileOrderByWithRelationInputObjectSchema } from './StoredFileOrderByWithRelationInput.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    originalName: z.lazy(() => SortOrderSchema).optional(),
    mimetype: z.lazy(() => SortOrderSchema).optional(),
    uploadedAt: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    storedFileId: z.lazy(() => SortOrderSchema).optional(),
    uploader: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    storedFile: z.lazy(() => StoredFileOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileOrderByWithRelationInputObjectSchema = Schema;
