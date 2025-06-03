import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateManyUploaderInputObjectSchema } from './UploadedFileCreateManyUploaderInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileCreateManyUploaderInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UploadedFileCreateManyUploaderInputObjectSchema),
      z.lazy(() => UploadedFileCreateManyUploaderInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UploadedFileCreateManyUploaderInputEnvelopeObjectSchema = Schema;
