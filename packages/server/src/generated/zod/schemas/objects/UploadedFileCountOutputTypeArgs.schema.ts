import { z } from 'zod';
import { UploadedFileCountOutputTypeSelectObjectSchema } from './UploadedFileCountOutputTypeSelect.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => UploadedFileCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const UploadedFileCountOutputTypeArgsObjectSchema = Schema;
