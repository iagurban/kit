import { z } from 'zod';
import { RefreshTokenCreateManyInputObjectSchema } from './objects/RefreshTokenCreateManyInput.schema';

export const RefreshTokenCreateManySchema = z.object({
  data: z.union([RefreshTokenCreateManyInputObjectSchema, z.array(RefreshTokenCreateManyInputObjectSchema)]),
  skipDuplicates: z.boolean().optional(),
});
