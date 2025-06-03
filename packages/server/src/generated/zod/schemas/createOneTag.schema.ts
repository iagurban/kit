import { z } from 'zod';

import { TagCreateInputObjectSchema } from './objects/TagCreateInput.schema';
import { TagIncludeObjectSchema } from './objects/TagInclude.schema';
import { TagSelectObjectSchema } from './objects/TagSelect.schema';
import { TagUncheckedCreateInputObjectSchema } from './objects/TagUncheckedCreateInput.schema';

export const TagCreateOneSchema = z.object({
  select: TagSelectObjectSchema.optional(),
  include: TagIncludeObjectSchema.optional(),
  data: z.union([TagCreateInputObjectSchema, TagUncheckedCreateInputObjectSchema]),
});
