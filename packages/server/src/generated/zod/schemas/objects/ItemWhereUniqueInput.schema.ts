import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemMenuIdParentIdOrderKeyCompoundUniqueInputObjectSchema } from './ItemMenuIdParentIdOrderKeyCompoundUniqueInput.schema';

const Schema: z.ZodType<Prisma.ItemWhereUniqueInput> = z
  .object({
    id: z.string().optional(),
    menuId_parentId_orderKey: z
      .lazy(() => ItemMenuIdParentIdOrderKeyCompoundUniqueInputObjectSchema)
      .optional(),
  })
  .strict();

export const ItemWhereUniqueInputObjectSchema = Schema;
