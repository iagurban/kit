import { z } from 'zod';
import { StoredFileUpdateWithoutUploadsInputObjectSchema } from './StoredFileUpdateWithoutUploadsInput.schema';
import { StoredFileUncheckedUpdateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedUpdateWithoutUploadsInput.schema';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';

import type { Prisma } from '../../../old-client';

const Schema: z.ZodType<Prisma.StoredFileUpsertWithoutUploadsInput> = z
  .object({
    update: z.union([
      z.lazy(() => StoredFileUpdateWithoutUploadsInputObjectSchema),
      z.lazy(() => StoredFileUncheckedUpdateWithoutUploadsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => StoredFileCreateWithoutUploadsInputObjectSchema),
      z.lazy(() => StoredFileUncheckedCreateWithoutUploadsInputObjectSchema),
    ]),
  })
  .strict();

export const StoredFileUpsertWithoutUploadsInputObjectSchema = Schema;
