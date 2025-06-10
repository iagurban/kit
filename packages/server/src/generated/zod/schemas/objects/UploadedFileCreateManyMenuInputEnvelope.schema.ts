import { z } from 'zod';
import { UploadedFileCreateManyMenuInputObjectSchema } from './UploadedFileCreateManyMenuInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileCreateManyMenuInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UploadedFileCreateManyMenuInputObjectSchema),
      z.lazy(() => UploadedFileCreateManyMenuInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UploadedFileCreateManyMenuInputEnvelopeObjectSchema = Schema;
