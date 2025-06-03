import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { ItemFindManySchema } from '../findManyItem.schema';
import { MenuArgsObjectSchema } from './MenuArgs.schema';
import { StoredFileArgsObjectSchema } from './StoredFileArgs.schema';
import { UploadedFileCountOutputTypeArgsObjectSchema } from './UploadedFileCountOutputTypeArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.UploadedFileSelect> = z
  .object({
    id: z.boolean().optional(),
    originalName: z.boolean().optional(),
    mimetype: z.boolean().optional(),
    uploadedAt: z.boolean().optional(),
    uploaderId: z.boolean().optional(),
    uploader: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    storedFileId: z.boolean().optional(),
    storedFile: z.union([z.boolean(), z.lazy(() => StoredFileArgsObjectSchema)]).optional(),
    menuId: z.boolean().optional(),
    menu: z.union([z.boolean(), z.lazy(() => MenuArgsObjectSchema)]).optional(),
    usingItems: z.union([z.boolean(), z.lazy(() => ItemFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UploadedFileCountOutputTypeArgsObjectSchema)]).optional(),
  })
  .strict();

export const UploadedFileSelectObjectSchema = Schema;
