import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileArgsObjectSchema } from './StoredFileArgs.schema';
import { UserArgsObjectSchema } from './UserArgs.schema';

const Schema: z.ZodType<Prisma.UploadedFileInclude> = z
  .object({
    uploader: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    storedFile: z.union([z.boolean(), z.lazy(() => StoredFileArgsObjectSchema)]).optional(),
  })
  .strict();

export const UploadedFileIncludeObjectSchema = Schema;
