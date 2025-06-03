import { z } from 'zod';

import type { Prisma } from '../../../old-client';
import { UploadedFileCreateWithoutStoredFileInputObjectSchema } from './UploadedFileCreateWithoutStoredFileInput.schema';
import { UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedCreateWithoutStoredFileInput.schema';
import { UploadedFileUncheckedUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutStoredFileInput.schema';
import { UploadedFileUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUpdateWithoutStoredFileInput.schema';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';

const Schema: z.ZodType<Prisma.UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput> = z
  .object({
    where: z.lazy(() => UploadedFileWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UploadedFileUpdateWithoutStoredFileInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedUpdateWithoutStoredFileInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UploadedFileCreateWithoutStoredFileInputObjectSchema),
      z.lazy(() => UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema),
    ]),
  })
  .strict();

export const UploadedFileUpsertWithWhereUniqueWithoutStoredFileInputObjectSchema = Schema;
