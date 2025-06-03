import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateManyStoredFileInputObjectSchema } from './UploadedFileCreateManyStoredFileInput.schema';

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
