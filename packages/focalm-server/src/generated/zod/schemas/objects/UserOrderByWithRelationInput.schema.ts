import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RefreshTokenOrderByRelationAggregateInputObjectSchema } from './RefreshTokenOrderByRelationAggregateInput.schema';
import { TaskHistoryGroupOrderByRelationAggregateInputObjectSchema } from './TaskHistoryGroupOrderByRelationAggregateInput.schema';
import { TaskOrderByRelationAggregateInputObjectSchema } from './TaskOrderByRelationAggregateInput.schema';
import { UploadedFileOrderByRelationAggregateInputObjectSchema } from './UploadedFileOrderByRelationAggregateInput.schema';

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    uploadedFiles: z.lazy(() => UploadedFileOrderByRelationAggregateInputObjectSchema).optional(),
    refreshTokens: z.lazy(() => RefreshTokenOrderByRelationAggregateInputObjectSchema).optional(),
    assignedTasks: z.lazy(() => TaskOrderByRelationAggregateInputObjectSchema).optional(),
    authoredTasks: z.lazy(() => TaskOrderByRelationAggregateInputObjectSchema).optional(),
    authoredTaskChanges: z.lazy(() => TaskHistoryGroupOrderByRelationAggregateInputObjectSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputObjectSchema = Schema;
