import { z } from 'zod';
import { MenuArgsObjectSchema } from './MenuArgs.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.TagSelect> = z
  .object({
    id: z.boolean().optional(),
    menuId: z.boolean().optional(),
    menu: z.union([z.boolean(), z.lazy(() => MenuArgsObjectSchema)]).optional(),
  })
  .strict();

export const TagSelectObjectSchema = Schema;
