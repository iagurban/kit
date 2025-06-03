import { z } from 'zod';

import { RefreshTokenWhereInputObjectSchema } from './objects/RefreshTokenWhereInput.schema';

export const RefreshTokenDeleteManySchema = z.object({
  where: RefreshTokenWhereInputObjectSchema.optional(),
});
