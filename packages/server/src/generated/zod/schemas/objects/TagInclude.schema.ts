import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { MenuArgsObjectSchema } from './MenuArgs.schema';

const Schema: z.ZodType<Prisma.TagInclude> = z
  .object({
    menu: z.union([z.boolean(), z.lazy(() => MenuArgsObjectSchema)]).optional(),
  })
  .strict();

export const TagIncludeObjectSchema = Schema;
