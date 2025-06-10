import { z } from 'zod';
import { UploadedFileCreateManyStoredFileInputObjectSchema } from './UploadedFileCreateManyStoredFileInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateManyStoredFileInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UploadedFileCreateManyStoredFileInputObjectSchema),
      z.lazy(() => UploadedFileCreateManyStoredFileInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UploadedFileCreateManyStoredFileInputEnvelopeObjectSchema = Schema;
