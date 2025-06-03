import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { StoredFileCreateWithoutUploadsInputObjectSchema } from './StoredFileCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedCreateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedCreateWithoutUploadsInput.schema';
import { StoredFileUncheckedUpdateWithoutUploadsInputObjectSchema } from './StoredFileUncheckedUpdateWithoutUploadsInput.schema';
import { StoredFileUpdateWithoutUploadsInputObjectSchema } from './StoredFileUpdateWithoutUploadsInput.schema';

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
