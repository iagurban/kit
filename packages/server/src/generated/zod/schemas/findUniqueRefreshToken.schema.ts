import { z } from 'zod';
import { RefreshTokenSelectObjectSchema } from './objects/RefreshTokenSelect.schema';
import { RefreshTokenIncludeObjectSchema } from './objects/RefreshTokenInclude.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './objects/RefreshTokenWhereUniqueInput.schema';

export const RefreshTokenFindUniqueSchema = z.object({
  select: RefreshTokenSelectObjectSchema.optional(),
  include: RefreshTokenIncludeObjectSchema.optional(),
  where: RefreshTokenWhereUniqueInputObjectSchema,
});
