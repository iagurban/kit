import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileIncludeObjectSchema } from './UploadedFileInclude.schema';
import { UploadedFileSelectObjectSchema } from './UploadedFileSelect.schema';

const Schema: z.ZodType<Prisma.UploadedFileArgs> = z
  .object({
    select: z.lazy(() => UploadedFileSelectObjectSchema).optional(),
    include: z.lazy(() => UploadedFileIncludeObjectSchema).optional(),
  })
  .strict();

export const UploadedFileArgsObjectSchema = Schema;
