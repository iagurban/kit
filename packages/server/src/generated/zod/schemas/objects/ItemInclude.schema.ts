import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemFindManySchema } from '../findManyItem.schema';
import { ItemArgsObjectSchema } from './ItemArgs.schema';
import { ItemCountOutputTypeArgsObjectSchema } from './ItemCountOutputTypeArgs.schema';
import { MenuArgsObjectSchema } from './MenuArgs.schema';
import { UploadedFileArgsObjectSchema } from './UploadedFileArgs.schema';

const Schema: z.ZodType<Prisma.ItemInclude> = z
  .object({
    image: z.union([z.boolean(), z.lazy(() => UploadedFileArgsObjectSchema)]).optional(),
    menu: z.union([z.boolean(), z.lazy(() => MenuArgsObjectSchema)]).optional(),
    parent: z.union([z.boolean(), z.lazy(() => ItemArgsObjectSchema)]).optional(),
    children: z.union([z.boolean(), z.lazy(() => ItemFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => ItemCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const ItemIncludeObjectSchema = Schema;
