import { z } from 'zod';
import { MenuArgsObjectSchema } from './MenuArgs.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagInclude> = z
  .object({
    menu: z.union([z.boolean(), z.lazy(() => MenuArgsObjectSchema)]).optional(),
  })
  .strict();

export const TagIncludeObjectSchema = Schema;
