import { z } from 'zod';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { StoredFileArgsObjectSchema } from './StoredFileArgs.schema';
import { MenuArgsObjectSchema } from './MenuArgs.schema';
import { ItemFindManySchema } from '../findManyItem.schema';
import { UploadedFileCountOutputTypeArgsObjectSchema } from './UploadedFileCountOutputTypeArgs.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileInclude> = z
  .object({
    uploader: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    storedFile: z.union([z.boolean(), z.lazy(() => StoredFileArgsObjectSchema)]).optional(),
    menu: z.union([z.boolean(), z.lazy(() => MenuArgsObjectSchema)]).optional(),
    usingItems: z.union([z.boolean(), z.lazy(() => ItemFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UploadedFileCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UploadedFileIncludeObjectSchema = Schema;
