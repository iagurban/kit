import { z } from 'zod';

import { UploadedFileCreateManyInputObjectSchema } from './objects/UploadedFileCreateManyInput.schema';

export const UploadedFileCreateManySchema = z.object({
  data: z.union([UploadedFileCreateManyInputObjectSchema, z.array(UploadedFileCreateManyInputObjectSchema)]),
  skipDuplicates: z.boolean().optional(),
});
