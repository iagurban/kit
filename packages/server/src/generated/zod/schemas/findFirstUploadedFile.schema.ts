import { z } from 'zod';

import { UploadedFileScalarFieldEnumSchema } from './enums/UploadedFileScalarFieldEnum.schema';
import { UploadedFileIncludeObjectSchema } from './objects/UploadedFileInclude.schema';
import { UploadedFileOrderByWithRelationInputObjectSchema } from './objects/UploadedFileOrderByWithRelationInput.schema';
import { UploadedFileSelectObjectSchema } from './objects/UploadedFileSelect.schema';
import { UploadedFileWhereInputObjectSchema } from './objects/UploadedFileWhereInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './objects/UploadedFileWhereUniqueInput.schema';

export const UploadedFileFindFirstSchema = z.object({
  select: UploadedFileSelectObjectSchema.optional(),
  include: UploadedFileIncludeObjectSchema.optional(),
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
  distinct: z.array(UploadedFileScalarFieldEnumSchema).optional(),
});
