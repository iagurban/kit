import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { TagIncludeObjectSchema } from './TagInclude.schema';
import { TagSelectObjectSchema } from './TagSelect.schema';

const Schema: z.ZodType<Prisma.TagArgs> = z
  .object({
    select: z.lazy(() => TagSelectObjectSchema).optional(),
    include: z.lazy(() => TagIncludeObjectSchema).optional(),
  })
  .strict();

export const TagArgsObjectSchema = Schema;
