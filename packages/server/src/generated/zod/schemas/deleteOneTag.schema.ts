import { z } from 'zod';

import { TagIncludeObjectSchema } from './objects/TagInclude.schema';
import { TagSelectObjectSchema } from './objects/TagSelect.schema';
import { TagWhereUniqueInputObjectSchema } from './objects/TagWhereUniqueInput.schema';

export const TagDeleteOneSchema = z.object({
  select: TagSelectObjectSchema.optional(),
  include: TagIncludeObjectSchema.optional(),
  where: TagWhereUniqueInputObjectSchema,
});
