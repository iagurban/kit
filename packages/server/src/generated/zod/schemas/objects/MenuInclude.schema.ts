import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemFindManySchema } from '../findManyItem.schema';
import { TagFindManySchema } from '../findManyTag.schema';
import { UploadedFileFindManySchema } from '../findManyUploadedFile.schema';
import { MenuCountOutputTypeArgsObjectSchema } from './MenuCountOutputTypeArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.MenuInclude> = z
  .object({
    owner: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    items: z.union([z.boolean(), z.lazy(() => ItemFindManySchema)]).optional(),
    tags: z.union([z.boolean(), z.lazy(() => TagFindManySchema)]).optional(),
    files: z.union([z.boolean(), z.lazy(() => UploadedFileFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => MenuCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const MenuIncludeObjectSchema = Schema;
