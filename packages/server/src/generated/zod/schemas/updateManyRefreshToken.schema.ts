import { z } from 'zod';
import { RefreshTokenUpdateManyMutationInputObjectSchema } from './objects/RefreshTokenUpdateManyMutationInput.schema';
import { RefreshTokenWhereInputObjectSchema } from './objects/RefreshTokenWhereInput.schema';

export const RefreshTokenUpdateManySchema = z.object({
  data: RefreshTokenUpdateManyMutationInputObjectSchema,
  where: RefreshTokenWhereInputObjectSchema.optional(),
});
