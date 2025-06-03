import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MenuOrderByRelationAggregateInputObjectSchema } from './MenuOrderByRelationAggregateInput.schema';
import { RefreshTokenOrderByRelationAggregateInputObjectSchema } from './RefreshTokenOrderByRelationAggregateInput.schema';
import { UploadedFileOrderByRelationAggregateInputObjectSchema } from './UploadedFileOrderByRelationAggregateInput.schema';

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    menus: z.lazy(() => MenuOrderByRelationAggregateInputObjectSchema).optional(),
    uploadedFiles: z.lazy(() => UploadedFileOrderByRelationAggregateInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputObjectSchema = Schema;
