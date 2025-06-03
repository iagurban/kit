import { z } from 'zod';

import { UploadedFileCountAggregateInputObjectSchema } from './objects/UploadedFileCountAggregateInput.schema';
import { UploadedFileMaxAggregateInputObjectSchema } from './objects/UploadedFileMaxAggregateInput.schema';
import { UploadedFileMinAggregateInputObjectSchema } from './objects/UploadedFileMinAggregateInput.schema';
import { UploadedFileOrderByWithRelationInputObjectSchema } from './objects/UploadedFileOrderByWithRelationInput.schema';
import { UploadedFileWhereInputObjectSchema } from './objects/UploadedFileWhereInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './objects/UploadedFileWhereUniqueInput.schema';

export const UploadedFileAggregateSchema = z.object({
  orderBy: z
    .union([
      UploadedFileOrderByWithRelationInputObjectSchema,
      UploadedFileOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: UploadedFileWhereInputObjectSchema.optional(),
  cursor: UploadedFileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), UploadedFileCountAggregateInputObjectSchema]).optional(),
  _min: UploadedFileMinAggregateInputObjectSchema.optional(),
  _max: UploadedFileMaxAggregateInputObjectSchema.optional(),
});
