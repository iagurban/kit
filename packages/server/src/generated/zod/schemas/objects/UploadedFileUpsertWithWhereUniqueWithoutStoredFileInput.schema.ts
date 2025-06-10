import { z } from 'zod';
import { UploadedFileWhereUniqueInputObjectSchema } from './UploadedFileWhereUniqueInput.schema';
import { UploadedFileUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUpdateWithoutStoredFileInput.schema';
import { UploadedFileUncheckedUpdateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedUpdateWithoutStoredFileInput.schema';
import { UploadedFileCreateWithoutStoredFileInputObjectSchema } from './UploadedFileCreateWithoutStoredFileInput.schema';
import { UploadedFileUncheckedCreateWithoutStoredFileInputObjectSchema } from './UploadedFileUncheckedCreateWithoutStoredFileInput.schema';

import type { Prisma } from '../../../old-client';

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
