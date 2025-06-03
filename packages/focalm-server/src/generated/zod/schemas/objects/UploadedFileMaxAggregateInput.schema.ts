import { z } from 'zod';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.UploadedFileMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    originalName: z.literal(true).optional(),
    mimetype: z.literal(true).optional(),
    uploadedAt: z.literal(true).optional(),
    uploaderId: z.literal(true).optional(),
    storedFileId: z.literal(true).optional(),
  })
  .strict();

export const UploadedFileMaxAggregateInputObjectSchema = Schema;
