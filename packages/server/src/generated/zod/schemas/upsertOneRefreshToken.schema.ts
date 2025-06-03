import { z } from 'zod';

import { RefreshTokenCreateInputObjectSchema } from './objects/RefreshTokenCreateInput.schema';
import { RefreshTokenIncludeObjectSchema } from './objects/RefreshTokenInclude.schema';
import { RefreshTokenSelectObjectSchema } from './objects/RefreshTokenSelect.schema';
import { RefreshTokenUncheckedCreateInputObjectSchema } from './objects/RefreshTokenUncheckedCreateInput.schema';
import { RefreshTokenUncheckedUpdateInputObjectSchema } from './objects/RefreshTokenUncheckedUpdateInput.schema';
import { RefreshTokenUpdateInputObjectSchema } from './objects/RefreshTokenUpdateInput.schema';
import { RefreshTokenWhereUniqueInputObjectSchema } from './objects/RefreshTokenWhereUniqueInput.schema';

export const RefreshTokenUpsertSchema = z.object({
  select: RefreshTokenSelectObjectSchema.optional(),
  include: RefreshTokenIncludeObjectSchema.optional(),
  where: RefreshTokenWhereUniqueInputObjectSchema,
  create: z.union([RefreshTokenCreateInputObjectSchema, RefreshTokenUncheckedCreateInputObjectSchema]),
  update: z.union([RefreshTokenUpdateInputObjectSchema, RefreshTokenUncheckedUpdateInputObjectSchema]),
});
