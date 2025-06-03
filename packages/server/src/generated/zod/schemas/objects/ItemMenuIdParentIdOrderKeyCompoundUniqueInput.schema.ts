import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.ItemMenuIdParentIdOrderKeyCompoundUniqueInput> = z
  .object({
    menuId: z.string(),
    parentId: z.string(),
    orderKey: z.string(),
  })
  .strict();

export const ItemMenuIdParentIdOrderKeyCompoundUniqueInputObjectSchema = Schema;
