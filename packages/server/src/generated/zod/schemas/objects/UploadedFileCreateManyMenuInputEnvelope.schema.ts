import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateManyMenuInputObjectSchema } from './UploadedFileCreateManyMenuInput.schema';

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
