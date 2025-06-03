import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCountOutputTypeSelectObjectSchema } from './UploadedFileCountOutputTypeSelect.schema';

const Schema: z.ZodType<Prisma.UploadedFileCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => UploadedFileCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict();

export const UploadedFileCountOutputTypeArgsObjectSchema = Schema;
