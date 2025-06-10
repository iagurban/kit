import { z } from 'zod';
import { StoredFileUpdateManyMutationInputObjectSchema } from './objects/StoredFileUpdateManyMutationInput.schema';
import { StoredFileWhereInputObjectSchema } from './objects/StoredFileWhereInput.schema';

export const StoredFileUpdateManySchema = z.object({
  data: StoredFileUpdateManyMutationInputObjectSchema,
  where: StoredFileWhereInputObjectSchema.optional(),
});
