import { z } from 'zod';

import { RefreshTokenCreateInputObjectSchema } from './objects/RefreshTokenCreateInput.schema';
import { RefreshTokenIncludeObjectSchema } from './objects/RefreshTokenInclude.schema';
import { RefreshTokenSelectObjectSchema } from './objects/RefreshTokenSelect.schema';
import { RefreshTokenUncheckedCreateInputObjectSchema } from './objects/RefreshTokenUncheckedCreateInput.schema';

export const RefreshTokenCreateOneSchema = z.object({
  select: RefreshTokenSelectObjectSchema.optional(),
  include: RefreshTokenIncludeObjectSchema.optional(),
  data: z.union([RefreshTokenCreateInputObjectSchema, RefreshTokenUncheckedCreateInputObjectSchema]),
});
