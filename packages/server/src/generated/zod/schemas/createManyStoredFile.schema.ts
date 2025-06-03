import { z } from 'zod';

import { StoredFileCreateManyInputObjectSchema } from './objects/StoredFileCreateManyInput.schema';

export const StoredFileCreateManySchema = z.object({
  data: z.union([StoredFileCreateManyInputObjectSchema, z.array(StoredFileCreateManyInputObjectSchema)]),
  skipDuplicates: z.boolean().optional(),
});
