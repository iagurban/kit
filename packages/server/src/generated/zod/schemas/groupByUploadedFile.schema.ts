import { z } from 'zod';
import { UploadedFileWhereInputObjectSchema } from './objects/UploadedFileWhereInput.schema';
import { UploadedFileOrderByWithAggregationInputObjectSchema } from './objects/UploadedFileOrderByWithAggregationInput.schema';
import { UploadedFileScalarWhereWithAggregatesInputObjectSchema } from './objects/UploadedFileScalarWhereWithAggregatesInput.schema';
import { UploadedFileScalarFieldEnumSchema } from './enums/UploadedFileScalarFieldEnum.schema';

export const UploadedFileGroupBySchema = z.object({
  where: UploadedFileWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      UploadedFileOrderByWithAggregationInputObjectSchema,
      UploadedFileOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: UploadedFileScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(UploadedFileScalarFieldEnumSchema),
});
