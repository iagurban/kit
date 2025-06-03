import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MenuOrderByWithRelationInputObjectSchema } from './MenuOrderByWithRelationInput.schema';

const Schema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    menuId: z.lazy(() => SortOrderSchema).optional(),
    menu: z.lazy(() => MenuOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const TagOrderByWithRelationInputObjectSchema = Schema;
