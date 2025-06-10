import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { StoredFileOrderByWithRelationInputObjectSchema } from './StoredFileOrderByWithRelationInput.schema';
import { MenuOrderByWithRelationInputObjectSchema } from './MenuOrderByWithRelationInput.schema';
import { ItemOrderByRelationAggregateInputObjectSchema } from './ItemOrderByRelationAggregateInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    originalName: z.lazy(() => SortOrderSchema).optional(),
    mimetype: z.lazy(() => SortOrderSchema).optional(),
    uploadedAt: z.lazy(() => SortOrderSchema).optional(),
    uploaderId: z.lazy(() => SortOrderSchema).optional(),
    storedFileId: z.lazy(() => SortOrderSchema).optional(),
    menuId: z.lazy(() => SortOrderSchema).optional(),
    uploader: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
    storedFile: z.lazy(() => StoredFileOrderByWithRelationInputObjectSchema).optional(),
    menu: z.lazy(() => MenuOrderByWithRelationInputObjectSchema).optional(),
    usingItems: z.lazy(() => ItemOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UploadedFileOrderByWithRelationInputObjectSchema = Schema;
