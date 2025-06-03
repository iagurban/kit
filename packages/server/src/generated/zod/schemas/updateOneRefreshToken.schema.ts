import { z } from 'zod';

import { RefreshTokenIncludeObjectSchema } from './objects/RefreshTokenInclude.schema';
import { RefreshTokenSelectObjectSchema } from './objects/RefreshTokenSelect.schema';
import { RefreshTokenUncheckedUpdateInputObjectSchema } from './objects/RefreshTokenUncheckedUpdateInput.schema';
import { RefreshTokenUpdateInputObjectSchema } from './objects/RefreshTokenUpdateInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './objects/RefreshTokenWhereUniqueInput.schema';

export const RefreshTokenUpdateOneSchema = z.object({
  select: RefreshTokenSelectObjectSchema.optional(),
  include: RefreshTokenIncludeObjectSchema.optional(),
  data: z.union([RefreshTokenUpdateInputObjectSchema, RefreshTokenUncheckedUpdateInputObjectSchema]),
  where: RefreshTokenWhereUniqueInputObjectSchema,
});
