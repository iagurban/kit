import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemFindManySchema } from '../findManyItem.schema';
import { ItemArgsObjectSchema } from './ItemArgs.schema';
import { ItemCountOutputTypeArgsObjectSchema } from './ItemCountOutputTypeArgs.schema';
import { MenuArgsObjectSchema } from './MenuArgs.schema';
import { UploadedFileArgsObjectSchema } from './UploadedFileArgs.schema';

const Schema: z.ZodType<Prisma.ItemSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    orderKey: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    price: z.boolean().optional(),
    archived: z.boolean().optional(),
    imageId: z.boolean().optional(),
    image: z.union([z.boolean(), z.lazy(() => UploadedFileArgsObjectSchema)]).optional(),
    menuId: z.boolean().optional(),
    menu: z.union([z.boolean(), z.lazy(() => MenuArgsObjectSchema)]).optional(),
    parentId: z.boolean().optional(),
    parent: z.union([z.boolean(), z.lazy(() => ItemArgsObjectSchema)]).optional(),
    children: z.union([z.boolean(), z.lazy(() => ItemFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ItemCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const ItemSelectObjectSchema = Schema;
