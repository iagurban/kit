import { z } from 'zod';
import { UploadedFileSelectObjectSchema } from './UploadedFileSelect.schema';
import { UploadedFileIncludeObjectSchema } from './UploadedFileInclude.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileArgs> = z
  .object({
    select: z.lazy(() => UploadedFileSelectObjectSchema).optional(),
    include: z.lazy(() => UploadedFileIncludeObjectSchema).optional(),
  })
  .strict();

export const UploadedFileArgsObjectSchema = Schema;
