import { z } from 'zod';
import { StoredFileOrderByWithRelationInputObjectSchema } from './objects/StoredFileOrderByWithRelationInput.schema';
import { StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';
import { StoredFileWhereUniqueInputObjectSchema } from './objects/StoredFileWhereUniqueInput.schema';
import { StoredFileCountAggregateInputObjectSchema } from './objects/StoredFileCountAggregateInput.schema';
import { StoredFileMinAggregateInputObjectSchema } from './objects/StoredFileMinAggregateInput.schema';
import { StoredFileMaxAggregateInputObjectSchema } from './objects/StoredFileMaxAggregateInput.schema';
import { StoredFileAvgAggregateInputObjectSchema } from './objects/StoredFileAvgAggregateInput.schema';
import { StoredFileSumAggregateInputObjectSchema } from './objects/StoredFileSumAggregateInput.schema';

export const StoredFileAggregateSchema = z.object({
  orderBy: z
    .union([
      StoredFileOrderByWithRelationInputObjectSchema,
      StoredFileOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: StoredFileWhereInputObjectSchema.optional(),
  cursor: StoredFileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), StoredFileCountAggregateInputObjectSchema]).optional(),
  _min: StoredFileMinAggregateInputObjectSchema.optional(),
  _max: StoredFileMaxAggregateInputObjectSchema.optional(),
  _avg: StoredFileAvgAggregateInputObjectSchema.optional(),
  _sum: StoredFileSumAggregateInputObjectSchema.optional(),
});
