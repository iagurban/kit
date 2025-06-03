import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileArgsObjectSchema } from './StoredFileArgs.schema';
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
  })
  .strict();

export const UploadedFileSelectObjectSchema = Schema;
